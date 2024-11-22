import { useState } from "react";
import Button from "../../components/Button";
import { LocationData } from "../Running/RunningContent";



interface SearchKeywordProps {
  locationData: LocationData;
  setLocationData: React.Dispatch<React.SetStateAction<LocationData>>;
}



const SearchKeword = ({locationData, setLocationData}:SearchKeywordProps) => {
	const [isChange, setIsChange] = useState(true);



  const handleChangeState = () => {
    setIsChange((prev) =>  !prev)
  }


  const handleUpdateAdress = (e :React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
		setLocationData((prevData) => ({
			...prevData,
			[name]: value, // name에 따라 startAddress 또는 endAddress를 업데이트
		}));
  }

	return (
		<>
			<div className="">
				<label className="font-black mb-2 block">경로</label>
				<div className="mb-2">
					<span className="block mb-2">
						<strong>출발 장소 :</strong>
            {locationData.startAddress || "출발 장소를 입력해주세요"}
					</span>
					<span>
						<strong>도착 장소 :</strong>
            {locationData.endAddress || "도착 장소를 입력해주세요"}
					</span>
				</div>
				<div className="">
					{isChange === true ? (
						<div>
							<strong className="mb-2">출발 장소를 입력해주세요</strong>
							<div className="flex ">
								<input
									type="text"
									placeholder="ex) 롯데월드"
									className="border border-gray-600 rounded bg-inputBg p-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500  w-full  mb-2"
                  name="startAddress"
                  onChange={(e) => handleUpdateAdress(e)}
								/>
								<Button theme="primary" className="w-full" type='button' onClick={() => handleChangeState()}>저장</Button>
							</div>
						</div>
					) : (
						<div>
							<strong>도착장소를 입력해주세요</strong>
							<div className="">
								<input
									type="text"
									placeholder="ex) 잠실 석촌호수 "
										className="border border-gray-600 rounded bg-inputBg p-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500  w-full  mb-2"
                  name="endAddress"
                  onChange={(e) => handleUpdateAdress(e)}
								/>
								<Button theme="primary" type='button' className="w-full" onClick={() => handleChangeState()}>저장</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default SearchKeword;
