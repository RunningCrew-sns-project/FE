import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      userId: null,
      isLoggedIn: false,
      setUserId: (userId) => set({ userId }),
      setLoginState: (isLoggedIn) => set({ isLoggedIn }),
      logout: () => {
        set({ userId: null, isLoggedIn: false });
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_refresh_token');
      },
    }),
    {
      name: 'auth-storage', 
      getStorage: () => localStorage, 
    }
  )
);

export default useAuthStore;
 