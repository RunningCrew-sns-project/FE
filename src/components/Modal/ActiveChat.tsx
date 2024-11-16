import { useEffect, useState } from "react";
import { getChatRoomsApi } from "../../api/ChatApi/ChatApi";
import { useDevice } from "../../hook/usedevice";
import ActiveChatItem from "../../pages/Chat/ActiveChatItem";
import { useNavigate } from "react-router-dom";

const ActiveChat = () => {
	const { isMobile, isTablet } = useDevice();
	const [chatList, setChatList] = useState([]);
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
		navigate(`/chat?roomId=${roomId}`); // roomId를 쿼리 파라미터로 전달하여 URL 변경
	};

	return (
		<>
			<div
				className={`${
					isMobile || isTablet
						? "w-full h-screen"
						: "w-full max-w-[420px] h-[720px]"
				} bg-white rounded-lg relative overflow-hidden w-full overflow-y-auto`}
			>
				<div className="flex items-center p-4 bg-gray-200">
					<h1 className="text-lg font-bold">chat</h1>
				</div>
				<div className="cursor-pointer">
					{chatList.map((chat) => (
						<div className="" onClick={() => handleChatClick(chat.roomId)}>
							<ActiveChatItem
								chatRoomImage={chat.chatRoomImage}
								key={chat.roomId}
								title={chat.title}
								time={chat.lastMessageTime}
								content={chat.lastMessage}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ActiveChat;
