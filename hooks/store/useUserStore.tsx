import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { UserType } from '@/constants/types';

type State = {
  user?: UserType;
};

type Actions = {
  setUser: (user: UserType) => void;
};

export default create<State & Actions>()(
  immer((set) => ({
    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),
  }))
);
