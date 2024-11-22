import { useEffect, useState } from "react";
import { useDevice } from "../../hook/usedevice";
import ChatList from "./CatList";
import ChatInput from "./catui/ChatInput";
import ChatHeader from "./ChatHeader";

import useChatConnect from "../../hook/useChatConnect";
import { useLocation } from "react-router-dom";


const ChatRoom = () => {
	const { isMobile, isTablet } = useDevice();
	const [imgUrl, setImageUrls] = useState<string[]>([]);

  const location = useLocation();
	const queryParams = new URLSearchParams(location.search); 
  const roomId = queryParams.get("roomId"); 

	

	
	const { message, sendMessage , userName} = useChatConnect(roomId);

	const handleSendMsg = (newmsg : string) => {
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
				<ChatHeader title={roomId} />
				<div className="absolute top-[130px] bottom-16 w-full overflow-y-auto ">
					<ChatList messages={message}  userName={userName}/>
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
