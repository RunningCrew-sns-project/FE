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
      date: "2024-11-06",
      type: "text",
      isSentByUser: false,
  },
  {
      id: 2,
      sender: "사용자",
      message: "불가 해",
      time: "2024-11-04T20:27:21.769",
      date: "2024-11-07",
      type: "text",
      isSentByUser: true,
  },
  {
      id: 3,
      sender: "사용자",
      message: "내일은 어떨까?",
      time: "2024-11-04T20:27:21.769",
      date: "2024-11-07",
      type: "text",
      isSentByUser: true,
  },
  {
      id: 4,
      sender: "감자돌이",
      img: 'https://example.com/image1.jpg',
      content: "집에 가고싶다",
      time: "2024-11-05T20:27:21.769",
      date: "2024-11-10",
      type: "image",
      isSentByUser: false,
  },
  {
      id: 5,
      sender: "감자돌이",
      img: 'https://example.com/image2.jpg',
      content: "점심은 뭐 먹지?",
      time: "2024-11-05T20:27:21.769",
      date: "2024-11-10",
      type: "image",
      isSentByUser: false,
  },
  {
      id: 6,
      sender: "사용자",
      message: "맛있는 거 먹어야지!",
      time: "2024-11-06T20:27:21.769",
      date: "2024-11-10",
      type: "text",
      isSentByUser: true,
  },
  {
      id: 7,
      sender: "감자돌이",
      message: "내일은 비온대!",
      time: "2024-11-06T20:27:21.769",
      date: "2024-11-10",
      type: "text",
      isSentByUser: false,
  },
  {
      id: 8,
      sender: "사용자",
      message: "우산 챙겨야겠다.",
      time: "2024-11-07T20:27:21.769",
      date: "2024-11-11",
      type: "text",
      isSentByUser: true,
  },
  {
      id: 9,
      sender: "감자돌이",
      message: "날씨가 계속 변하네.",
      time: "2024-11-07T20:27:21.769",
      date: "2024-11-11",
      type: "text",
      isSentByUser: false,
  },
  {
      id: 10,
      sender: "사용자",
      img: 'https://example.com/image3.jpg',
      content: "여기 사진 보여줄게!",
      time: "2024-11-08T20:27:21.769",
      date: "2024-11-12",
      type: "image",
      isSentByUser: true,
  },
  {
      id: 11,
      sender: "감자돌이",
      img: 'https://example.com/image4.jpg',
      content: "이런 풍경 너무 좋아.",
      time: "2024-11-09T20:27:21.769",
      date: "2024-11-12",
      type: "image",
      isSentByUser: false,
  },
  {
      id: 12,
      sender: "사용자",
      message: "다음에 같이 가자!",
      time: "2024-11-10T20:27:21.769",
      date: "2024-11-12",
      type: "text",
      isSentByUser: true,
  },
  {
      id: 13,
      sender: "감자돌이",
      message: "좋아, 약속해!",
      time: "2024-11-11T20:27:21.769",
      date: "2024-11-12",
      type: "text",
      isSentByUser: false,
  },
  {
      id: 14,
      sender: "사용자",
      message: "기대된다!",
      time: "2024-11-12T20:27:21.769",
      date: "2024-11-12",
      type: "text",
      isSentByUser: true,
  },
  {
      id: 15,
      sender: "감자돌이",
      img: 'https://example.com/image5.jpg',
      content: "이 그림 좋아해?",
      time: "2024-11-13T20:27:21.769",
      date: "2024-11-13",
      type: "image",
      isSentByUser: false,
  },
  {
      id: 16,
      sender: "사용자",
      message: "정말 예쁘네!",
      time: "2024-11-14T20:27:21.769",
      date: "2024-11-14",
      type: "text",
      isSentByUser: true,
  },
];


const ChatRoom = () => {
	const { isMobile, isTablet } = useDevice();
  const [messages, setMessages ] = useState(message)
  const [imgUrl, setImageUrls] =useState([])

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
				<ChatHeader title="Team Unicorns" status="last seen 45 minutes ago"  />
				<div className="absolute top-[130px] bottom-16 w-full overflow-y-auto ">
					<ChatList messages={messages} />
				</div>
				<div className={`absolute bottom-0 w-full z-20`} >
					<ChatInput  handleSendMsg={handleSendMsg} setImageUrls={setImageUrls} imgUrl={imgUrl}/>
				</div>
			</div>
		</>
	);
};

export default ChatRoom;
