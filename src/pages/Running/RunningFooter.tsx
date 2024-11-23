import { useDevice } from "../../hook/usedevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RunResultModal from "../../components/Modal/RunResult";
import { useLocation, useNavigate } from "react-router-dom";

interface RunningFooterProps {
	stop: () => void;
	setIsStop: (value: boolean) => void;
	data: { time: string; progress: number }; // data의 구조에 따라 수정 필요
	distance: number | undefined;
}

const RunningFooter = ({
	stop,
	setIsStop,
	data,
	distance,
}: RunningFooterProps) => {
	const { isMobile, isTablet } = useDevice();
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const roomId = queryParams.get("roomId");
	const { roomData, id } = location.state || {};
	console.log("푸터에서 확인 룸데이터", roomData, "겟기글 아디이", id);

	const handleOpneModal = () => {
		stop();
		setIsOpen(true);
		setIsStop(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
		setIsStop(false);
	};

	const hadleMoveChat = () => {
		navigate(`/chat?roomId=${roomId}`, {
			state: { roomData: roomData, id: id },
		});
	};

	return (
		<>
			<div
				className={`${isMobile || isTablet ? "bg-black h-[80px]" : "bg-primary"} w-full h-[80px] rounded-t-3xl`}
				style={{ lineHeight: "80px" }}
			>
				<div className="flex items-center justify-around h-full">
					<div
						className={`${isMobile || isTablet ? "text-white" : "text-black"} cursor-pointer flex flex-col items-center`}
						onClick={hadleMoveChat}
					>
						<FontAwesomeIcon icon={faComments} className="text-2xl mb-1" />
						<span className="text-xs">채팅하기</span>
					</div>
					<div
						className={`${isMobile || isTablet ? "text-white" : "text-black"} cursor-pointer flex flex-col items-center`}
						onClick={handleOpneModal}
					>
						<FontAwesomeIcon icon={faDoorOpen} className="text-2xl mb-1" />
						<span className="text-xs">종료하기</span>
					</div>
					<RunResultModal
						isOpen={isOpen}
						onClose={handleCloseModal}
						data={data}
						distance={distance}
					/>
				</div>
			</div>
		</>
	);
};

export default RunningFooter;
