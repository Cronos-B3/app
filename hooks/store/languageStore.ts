import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Lang } from 'assets/languages/languages';
import { storage } from './storage/storage';

type LangStore = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const useLanguageStore = create<LangStore, [['zustand/persist', LangStore]]>(
  persist(
    (set) => ({
      lang: 'fr_FR',
      setLang: (lang) => {
        set({ lang });
      }
    }),
    { name: 'lang', version: 1, storage }
  )
);
