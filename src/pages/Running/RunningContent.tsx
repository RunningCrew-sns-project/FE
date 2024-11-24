import { useEffect, useState } from "react";
import { useDevice } from "../../hook/usedevice";
import useStopWatch from "../../hook/useStopWatch";
import Running from "./Running";
import RunningFooter from "./RunningFooter";
import RuningHeader from "./RunningHeader";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getcrewrunInfo } from "../../api/detail/crewrun/api";
import { getrunInfo } from "../../api/detail/general/api";
// import { useRecoilState } from "recoil";
// import { rundata } from "../../recoil/rundata";



//데이터 형태 정의
interface Data {
  time: string;
  progress: number;
}


export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationData {
  startCoordinates: Coordinates;
  endCoordinates: Coordinates;
  startAddress: string;
  endAddress: string;
	distance? : number;
}

export interface RunInfo {
  title: string;
  start: string;
  end: string;
}


const RunningContent = () => {
	const { isMobile, isTablet } = useDevice();
	const [isStop, setIsStop] = useState(false);
	//결과데이터
	const [data, setData] = useState<Data>({ time: "", progress: 0 });
	// const [data, setData] = useRecoilState(rundata);
	//달리기 info데이터 
	const [runinfo, setRunInfo] = useState<RunInfo>({
    title: "",
    start: "",
    end: "",
  })
	// 달리기 위치 데이터 
	const [locationData, setLocationData] = useState<LocationData>({
    startCoordinates: { lat: 37.6428999322418, lng: 127.009680856107 },
    endCoordinates: { lat: 37.63887785974017, lng: 127.01058220054608 },
    startAddress: "서울인수초등학교",
    endAddress: "국립재활원",
		distance: 1.1024046809285155
  })


	const location = useLocation();
	const {roomData, id  } = location.state || {};
	console.log('룸데이터', roomData, '겟기글 아디이', id)
	const { stop } = useStopWatch();

	const {mutate: crewMutate } = useMutation({
		mutationFn: getcrewrunInfo,
		onSuccess :  (data )=> {
			const info = {
				title : data.data.responseData.title,
				start : data.data.responseData.inputLocation,
				end : data.data.responseData.targetLocation,
			}
			setRunInfo(info)
			const location = {
				startCoordinates : {lat: data.data.responseData.inputLatitude, lng: data.data.responseData.inputLongitude},
				endCoordinates : {lat: data.data.responseData.targetLatitude, lng: data.data.responseData.targetLongitude },
				startAddress: data.data.responseData.inputLocation,
				endAddress : data.data.responseData.targetLocation,
				distance:  data.data.responseData.distance
			}
			setLocationData(location)
			console.log('크루달리기 정보 get 성공', data)
		},
		onError : (error) => {
			console.log(error)
		}
	})

	const {mutate : runMutate }  = useMutation({
		mutationFn: getrunInfo,
		onSuccess: ( data ) => {
			const info = {
				title : data.data.responseData.title,
				start : data.data.responseData.inputLocation,
				end : data.data.responseData.targetLocation,
			}
			setRunInfo(info)
			const location = {
				startCoordinates : {lat: data.data.responseData.inputLatitude, lng: data.data.responseData.inputLongitude},
				endCoordinates : {lat: data.data.responseData.targetLatitude, lng: data.data.responseData.targetLongitude },
				startAddress: data.data.responseData.inputLocation,
				endAddress : data.data.responseData.targetLocation,
				distance:  data.data.responseData.distance
			}
			setLocationData(location)
			console.log('일반달리기 get 성공' ,data)
		},
		onError: (error) => {
			console.log(error)
		}
	})




	const hadleCrewCheck = () => {
		if(roomData){
			const title = roomData.title;
			console.log(title)
			if(title.includes("crew")){
				crewMutate(id)
			}else{
				runMutate(id)
			}
		}
	}


	useEffect(() => {
		hadleCrewCheck()
	},[])

	return (
		<>
			<div
				className={`${
					isMobile || isTablet
						? "w-full h-screen"
						: "w-full max-w-[420px] h-[720px]"
				} bg-white rounded-lg relative overflow-hidden`}
			>
				<RuningHeader runinfo={runinfo}/>
				<div className="absolute top-[160px] w-full ">
					<Running isStop={isStop} setData={setData}  locationData={locationData} />
				</div>
				<div className={`absolute bottom-0 w-full z-20`}>
					<RunningFooter stop={stop} setIsStop={setIsStop} data={data} distance={locationData.distance} />
				</div>
			</div>
		</>
	);
};

export default RunningContent;
