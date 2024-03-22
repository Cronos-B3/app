import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { storage } from './storage/storage';
import { DEFAULT_THEME, Theme } from 'assets/themes/themes';
import { DEFAULT_LANG, Lang } from 'locales/Lang';

type State = {
  lang: Lang;
  theme: Theme;
};

type Actions = {
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
};

export const useConfigStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      lang: DEFAULT_LANG,
      theme: DEFAULT_THEME,
      setLang: (lang: Lang) =>
        set((state) => {
          state.lang = lang;
        }),
      setTheme: (theme: Theme) =>
        set((state) => {
          state.theme = theme;
        })
    })),
    { name: 'ConfigStore', version: 1, storage }
  )
);
