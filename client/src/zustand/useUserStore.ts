import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string|undefined;
  name: string|undefined;
  email: string |undefined;
  role:string|undefined
}


interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
  }



  export const useUserStore = create<UserStore>()(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: "user-storage", 
        storage: createJSONStorage(() => localStorage)
      }
    )
  );  