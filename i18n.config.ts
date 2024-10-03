import { locales } from "~/locales";

export default defineI18nConfig(() => {
  // take default locale from cookie saved from pinia persist
  // const initLocaleFromStore = useCookie<{ localLang: { code: string } } | null | undefined>("auth2");
  // const initLocaleFromI18n = useCookie<string | null | undefined>("i18n_redirected");

  return {
    legacy: false,
    locale: "ru",
    globalInjection: true,
    messages: locales,
    // locales: ["kk", "ru"],
  };
});
