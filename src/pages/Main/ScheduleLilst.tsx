import MainBtnItem from "./mainBtnItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const ScheduleList = ({ schedules,handleIsOpen, handleMoveBtn }) => {
	return (
		<>
			<div className=" bg-white  bg-opacity-40 text-black px-4 py-2 rounded-xl w-max-[320px] w-[340px] max-h-[200px] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <p>오늘의 스케줄</p>
          <FontAwesomeIcon icon={faChevronUp} onClick={handleIsOpen} className="cursor-pointer" />
        </div>
				{schedules.map((schedule) => (
					<MainBtnItem title={schedule.title} id={schedule.id} handleMoveBtn={handleMoveBtn}/>
				))}
			</div>
		</>
	);
};

export default ScheduleList;
