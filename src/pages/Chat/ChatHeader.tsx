import { useDevice } from "../../hook/usedevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ title, status }) => {
	const { isMobile, isTablet } = useDevice();
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
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
						onClick={handleGoBack}
					/>
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
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatHeader;
