// i18n.ts
import 'intl-pluralrules';
import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const translationGetters = {
  'fr-FR': () => require('./assets/locales/fr/FR.json'),
};

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lng: string) => void) => {
    callback(Localization.getLocales()[0].languageTag);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr-FR',
    debug: true,
    interpolation: { escapeValue: false },
    defaultNS: 'common',
    resources: {
      'fr-FR': translationGetters['fr-FR'](),
    },
  });

export default i18n;
