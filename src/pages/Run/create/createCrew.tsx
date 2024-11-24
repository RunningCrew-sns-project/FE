import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { fields } from "../../../const/inputfileds";
import FormLayout from "../commonForm";
import { uploadCrewFiles } from "../../../api/image/api";
import { useNavigate } from "react-router-dom";
import { createCrew } from "../../../api/crew/api";

// 데이터 타입 정의
export interface ImageUrl {
	url: string; // 이미지 URL
}

export interface FileDto {
	fileName: string; // 파일 이름
	fileUrl: string; // 파일 URL
}

export interface CrewData {
	crewName: string; // 크루 이름
	crewIntroduction: string; // 크루 소개
	activityRegion: string; // 활동 지역
	maxCapacity: number; // 최대 수용 인원
	crewImageUrls: ImageUrl[]; // 이미지 URL 목록
	fileDtos: FileDto[]; // 파일 정보 목록
}

// 입력 필드 타입 정의
export interface InputData {
	crewName: string; // 크루 이름
	crewIntroduction: string; // 크루 소개
	activityRegion: string; // 활동 지역
	maxCapacity: string | number; // 최대 수용 인원
}

// 업로드된 파일의 타입 정의
export interface UploadedFile {
	fileName: string;
	fileUrl: string;
}

const Crew = () => {
	const [imageUrls, setImageUrls] = useState<string[] | FormData>([]);
	const navigatge = useNavigate();

	const { mutate } = useMutation({
		mutationFn: createCrew,
		onSuccess: (data) => {
			toast.success("크루 생성 성공!");
			console.log("생성된 크루 데이터:", data);
			navigatge("/runlist");
		},
		onError: (error) => {
			toast.error("크루 생성 실패!");
			console.error("에러 내용:", error);
		},
	});

	const handleSubmit = async (data: InputData) => {
		data.maxCapacity = Number(data.maxCapacity); // maxCapacity를 숫자로 변환
		try {
			// 이미지 업로드
			const imgurl = await uploadCrewFiles(
				"https://runlink.kro.kr/api/storage",
				imageUrls,
				{ directory: "crew_image", big: false },
			);

			// crewImageUrls와 fileDtos를 필요한 형식으로 변환
			const crewImageUrls: ImageUrl[] = imgurl.map((file: UploadedFile) => ({
				url: file.fileUrl,
			}));
			const fileDtos: FileDto[] = imgurl.map((file: UploadedFile) => ({
				fileName: file.fileName,
				fileUrl: file.fileUrl,
			}));

			// 최종 전송 데이터 구성
			const newData: CrewData = {
				crewName: data.crewName,
				crewIntroduction: data.crewIntroduction,
				activityRegion: data.activityRegion,
				maxCapacity: data.maxCapacity,
				crewImageUrls: crewImageUrls,
				fileDtos: fileDtos,
			};

			console.log("최종 전송 데이터:", newData); // 요청 데이터 확인

			// 서버에 데이터 전송
			mutate(newData);
		} catch (error) {
			console.log("파일 업로드 에러:", error);
		}
	};

	return (
		<div className="flex flex-col items-center mb-20">
			<FormLayout
				title="사람들과 함께 달려보세요!"
				fields={fields}
				onSubmit={handleSubmit}
				setImageUrls={setImageUrls}
			/>
		</div>
	);
};

export default Crew;
