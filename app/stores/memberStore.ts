import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

interface MemberStore {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
}

const useMemberStore = create<MemberStore>((set) => ({
  userData: null,
  setUserData: (data: UserData) => set({ userData: data }),
  clearUserData: () => set({ userData: null }),
}));

export default useMemberStore;
