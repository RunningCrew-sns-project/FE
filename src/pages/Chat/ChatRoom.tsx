import { useEffect, useState } from "react";
import { useDevice } from "../../hook/usedevice";
import ChatList from "./CatList";
import ChatInput from "./catui/ChatInput";
import ChatHeader from "./ChatHeader";

import useChatConnect from "../../hook/useChatConnect";
import { useLocation } from "react-router-dom";

const ChatRoom = () => {
	const { isMobile, isTablet } = useDevice();
	const [imgUrl, setImageUrls] = useState([]);

  const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("roomId"); 
	const { message, sendMessage } = useChatConnect(roomId);

	const handleSendMsg = (newmsg) => {
		sendMessage(newmsg);
	};

	useEffect(() => {
		console.log('챗리스트 ', message)
	}, [message , roomId]);

	return (
		<>
			<div
				className={`${
					isMobile || isTablet
						? "w-full h-screen"
						: "w-full max-w-[420px] h-[720px]"
				} bg-white rounded-lg relative overflow-hidden`}
			>
				<ChatHeader title="Team Unicorns" status="last seen 45 minutes ago" />
				<div className="absolute top-[130px] bottom-16 w-full overflow-y-auto ">
					<ChatList messages={message} />
				</div>
				<div className={`absolute bottom-0 w-full z-20`}>
					<ChatInput
						handleSendMsg={handleSendMsg}
						setImageUrls={setImageUrls}
						imgUrl={imgUrl}
					/>
				</div>
			</div>
		</>
	);
};

export default ChatRoom;
