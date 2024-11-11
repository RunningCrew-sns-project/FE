import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp, { Client, Frame } from "stompjs";


interface ChatConnectProps {
  roomId: string;
  onNewMessage: (message: any) => void;
}

const useChatConnect = ({ roomId, onNewMessage }: ChatConnectProps) => {
  const [stompClient, setStompClient] = useState<Client | null>(null); // Client 타입 지정
  const CHAT_URL = import.meta.env.VITE_BACKEND_URL;
  const auth_token = localStorage.getItem("auth_token");
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (stompClient) return; // 이미 연결된 경우 실행하지 않음

    const socket = new SockJS(`${CHAT_URL}/ws`);
    const client = Stomp.over(socket)  

    client.connect(
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      (frame: Frame | undefined) => {
        console.log("STOMP 연결 성공", frame);
        const receivedUserName = frame?.headers["user-name"];
        if (receivedUserName) setUserName(receivedUserName);

        client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          const chatMessage = JSON.parse(message.body);
          onNewMessage(chatMessage); // 새 메시지를 상위 컴포넌트로 전달
          console.log("수신된 메시지:", chatMessage);
        });
        setStompClient(client); // 연결된 stompClient 저장
      },
      (error) => {
        console.error("STOMP 연결 실패:", error);
      }
    );

    return () => {
      if (client) {
        client.disconnect(() => console.log("연결 해제"));
        setStompClient(null); // 연결 해제 시 stompClient 초기화
      }
    };
  }, [roomId]);

  const sendMessage = (messageContent: string) => {
    if (stompClient && stompClient.connected && userName) {
      stompClient.send(
        '/pub/chat/sendMessage',
        {},
        JSON.stringify({
          type: "TALK",
          roomId: roomId,
          sender: userName,
          message: messageContent,
          time: new Date().toISOString(),
        })
      );
      console.log("메시지가 서버로 전송되었습니다:", messageContent);
    } else {
      console.error("stompClient가 연결되어 있지 않거나, userName이 설정되지 않았습니다.");
    }
  };


  return { sendMessage };
};

export default useChatConnect;
