import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp, { Client, Frame } from "stompjs";
import { getInitialMsgApi } from "../api/ChatApi/ChatApi";

// input 컴포넌트에서 객체가 아닌 메세지만 가져오기 ! 
// 그 메세지를센드에서 요구한는 객체형식으로 보내기 때문 
// 메세지가 정상적으로 보내저야 콜백이 뜸 ;;
// connected to server undefined 이건 아무 상관없는거였음 

// interface ChatConnectProps {
//   roomId: string | null;
// }

export interface ChatMessage {
  type: string;
  roomId: string;
  sender: string;
  message: string;
  time: string; 
}


export interface Params {
  roomId: string | null ;
  limit: number;
  lastTime: string | null; 
}



const useChatConnect = (roomId  : string | null ) => {
  const [stompClient, setStompClient] = useState<Client | null>(null); 
  // const CHAT_URL = import.meta.env.VITE_BACKEND_URL;
  const BASE_PATH = "https://runlink.kro.kr";
  const auth_token = localStorage.getItem("auth_token");
  const [userName, setUserName] = useState<string | null>(null);
  const [lastTime, setLastTime] = useState(null)

  // 메세지 송수신
  const [message, setMessage] = useState<ChatMessage[]>([]); 
  const params = {
    roomId : roomId,
    limit: 10,
    lastTime: lastTime
  }
  
  //과거 데이터 가져오기 처음 
  const getInitialMsg = async (params: Params) => {
    const initialMsg = await getInitialMsgApi(params)
    console.log(initialMsg , '성공적인 초기 데이터 ? ')
    const resInitial = initialMsg.data.success.responseData
    const combinedMessages = resInitial.map((msg : ChatMessage) => ( {...msg}) )
    const lastMessageTime = resInitial[resInitial.length - 1].time;
    console.log('타임데이터,', lastMessageTime)
    setLastTime(lastMessageTime)
    // 무한스크롤시 업데이트 , 
    console.log(combinedMessages, '초기값')
    setMessage((prev) => [...combinedMessages.reverse(), ...prev]);
  }

  // useEffect로 연결만 한 번 시도
  useEffect(() => {
    console.log('현재 최신 메세지 ',message)
    if (!roomId) {
      console.error("roomId가 없습니다.");
      return;
    }
    // 이미 연결된 경우 실행하지 않음
    if (stompClient) return;


    const socket = new SockJS(`${BASE_PATH.replace(/^http:\/\//, 'wss://')}/ws`);
    const client = Stomp.over(socket);

    client.connect(
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      (frame: Frame | undefined) => {
        console.log("STOMP 연결 성공", frame);
        getInitialMsg(params)
        const receivedUserName = frame?.headers && (frame.headers as { [key: string]: string })["user-name"];
        if (receivedUserName) setUserName(receivedUserName);

        // 연결 성공 후 구독
        client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          console.log("메시지 수신:", message);
          const chatMessage = JSON.parse(message.body);
          console.log('파싱데이터', chatMessage)
          setMessage((prev) => [...prev, chatMessage]);
        });

        // 입장 메시지 보내기
        const formattedDate = new Date().toISOString();
        client.send(
          "/pub/chat/enterUser",
          {},
          JSON.stringify({
            type: "ENTER",
            roomId: roomId,
            sender: receivedUserName,
            message: `${receivedUserName} 입장`,
            time: formattedDate,
          })
        );

        setStompClient(client); // 연결된 stompClient 저장
      },
      (error) => {
        console.error("STOMP 연결 실패:", error);
      }
    );

    return () => {
      if (stompClient) {
        (stompClient as Client).disconnect(() => console.log("연결 해제"));
        setStompClient(null);
      }
    };
  }, [roomId, message]);

  // 메시지 보내기
  const sendMessage = (newmsg : string) => {
    if (stompClient && stompClient.connected && userName) {
      console.log("이름", userName);
      stompClient.send(
        "/pub/chat/sendMessage",
        {},
        JSON.stringify({
          type: "TALK",
          roomId: roomId,
          sender: userName,
          message: newmsg,
          time: new Date().toISOString(),
        })
      );
    }
  };


  const leaveRoom = () => {
    if(stompClient && stompClient.connected && userName){
      stompClient.send(
        "/pub/chat/leaveUser",
        {},
        JSON.stringify({
          type: "LEAVE",
          roomId: roomId,
          sender: userName,
          time: new Date().toISOString(),
        })
      )
    }

    stompClient?.disconnect(() => {
      console.log('구독해제')
    })
  }

  return { message, sendMessage ,  userName , leaveRoom, getInitialMsg , lastTime};
};

export default useChatConnect;
