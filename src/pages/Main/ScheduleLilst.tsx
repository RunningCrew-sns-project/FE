import MainBtnItem from "./mainBtnItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";



interface Schedule {
  id: number;
  title: string;
  isCrew: boolean;
}

interface ScheduleListProps {
  schedules: Schedule[]; // 스케줄 배열 타입 정의
  handleIsOpen: () => void; // handleIsOpen은 인자가 없고 반환값이 없는 함수
  handleMoveBtn: (id: number) => void; // handleMoveBtn은 숫자 인자를 받고 반환값이 없는 함수
}

const ScheduleList = ({ schedules,handleIsOpen, handleMoveBtn }:ScheduleListProps) => {
	return (
		<>
			<div className=" bg-white  bg-opacity-40 text-black px-4 py-2 rounded-xl w-max-[320px] w-[340px] max-h-[200px] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <p>오늘의 스케줄</p>
          <FontAwesomeIcon icon={faChevronUp} onClick={handleIsOpen} className="cursor-pointer" />
        </div>
				{schedules.map((schedule) => (
					<MainBtnItem title={schedule.title} id={schedule.id} isCrew={schedule.isCrew}  handleMoveBtn={handleMoveBtn}/>
				))}
			</div>
		</>
	);
};

export default ScheduleList;
