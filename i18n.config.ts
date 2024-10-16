import { locales } from "~/locales";

export default defineI18nConfig(() => {
  // take default locale from cookie saved from pinia persist
  // const initLocaleFromStore = useCookie<{ localLang: { code: string } } | null | undefined>("auth2");
  // const initLocaleFromI18n = useCookie<string | null | undefined>("i18n_redirected");

  return {
    legacy: false,
    // fallbackLocale: "ru", // если не найден перевод будет использоваться русский
    globalInjection: true,
    messages: locales,
  };
});
