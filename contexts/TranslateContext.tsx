import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import langs, { Lang, LangObject } from 'assets/languages/languages';

export type TranslateContextType = {
  text: LangObject;
  lang: Lang;
  setLang: Dispatch<SetStateAction<Lang>>;
};

const TranslateContext = createContext<TranslateContextType | null>(null);

export const TranslateProvider = ({ children }) => {
  if (__DEV__) console.log('🙌 - TranslateProvider');

  const [lang, setLang] = useState<Lang>(() => 'fr_FR');
  const [text, setText] = useState<LangObject>(() => langs.fr_FR);

  useEffect(() => {
    setText(langs[lang]);
  }, [lang]);

  return (
    <TranslateContext.Provider value={{ text, lang, setLang }}>
      {children}
    </TranslateContext.Provider>
  );
};

export const useTranslate = () => {
  const context = useContext(TranslateContext);
  if (context === null) throw new Error('useTranslate must be used within a TranslateProvider');
  return context;
};