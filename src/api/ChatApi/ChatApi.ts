import { Params } from "../../hook/useChatConnect";
import { http } from "../request"


interface RoomNamePayload {
  roomName: string;
}

//채팅방 생성 
export const createRoomNameApi = async ({ roomName } : RoomNamePayload) => {
  const res = await http.post(`api/chat/createRoom`,{ roomName },);
  return res;
};



// 과거 초기 메세지 기록 가져오기 
export const getInitialMsgApi = async (params : Params) => {
  const res = await http.get(`/api/chat/message`, {
    params : params
  })
  return res
}

// 참여중인 채팅방 불러오기 

export const getChatRoomsApi = async () => {
  const res = await http.get(`/api/chat/myRooms`)
  return res 
}

//참여중이 유저 불러오기 
export const getChatUser = async (roomId : string | null) => {
  const res = await http.get(`/api/chat/userlist/${roomId}`)
  return res 
}