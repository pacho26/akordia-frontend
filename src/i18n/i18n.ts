import { createI18n } from 'vue-i18n';
import messages from './translations';

const language = navigator.language.toLowerCase();
const i18n = createI18n({
  fallbackLocale: 'en',
  globalInjection: true,
  legacy: false,
  allowComposition: true,
  locale: language || 'hr',
  messages,
});

export default i18n;

export const getLanguages = () => {
  return Object.keys(messages);
};
export const setLocale = (lang: 'hr' | 'en' | 'de') => {
  i18n.global.locale.value = lang;
  localStorage.setItem('lang', lang);
};
