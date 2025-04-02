import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  expiresAt: number | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  getToken: () => string | null;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      expiresAt: null,
      setToken: (token: string) => {
        const expiresIn = 3600; //  (in seconds)
        const expirationTime = Date.now() + expiresIn * 1000;
        set({ token, expiresAt: expirationTime });
      },
      clearToken: () => set({ token: null, expiresAt: null }),
      getToken: () => {
        const { token, expiresAt } = get();
        if (expiresAt && Date.now() > expiresAt) {
          set({ token: null, expiresAt: null });
          return null;
        }
        return token;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage as StateStorage),
    }
  )
);
export const getAuthState = () => useAuthStore.getState();
export default useAuthStore;
