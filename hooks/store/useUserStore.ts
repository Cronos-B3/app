import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {};

type Actions = {};

export const useUserStore = create<State & Actions>()(immer((set) => ({})));
