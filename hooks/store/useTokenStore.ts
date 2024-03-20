import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { storage } from './storage/storage';

type State = {
  token?: string;
};

type Actions = {
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const useTokenStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      token: undefined,
      setToken: (token: string) =>
        set((state) => {
          state.token = token;
        }),
      removeToken: () =>
        set((state) => {
          state.token = undefined;
        })
    })),
    { name: 'TokenStore', version: 1, storage }
  )
);
