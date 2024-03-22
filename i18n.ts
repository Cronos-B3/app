import i18n from 'i18next';
import { DEFAULT_LANG, RESOURCES } from 'locales/Lang';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: RESOURCES,
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
  ns: ['common', 'title', 'input', 'app', 'auth', 'policy', 'success', 'error'],
  defaultNS: 'common'
});

export default i18n;
