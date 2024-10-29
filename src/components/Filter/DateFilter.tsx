import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button";


type DateFilterProps = {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  currentDate: Date;
};




const DateFilter = ({startDate, setStartDate, currentDate}: DateFilterProps) => {


	const formattedDate = format(currentDate, "yyyy/MM/dd");

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const isCreatePath = window.location.pathname.includes("create");
  const handleColor = (time: Date) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

	useEffect(() => {
    if (isCreatePath) {
      setStartDate(null); // 초기 로드 시 아무 선택도 되지 않은 상태로 설정
    }
  }, [isCreatePath, setStartDate]);

	return (
		<>
			<Button	type="button" theme="primary" onClick={openModal}>
				날짜 선택
			</Button>
			{startDate && (
        <input
          type="text"
          value={
            isCreatePath
              ? format(startDate, "yyyy-MM-dd HH:mm") // 경로에 "create"가 포함된 경우 날짜 + 시간 표시
              : startDate.toLocaleDateString()         // 그렇지 않은 경우 날짜만 표시
          }
          readOnly
        />
      )}
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<DatePicker
					selected={startDate}
					onChange={(date: Date | null) => {
						console.log(date)
						setStartDate(date);
					}}
					dateFormat="yyyy-MM-dd" // 날짜 형식 설정
					minDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
					closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
					placeholderText={formattedDate} // placeholder
					inline
					showTimeSelect={isCreatePath} 
					timeClassName={isCreatePath ? handleColor : undefined}
				/>
			</Modal>
		</>
	);
};
export default DateFilter;
