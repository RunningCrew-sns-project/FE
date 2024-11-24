



import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

interface todayDatatype {
  id: number | undefined;
  isCrew: boolean | undefined;
  isComplete: boolean;
}

const { persistAtom } = recoilPersist();

export const todayData = atom<todayDatatype[]>({
  key: 'todayData', 
  default: [],
  effects_UNSTABLE: [persistAtom],
});