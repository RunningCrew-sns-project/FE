import { useEffect, useState } from "react";
import { useDevice } from "../../hook/usedevice";
import ChatList from "./CatList";
import ChatInput from "./catui/ChatInput";
import ChatHeader from "./ChatHeader";


const message = [
  {
    id: 1,
    sender: "감자돌이",
    message: "오늘 달리기 가능한 사람?",
    time: "2024-11-02T20:27:21.769",
    //닉네임 추가 에정 , 유저구분은 sender아 이메일로 
    type: "text",
    isSentByUser: false, // 사용자가 보낸 것이 아님
  },
  {
    id: 2,
    sender: "사용자",
    message: "불가 해",
    time: "2024-11-04T20:27:21.769",
    type: "text",
    isSentByUser: true, // 사용자가 보낸 것
  },
  {
    id: 3,
    sender: "사용자",
    message: "불가 해",
    time: "2024-11-04T20:27:21.769",
    type: "text",
    isSentByUser: true,
  },
  {
    id: 4,
    sender: "감자돌이",
    img: 'https://example.com/image.jpg',
    content: "집에 가고싶다 ",
    time: "2024-11-05T20:27:21.769",
    type: "image",
    isSentByUser: false,
  },
];

const ChatRoom = () => {
	const { isMobile, isTablet } = useDevice();
  const [messages, setMessages ] = useState(message)
  

  useEffect(() => {
    // 요청 
    //받은 데이터에서 타임 날짜와 시간 분리하기 로직필요 
  },) 


  const handleSendMsg = (newMessage) =>{
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    //  socket.send(JSON.stringify(newMessage));
  }

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
				<div className="absolute top-[130px] w-full ">
					<ChatList messages={messages}/>
				</div>
				<div className={`absolute bottom-0 w-full z-20`}>
					<ChatInput  handleSendMsg={handleSendMsg} />
				</div>
			</div>
		</>
	);
};

export default ChatRoom;
