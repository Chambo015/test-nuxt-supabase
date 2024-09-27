import { install } from "vue3-recaptcha-v2";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(install, {
    sitekey: "6Lc_fRYqAAAAAG4FO6YyihQuAjQF8l6jYaXdBtYc",
    cnDomains: false,
  });
});
