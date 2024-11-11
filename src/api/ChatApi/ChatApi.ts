import { http } from "../request"


//채팅방 생성 
export const createRoomNameApi = async ({ roomName }) => {
  const res = await http.post(`api/chat/createRoom`, { roomName }, {
    params: { roomName }
  });
  return res;
};