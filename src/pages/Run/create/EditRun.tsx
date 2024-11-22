import { useEffect, useState } from "react";
import DateFilter from "../../../components/Filter/DateFilter";
import { fields } from "../../../const/inputfileds";
import FormLayout from "../commonForm";
import MapPage from "../../../components/Map/Map";
import SearchKeword from "../serachKeword";
import { FileDto, InputData } from "./createCrew";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadFiles } from "../../../api/image/api";
import { useLocation, useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../util/dateFormatter";
import { postEditRunApi } from "../../../api/run/api";
import { Coordinates } from "../../Running/RunningContent";


export interface LocationDataProps {
	startCoordinates:  Coordinates;
	endCoordinates: Coordinates;
	startAddress: string;
	endAddress: string;
}


export interface GeneralRunProps {
	title: string; // 크루 이름
	content: string; // 크루 소개
	activityRegion: string; // 활동 지역
	inputLocation: string;
	inputLatitude: number;
	inputLongitude: number;
	targetLocation: string;
	targetLatitude: number;
	targetLongitude: number;
	maxParticipants: number; // 최대 수용 인원
	fileDtos: FileDto[]; // 파일 정보 목록
	date: string;

}



const EditRun = () => {
	const location = useLocation();
	const { info } = location.state || {};
	const { content, title: runName, maximumPeople, runId } = info
	const [isEdit, setIsEdit] = useState(false)



	const currentDate = new Date();
	const navigate = useNavigate()
	const [startDate, setStartDate] = useState<Date | null>(currentDate);
	const [imgfiile, setImageUrls] = useState<string[] | FormData>([]);
	const [locationData, setLocationData] = useState<LocationDataProps>({
		startCoordinates: { lat: 37.6428999322418, lng: 127.009680856107 },
		endCoordinates: { lat: 37.63887785974017, lng: 127.01058220054608 },
		startAddress: "",
		endAddress: "",
	});



	useEffect(() => {
		if (location.pathname.includes('edit')) {
			setIsEdit(true)
		}
	}, [])



	const { mutate } = useMutation({
		mutationFn: postEditRunApi,
		onSuccess: (data) => {
			toast.success("달리기가 수정되었습니다. !");
			console.log("수정된 데이터 :", data);
			navigate('/runlist')
		},
		onError: (error) => {
			toast.error("수정 실패 !");
			console.error("에러 내용:", error);
		},
	});


	const handleSubmit = async (data: InputData) => {
		const date = dateFormatter(startDate)
		try {
			const imgurl = await uploadFiles(
				"http://ec2-54-180-9-220.ap-northeast-2.compute.amazonaws.com:8080/api/storage",
				imgfiile,
				{ directory: "General_runImg", big: false },
			);

			// const fileDtos: FileDto[] = imgurl.map((file: UploadedFile) => ({
			// 	fileName: file.fileName,
			// 	fileUrl: file.fileUrl,
			// }));

			const newData = {
				title: runName,
				content: content,
				location: data.activityRegion,
				inputLocation: locationData.startAddress,
				inputLatitude: locationData.startCoordinates?.lat,
				inputLongitude: locationData.startCoordinates?.lng,
				targetLocation: locationData.endAddress,
				targetLatitude: locationData.endCoordinates?.lat,
				targetLongitude: locationData.endCoordinates?.lng,
				maximumPeople: maximumPeople,
				fileUrls: imgurl,
				date: date.date,
				startTime: date.startTime
			}

			mutate({ data: newData, runId })
		}
		catch (error) { console.log(error) }

	};


	return (
		<div className="flex flex-col items-center mb-20">
			<FormLayout
				title="사람들과 함께 달려보세요!"
				fields={fields}
				onSubmit={handleSubmit}
				setImageUrls={setImageUrls}
				isEdit={isEdit}
				content={content}
				runName={runName}
				maximumPeople={maximumPeople}


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
export default EditRun