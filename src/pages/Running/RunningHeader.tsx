import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDevice } from "../../hook/usedevice";
import { useState } from "react";
import ActiveChat from "../../components/Modal/ActiveChat";
import Modal from "../../components/Modal/Modal";

const RuningHeader = () => {
	const { isMobile, isTablet } = useDevice();
	const [isOpen, setIsOpen] = useState(false);

	const openList = () => {
		setIsOpen(true);
	};
	const closeList = () => {
		setIsOpen(false);
	};

	return (
		<>
			<div
				className={`${isMobile || isTablet ? "bg-black" : "bg-primary"} rounded-t-lg p-6  pt-9 pb-20 `}
			>
				<div className="flex  justify-between">
					<FontAwesomeIcon
						icon={faArrowLeft}
						className={`${isMobile || isTablet ? "text-white" : "text-balck"} text-2xl cursor-pointer`}
					/>

					<div
						className={`${isMobile || isTablet ? "text-white" : "text-balck"}`}
					>
						<h3 className="text-xl font-black mb-4">달리기 제목</h3>
						<div className="">
							<p className="text-sm">출발장소 : </p>
							<p className="text-sm">도착장소 : </p>
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

export default RuningHeader;
