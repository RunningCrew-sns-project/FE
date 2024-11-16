import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

interface Room {
  roomName: string;
  roomId: string; 
}

const { persistAtom } = recoilPersist();


export const roomsState = atom<Room[]>({
  key: 'roomsState', // 고유한 key 값
  default: [], // 초기값으로 빈 배열 설정
  effects_UNSTABLE: [persistAtom],
});