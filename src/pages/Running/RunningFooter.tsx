import { useDevice } from "../../hook/usedevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RunResultModal from "../../components/Modal/runResult";

const RunningFooter = () => {
	const { isMobile, isTablet } = useDevice();
	const [isOpen, setIsOpen] = useState(false);

	const handleOpneModal = () => {
		setIsOpen(true);
	};


  const handleCloseModal = () => setIsOpen(false);
  

	return (
		<>
			<div
				className={`${isMobile || isTablet ? "bg-black h-[80px]" : "bg-primary"} w-full h-[80px] rounded-t-3xl`}
				style={{ lineHeight: "80px" }}
			>
				<div className="flex items-center justify-around h-full">
					<div
						className={`${isMobile || isTablet ? "text-white" : "text-black"} cursor-pointer flex flex-col items-center`}
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
					<RunResultModal isOpen={isOpen} onClose={handleCloseModal} />
				</div>
			</div>
		</>
	);
};

export default RunningFooter;
