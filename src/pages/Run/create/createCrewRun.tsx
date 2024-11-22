import { useState } from "react";
import DateFilter from "../../../components/Filter/DateFilter";
import { fields } from "../../../const/inputfileds";
import FormLayout from "../commonForm";
import MapPage from "../../../components/Map/Map";
import SearchKeword from "../serachKeword";
import {  InputData } from "./createCrew";
import { uploadFiles } from "../../../api/image/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { dateFormatter } from "../../../util/dateFormatter";
import { postCrewRun } from "../../../api/run/api";
import { Coordinates } from "../../Running/RunningContent";

export interface LocationDataProps {
	startCoordinates:  Coordinates;
	endCoordinates: Coordinates;
	startAddress: string;
	endAddress: string;
}


export interface crewRunProps {
  title: string; // 크루 이름
  content: string; // 크루 소개
  location: string; // 활동 지역
	inputLocation: string;
	inputLatitude : number;
	inputLongitude?: number;
	targetLocation?: string;
	targetLatitude : number;
	targetLongitude?: number;
  maxParticipants?: number; // 최대 수용 인원
  fileUrls: string // 파일 정보 목록
	date: string;

}

const CrewRun = () => {
	const { selectedCrewId : crewId } = useParams(); // URL에서 crewId 파라미터 추출

  console.log("Crew ID:", crewId);
	const currentDate = new Date();
	const navigatge = useNavigate()
	const [startDate, setStartDate] = useState<Date | null>(currentDate);
	const [imgfiile, setImageUrls] = useState<string[] | FormData>([]);
	const [locationData, setLocationData] = useState<LocationDataProps>({
		startCoordinates: { lat: 37.6428999322418, lng: 127.009680856107 },
		endCoordinates: { lat: 37.63887785974017, lng: 127.01058220054608 },
		startAddress: "",
		endAddress: "",
	});

	const { mutate } = useMutation({
		mutationFn: postCrewRun,
		onSuccess: (data) => {
			toast.success("크루 달리기 성공 성공!");
			console.log("생성된 크루 데이터:", data);
			navigatge('/crew')
		},
		onError: (error) => {
			toast.error("크루 달리기 실패!");
			console.error("에러 내용:", error);
		},
	});


	const handleSubmit = async (data: InputData) => {
		const date = dateFormatter(startDate)
		console.log(data)
		console.log(crewId)
		try{
			const imgurl = await uploadFiles(
				"http://ec2-54-180-9-220.ap-northeast-2.compute.amazonaws.com:8080/api/storage",
				imgfiile,
				{ directory: "General_runImg", big: false },
			);

			// const fileDtos: FileDto[] = imgurl.map((file:UploadedFile) => ({
			// 	fileName: file.fileName,
			// 	fileUrl: file.fileUrl,
			// }));

			const newData = {
				title: data.crewName,
				content: data.crewIntroduction, 
				location: data.activityRegion,
				inputLocation: locationData.startAddress,
				inputLatitude : locationData.startCoordinates?.lat,
				inputLongitude: locationData.startCoordinates?.lng,
				targetLocation: locationData.endAddress,
				targetLatitude : locationData.endCoordinates?.lat,
				targetLongitude: locationData.endCoordinates?.lng,
				maximumPeople: Number(data.maxCapacity), 
				fileUrls: imgurl ,
				date: date.date,
				startTime: date.startTime
			}

			mutate({ data: newData, crewId } )
		}
		catch(error){ console.log(error)}
	
	};

	return (
		<div className="flex flex-col items-center mb-20">
			<FormLayout
				title="사람들과 함께 달려보세요!"
				fields={fields}
				onSubmit={handleSubmit}
				setImageUrls={setImageUrls}
			>
				{/* 날짜 */}
				<div className="mb-5 w-[320px] tablet:w-[640px] laptop:w-[800px] desktop:w-[800px]">
					<label className="font-black mb-2 block">일정</label>
					<DateFilter
						startDate={startDate}
						setStartDate={setStartDate}
						currentDate={currentDate}
					/>
				</div>

				{/* 지도 */}
				<div className="">
					<SearchKeword
						locationData={locationData}
						setLocationData={setLocationData}
					/>
					<MapPage
						setLocationData={setLocationData}
						locationData={locationData}
					/>
				</div>
			</FormLayout>
		</div>
	);
}
export default CrewRun