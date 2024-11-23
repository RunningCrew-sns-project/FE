

import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

interface runResult {
  saveTime: string;
  saveProgress : number;
}

const { persistAtom } = recoilPersist();

export const rundata = atom<runResult>({
  key: 'rundata', 
  default: { saveTime: '', saveProgress: 0 },
  effects_UNSTABLE: [persistAtom],
});