import { storage } from '@/lib/storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  token?: string;
};

type Actions = {
  setToken: (token: string) => void;
  removeToken: () => void;
};

export default create<State & Actions>()(
  persist(
    immer((set) => ({
      setToken: (token) =>
        set((state) => {
          state.token = token;
        }),
      removeToken: () =>
        set((state) => {
          state.token = undefined;
        }),
    })),
    { name: 'TokenStore', version: 1, storage }
  )
);
