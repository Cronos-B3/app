import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { MyUserType } from '@/constants/types';
import { storage } from '@/lib/storage';

type State = {
  user?: MyUserType;
};

type Actions = {
  setUser: (user: MyUserType) => void;
};

export default create<State & Actions>()(
  persist(
    immer((set) => ({
      setUser: (user) =>
        set((state) => {
          state.user = user;
        }),
    })),
    { name: 'UserStore', version: 1, storage }
  )
);
