import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  userId: number | null;
  isLoggedIn: boolean;
}

interface AuthActions {
  setUserId: (userId: number) => void;
  setLoginState: (isLoggedIn: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState & AuthActions>(
  persist(
    (set) => ({
      userId: null,
      isLoggedIn: false,
      setUserId: (userId: number) => set({ userId }),
      setLoginState: (isLoggedIn: boolean) => set({ isLoggedIn }),
      logout: () => {
        set({ userId: null, isLoggedIn: false });
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_refresh_token');
      },
    }),
    {
      name: 'auth-storage', // 저장할 이름
      getStorage: () => localStorage, // 사용할 저장소
    }
  )
);

export default useAuthStore;
