import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button";

const DateFilter = () => {
	const currentDate = new Date();
	const formattedDate = format(currentDate, "yyyy/MM/dd");

	const [startDate, setStartDate] = useState<Date | null>(currentDate);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

	return (
		<>
      <Button theme="dark" onClick={openModal}>날짜 선택</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => {
            setStartDate(date);
            closeModal(); // 날짜 선택 후 모달 닫기
          }}
          dateFormat="yyyy-MM-dd" // 날짜 형식 설정
          minDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
          //  closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
          placeholderText={formattedDate} // placeholder
        />
      </Modal>
		</>
	);
};
export default DateFilter;
