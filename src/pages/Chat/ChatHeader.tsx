import { useDevice } from "../../hook/usedevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import ActiveChat from "../../components/Modal/ActiveChat";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button";
import useChatConnect from "../../hook/useChatConnect";
import toast from "react-hot-toast";


interface ChatHeaderProps {
	title : string | null;

}

const ChatHeader = ({ title } : ChatHeaderProps) => {
	const { isMobile, isTablet } = useDevice();
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const roomId = queryParams.get("roomId");
	const [isOpen, setIsOpen] = useState(false);
	const { msgMove, roomData ,id  } = location.state || {};

	const { leaveRoom} = useChatConnect(roomId);

	const openList = () => {
		setIsOpen(true);
	};
	const closeList = () => {
		setIsOpen(false);
	};


	const handleGoBack = () => {
		navigate(`/running?roomId=${roomId}`, {state :{roomData : roomData , id : id}});
	};

	const handleRoomOut = () => {
		leaveRoom()
		console.log('채팅아웃')
		navigate('/')
		toast('채팅이 종료되었습니다 ')
	}

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
						>
							시작
						</Button>
					)}

					<div
						className={`${isMobile || isTablet ? "text-white" : "text-balck"}`}
					>
						<div className="text-center">
							<h3 className="text-xl font-black mb-4">{title}</h3>
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
