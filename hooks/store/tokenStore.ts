import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { storage } from './storage/storage';

type TokenStore = {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const useTokenStore = create<TokenStore, [['zustand/persist', TokenStore]]>(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      removeToken: () => set({ token: undefined })
    }),
    { name: 'token', version: 1, storage }
  )
);
