import { useDevice } from "../../hook/usedevice";
import ActiveChatItem from "./ActiveChatItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal/Modal";


const ActiveChat = ({isOpen, onClose}) => {
	const { isMobile, isTablet } = useDevice();

	const chatData = [
		{ title: "Talk Title", time: "6:12 AM", content: "Talk content" },
		{ title: "Talk Title", time: "6:12 AM", content: "Talk content" },
		{ title: "Talk Title", time: "6:12 AM", content: "Talk content" },
	];


	return (
		<>
			<Modal isOpen={isOpen}  onClose={onClose}>
				<div
					className={`${
						isMobile || isTablet
							? "w-full h-screen"
							: "w-full max-w-[420px] h-[720px]"
					} bg-white rounded-lg relative overflow-hidden`}
				>
					<div className="flex items-center p-4 bg-gray-200">
						<FontAwesomeIcon
							icon={faArrowLeft}
							className={`${isMobile || isTablet ? "text-white" : "text-balck"} text-2xl cursor-pointer`}
							onClick={onClose}
						/>
						<h1 className="text-lg font-bold">chat</h1>
					</div>
					<div>
						{chatData.map((chat, index) => (
							<ActiveChatItem
								key={index}
								title={chat.title}
								time={chat.time}
								content={chat.content}
							/>
						))}
					</div>
				</div>
			</Modal>
		</>
	);
};

export default ActiveChat;
