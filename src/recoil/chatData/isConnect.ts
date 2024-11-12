

import { atom } from 'recoil';

export const isConnectState = atom<boolean>({
  key: 'isConnectState', 
  default: false, 
});