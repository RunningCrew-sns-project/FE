import { useDevice } from "../../hook/usedevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import ActiveChat from "../../components/Modal/ActiveChat";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button";
import useChatConnect from "../../hook/useChatConnect";
import toast from "react-hot-toast";

interface ScheduleData {
  id: number;
  isCrew: boolean;
  startDate: string;
  title: string;
}


const ChatHeader = () => {
	const { isMobile, isTablet } = useDevice();
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const roomId = queryParams.get("roomId");
	const [isOpen, setIsOpen] = useState(false);
	const { msgMove, roomData, id, schedules } = location.state || {};
	const [isTimeMatched, setIsTimeMatched] = useState(false);
	const { leaveRoom } = useChatConnect(roomId);


	// const hadnleOutSchaechle = () => {
	// 	const targetSchedule = schedules.find((schedule : ScheduleData)=> schedule.id === id);
	// 	console.log(targetSchedule.isCrew , '크루여부' , schedules)
	// }
	const openList = () => {
		setIsOpen(true);
	};
	const closeList = () => {
		setIsOpen(false);
	};

	const handleGoBack = () => {
		navigate(`/running?roomId=${roomId}`, {
			state: { roomData: roomData, id: id ,schedules: schedules },
		});
	};

	const handleRoomOut = () => {
		leaveRoom();
		console.log("채팅아웃")
		// hadnleOutSchaechle()
		navigate("/");
		toast("채팅이 종료되었습니다 ");
	};

	

	useEffect(() => {
		console.log("룸데이터, ", roomData);
		console.log("스케줄 확인 ", schedules);
	
		if(!msgMove){
			const targetSchedule = schedules.find((schedule : ScheduleData)=> schedule.id === id);
			// 스케줄이 존재하면 시간 비교를 진행
			if (targetSchedule && targetSchedule.startDate) {
				const checkTimeMatch = () => {
					const now = new Date();
					const start = new Date(targetSchedule.startDate); // 해당 스케줄의 startDate 사용
					console.log(now, start);
		
					// startDate가 현재 시간보다 같거나 이전이면 상태를 true로 설정
					if (start.getTime() <= now.getTime() && !isTimeMatched) {
						console.log(
							"약속 시간이 지났거나 현재와 일치",
							now.getTime(),
							start.getTime(),
						);
						setIsTimeMatched(true);
					}
				};
		
				checkTimeMatch(); // 첫 번째 실행 시 바로 checkTimeMatch 실행
		
				const intervalId = setInterval(checkTimeMatch, 50000); // 5초마다 실행
		
				// 컴포넌트 언마운트 시 interval 종료
				return () => clearInterval(intervalId);
			}
		}
		
	}, [schedules, isTimeMatched, id]); // id도 의존성 배열에 추가
	

	return (
		<>
			<div
				className={`${isMobile || isTablet ? "bg-black" : "bg-primary"} rounded-t-lg p-6  pt-9 pb-20 `}
			>
				<div className="flex  justify-between">
					{msgMove ? (
						<FontAwesomeIcon
							icon={faSignOutAlt}
							className={`${isMobile || isTablet ? "text-white" : "text-black"}  text-2xl cursor-pointer`}
							onClick={() => handleRoomOut()}
						/>
					) : (
						<Button
							type="button"
							theme="dark"
							className={`${isMobile || isTablet ? "text-white" : "text-balck"} text-xs  whitespace-nowrap w-[40px] h-[30px]`}
							onClick={handleGoBack}
							disabled={!isTimeMatched}
						>
							{isTimeMatched ? "시작" : "준비"}
						</Button>
					)}

					<div
						className={`${isMobile || isTablet ? "text-white" : "text-balck"}`}
					>
						<div className="text-center">
							<h3 className="text-xl font-black mb-4">
								{schedules && schedules.title ? schedules.title : roomId}
							</h3>
						</div>
					</div>
					<div className="">
						<FontAwesomeIcon
							icon={faBars}
							className={`${isMobile || isTablet ? "text-white" : "text-balck"} text-2xl cursor-pointer`}
							onClick={openList}
						/>
					</div>
				</div>
				{isOpen && (
					<Modal isOpen={isOpen} onClose={closeList}>
						<ActiveChat />
					</Modal>
				)}
			</div>
		</>
	);
};

export default ChatHeader;
