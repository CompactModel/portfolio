import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => i18n.changeLanguage(lang);

  return { t, currentLang: i18n.language, changeLanguage };
}
