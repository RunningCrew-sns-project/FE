import { useState } from "react";
import DateFilter from "../../../components/Filter/DateFilter";
import { fields } from "../../../const/inputfileds";
import FormLayout from "../commonForm";
import { InputFieldProps } from "../inputField";
import MapPage from "../../../components/Map/Map";
// import Button from "../../../components/Button";



export interface LocationDataProps {
  startCoordinates: { lat: number; lng: number } | null;
  endCoordinates: { lat: number; lng: number } | null;
  startAddress: string;
  endAddress: string;
}




const Run = () => {
	const currentDate = new Date();
	const [startDate, setStartDate] = useState<Date | null>(currentDate);
	const [keyword, setKeyword] = useState(''); 
	const [locationData, setLocationData] = useState<LocationDataProps>({
		startCoordinates: null ,
    endCoordinates: null,
    startAddress: '', 
    endAddress: '', 
	})


	const handleSubmit = ( data: InputFieldProps) => {
		const submittedData = {
			...data,
			startDate: startDate, // 날짜 추가
			locationData: {
				...locationData, // locationData의 속성을 직접 포함
			},		};
		console.log(submittedData);
	};



	const handleSearch= (e : React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value)
		console.log('키워드', keyword)
	}

	return (
		<>
			<div className="flex flex-col items-center mb-20">
				<FormLayout
					title="사람들과 함께 달려보세요!"
					fields={fields}
					onSubmit={(e) => handleSubmit(e)}
				>
					<div className="mb-5 w-[320px] tablet:w-[640px] laptop:w-[800px] desktop:w-[800px]">
						<label className="font-black mb-2 block">일정</label>
						<DateFilter
							startDate={startDate}
							setStartDate={setStartDate}
							currentDate={currentDate}
						/>
					</div>

					<div className="">
						<label className="font-black mb-2 block">경로</label>
						<div className="">
							<span>출발지점</span>
							<div className="">
								<input type="text" value={locationData.startAddress} readOnly />
							</div>
							<span>도착지점</span>
							<div className="">
								<input type="text" value={locationData.endAddress} readOnly />
							</div>
						</div>
            <input type="text" value={keyword} placeholder="주소를 입력하세요" onChange={(e) => handleSearch(e)}/>
						{/* <Button theme="primary" onClick={() => handleSearch}>검색하기</Button> */}
						<MapPage setLocationData={setLocationData} locationData={locationData}  keyword={keyword} />
					</div>
				</FormLayout>
			</div>
		</>
	);
};

export default Run;
