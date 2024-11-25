import { useEffect, useState } from "react";
import { useDevice } from "../../hook/usedevice";
import { useNavigate } from "react-router-dom";

import ActiveChatItem from "../../pages/Chat/ActiveChatItem";
import { getChatRoomsApi } from "../../api/ChatApi/ChatApi";


interface Chat {
	roomId: string;
	chatRoomImage: string;
	title: string;
	lastMessageTime: string;
	lastMessage: string;
}

const MessageList = () => {
	const { isMobile, isTablet } = useDevice();
	const [chatList, setChatList] = useState<Chat[]>([]);
	const navigate = useNavigate();

	const getChatList = async () => {
		const RoomList = await getChatRoomsApi();
		const rooms = RoomList.data.success.responseData;
		setChatList(rooms);
		console.log(RoomList);
	};

	useEffect(() => {
		getChatList();
	}, []);

	const handleChatClick = (roomId: string) => {
		const msgMove = "챗리스트이동";
		navigate(`/chat?roomId=${roomId}`, { replace: true, state: { msgMove } });
		window.location.reload();
	};

	return (
		<>
			<div
				className={`${isMobile || isTablet ? "w-full h-screen  fixed top-0 left-0  z-50" : "w-[390px] h-[600px] min-h-[200px] max-h-[690px] rounded-lg shadow-2xl"} bg-white  overflow-hidden  overflow-y-auto `}
			>
				<h3
					className={`${isMobile || isTablet ? "mt-[60px] " : ""} pt-[10px]`}
				></h3>
				<div className={``}>
					<div className="flex items-center p-4 bg-gray-200">
						<h1 className="text-lg font-bold">chat</h1>
					</div>
					<div className="cursor-pointer ">
						{chatList && chatList.length > 0 ? (
							chatList.map((chat) => (
								<div
									key={chat.roomId}
									onClick={() => handleChatClick(chat.roomId)}
								>
									<ActiveChatItem
										title={chat.title}
										time={chat.lastMessageTime}
										content={chat.lastMessage}
									/>
								</div>
							))
						) : (
							<div className="h-full">
							<p	className="flex items-center justify-center mt-10">아직, 진행중인 달리기가 없어요!</p>
						</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MessageList;
