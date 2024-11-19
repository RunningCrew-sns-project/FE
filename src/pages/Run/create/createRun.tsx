import { useState } from "react";
import DateFilter from "../../../components/Filter/DateFilter";
import { fields } from "../../../const/inputfileds";
import FormLayout from "../commonForm";
import MapPage from "../../../components/Map/Map";
import SearchKeword from "../serachKeword";
import { FileDto, InputData } from "./createCrew";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {  uploadFiles } from "../../../api/image/api";
import { useNavigate } from "react-router-dom";
import { postGeneralRun } from "../../../api/run/api";
import { dateFormatter } from "../../../util/dateFormatter";


export interface LocationDataProps {
	startCoordinates: { lat: number; lng: number } | null;
	endCoordinates: { lat: number; lng: number } | null;
	startAddress: string;
	endAddress: string;
}

export interface GeneralRunProps {
  title: string; // 크루 이름
  content: string; // 크루 소개
  activityRegion: string; // 활동 지역
	inputLocation: string;
	inputLatitude : number;
	inputLongitude: number;
	targetLocation: string;
	targetLatitude : number;
	targetLongitude: number;
  maxParticipants: number; // 최대 수용 인원
  fileDtos: FileDto[]; // 파일 정보 목록
	date: string;

}


const Run = () => {
	const currentDate = new Date();
	const navigatge = useNavigate()
	const [startDate, setStartDate] = useState<Date | null>(currentDate);
	const [imgfiile, setImageUrls] = useState<string[]>([]);
	const [locationData, setLocationData] = useState<LocationDataProps>({
		startCoordinates: null,
		endCoordinates: null,
		startAddress: "",
		endAddress: "",
	});


	const { mutate } = useMutation({
		mutationFn: postGeneralRun,
		onSuccess: (data) => {
			toast.success("달리기 게시 성공!");
			console.log("달리기 게시  데이터:", data);
			navigatge('/runlist')
		},
		onError: (error) => {
			toast.error("달리기 게시  실패!");
			console.error("에러 내용:", error);
		},
	});


	const handleSubmit = async (data: InputData) => {
		const date = dateFormatter(startDate)
		try{
			const imgurl = await uploadFiles(
				"http://ec2-54-180-9-220.ap-northeast-2.compute.amazonaws.com:8080/api/storage",
				imgfiile,
				{ directory: "General_runImg", big: false },
			);
			console.log('uploadFiles' ,imgurl)
			// const fileDtos = [imgfiile]
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
				date : date.date,
				startTime: date.startTime
			}

			mutate(newData)
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
};

export default Run;
