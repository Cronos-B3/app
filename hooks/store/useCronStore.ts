import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Cron = {
  user: {
    username: string;
    nickname: string;
    profile_picture: string;
  };
  id: string;
  text: string;
  end_at: string;
};

type State = {
  crons: Cron[];
};

type Actions = {
  setCrons: (crons: Cron[]) => void;
  addCronsToTop: (crons: Cron[]) => void;
  addCronsToBottom: (crons: Cron[]) => void;
  resetCrons: () => void;
};

export const useCronStore = create<State & Actions>()(
  immer((set) => ({
    crons: [],
    setCrons: (crons: Cron[]) =>
      set((state) => {
        state.crons = crons;
      }),
    addCronsToTop: (crons: Cron[]) =>
      set((state) => {
        console.log([...crons, ...state.crons]);

        state.crons = [...crons, ...state.crons];
      }),
    addCronsToBottom: (crons: Cron[]) =>
      set((state) => {
        state.crons = [...state.crons, ...crons];
      }),
    resetCrons: () =>
      set((state) => {
        state.crons = [];
      })
  }))
);
