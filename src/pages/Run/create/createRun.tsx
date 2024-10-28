import { useState } from "react";
import DateFilter from "../../../components/Filter/DateFilter";
import { fields } from "../../../const/inputfileds";
import FormLayout from "../commonForm";
import { InputFieldProps } from "../inputField";
import MapPage from "../../../components/Map/Map";
import SearchKeword from "../serachKeword";

export interface LocationDataProps {
	startCoordinates: { lat: number; lng: number } | null;
	endCoordinates: { lat: number; lng: number } | null;
	startAddress: string;
	endAddress: string;
}

const Run = () => {
	const currentDate = new Date();
	const [startDate, setStartDate] = useState<Date | null>(currentDate);
	const [imgfiile, setImgFile] = useState<FormData | null>(null);
	const [locationData, setLocationData] = useState<LocationDataProps>({
		startCoordinates: null,
		endCoordinates: null,
		startAddress: "",
		endAddress: "",
	});

	const handleSubmit = (data: InputFieldProps) => {
		const submittedData = {
			...data,
			startDate: startDate,
			locationData: {
				...locationData,
			},
			imgFile: imgfiile,
		};
		console.log(submittedData);
	};


	return (
		<div className="flex flex-col items-center mb-20">
			<FormLayout
				title="사람들과 함께 달려보세요!"
				fields={fields}
				onSubmit={(e) => handleSubmit(e)}
				setImgFile={setImgFile}
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
