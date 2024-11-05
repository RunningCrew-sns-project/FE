import { useEffect } from "react";
import MapPage from "../../components/Map/Map";
import { useDevice } from "../../hook/usedevice";
import useMovePercent from "../../hook/useMovePercent";
import useStopWatch from "../../hook/useStopWatch";
import ProgressBar from "./ProgressBar";


interface RunningProps {
	isStop: boolean; 
	setData: (data: { time: string; progress: number }) => void; 
}

const Running = ({isStop,setData}:RunningProps) => {
	const { start, formatTime, time, pause } = useStopWatch();
	const { progress, currentlocation } = useMovePercent();
	const { isMobile, isTablet } = useDevice();

	const locationData = {
		startCoordinates: { lat: 37.6428999322418, lng: 127.009680856107 },
		endCoordinates: { lat: 37.63887785974017, lng: 127.01058220054608 },
		startAddress: "서울인수초등학교",
		endAddress: "국립재활원",
	};


	useEffect(() => {
		if(isStop){
			setData({
				time : formatTime(time),
				progress,
			})
		}
	},[isStop])

	return (
		<>
			<div className="w-full h-screen rounded-t-3xl   overflow-visible">
				<div className="w-full h-full">
					<MapPage
						locationData={locationData}
						width="100%"
						height="100%"
						className="rounded-t-3xl"
						currentlocation={currentlocation}
					/>
				</div>
				<div className="absolute  z-30  top-[40px] left-1/2 transform -translate-x-1/2 font-black bg-white p-4 rounded-full text-xl ">
					{formatTime(time)}
				</div>
				<div
					className={`${
						isMobile || isTablet
							? "absolute  z-30  bottom-[200px] left-1/2 transform -translate-x-1/2  mt-40"
							: " absolute  z-30 top-[440px] left-1/2 transform -translate-x-1/2 "
					} `}
				>
					<ProgressBar start={start} pause={pause} progress={progress} />
				</div>
			</div>
		</>
	);
};

export default Running;
