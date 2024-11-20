import { useDevice } from "../../hook/usedevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import ActiveChat from "../../components/Modal/ActiveChat";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button";

const ChatHeader = ({ title, status }) => {
	const { isMobile, isTablet } = useDevice();
	const [isOpen, setIsOpen] = useState(false);

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const roomId = queryParams.get("roomId");
	const { msgMove } = location.state || {};

	const openList = () => {
		setIsOpen(true);
	};
	const closeList = () => {
		setIsOpen(false);
	};

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(`/running?roomId=${roomId}`);
	};

	return (
		<>
			<div
				className={`${isMobile || isTablet ? "bg-black" : "bg-primary"} rounded-t-lg p-6  pt-9 pb-20 `}
			>
				<div className="flex  justify-between">
					{msgMove ? (
						<FontAwesomeIcon
							icon={faHome}
							className={`${isMobile || isTablet ? "text-white" : "text-black"}  text-2xl cursor-pointer`}
							onClick={() => navigate("/")}
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
							<p className="text-sm">{status} </p>
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
						<ActiveChat onClose={closeList} />
					</Modal>
				)}
			</div>
		</>
	);
};

export default ChatHeader;
