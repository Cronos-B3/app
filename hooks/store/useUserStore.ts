import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type UserType = {
  username: string;
  nickname: string;
  email: string;
  birthdate?: string;
  role: 'ROLE_USER';
};

type State = {
  user?: UserType;
};

type Actions = {
  setUser: (user: UserType) => void;
  logout: () => void;
};

export const useUserStore = create<State & Actions>()(
  immer((set) => ({
    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),
    logout: () =>
      set((state) => {
        state.user = undefined;
      })
  }))
);
