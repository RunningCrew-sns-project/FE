import { useEffect, useRef, useState } from "react";
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
	const { message, sendMessage , userName, getInitialMsg ,lastTime} = useChatConnect(roomId);
	// const [isTop, setIsTop] = useState(0)
	// const  debouceTop = useDebounceTimeOut(isTop, 2000)


	const handleSendMsg = (newmsg : string) => {
		sendMessage(newmsg);
	};
	//스크롤 이벤트 진행 
	const topRef = useRef<HTMLDivElement>(null);

	const handleScroll = () => {
		if (topRef.current) {
			const { scrollTop } = topRef.current;
			if ( scrollTop === 0) {
				const params = {
          roomId: roomId,
          limit: 10, // 기본값으로 10개
          lastTime: lastTime, // 마지막 시간
        };
        getInitialMsg(params)
      }
		}
	};


	useEffect(() => {
		const container = topRef.current;
		console.log('실행이되는겨 ?', container)
		if (container) {
			container.addEventListener("scroll", handleScroll);
		}

		// 컴포넌트 언마운트 시 이벤트 리스너를 제거
		return () => {
			if (container) {
				container.removeEventListener("scroll", handleScroll);
			}
		};
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
				<div ref={topRef} className="absolute top-[130px] bottom-16 w-full overflow-y-auto  ">
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
