import { http } from "../request"


//채팅방 생성 
export const createRoomNameApi = async ({ roomName }) => {
  const res = await http.post(`api/chat/createRoom`,{ roomName },);
  return res;
};



// 과거 초기 메세지 기록 가져오기 
export const getInitialMsgApi = async (params) => {
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