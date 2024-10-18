import { useAuthStore } from "~/shared/store/auth.store";

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const localeRoute = useLocaleRoute();

  // hide from UnAuthorized users
  if (to.meta.auth && !authStore.isLoggedIn) {
    return navigateTo(localeRoute({ path: "/", replace: true })?.fullPath);
  }

  // hide cabinet IS if user is just client
  if (to.meta.cabinetIS && !authStore?.user?.is_ib) {
    return navigateTo(localeRoute({ path: "/", replace: true })?.fullPath);
  }

  // hide from authorized users
  if (to.meta.hideAuth && authStore.isLoggedIn) {
    return navigateTo(localeRoute({ path: "/", replace: true })?.fullPath);
  }

  // hide if page have definePageMeta({development: true});
  if (config.public.SiteMode === "production" && to.meta.development) {
    return navigateTo(localeRoute({ path: "/", replace: true })?.fullPath);
  }
});
