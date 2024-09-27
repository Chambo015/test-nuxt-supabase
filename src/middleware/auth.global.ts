import { useAuthStore } from "~/shared/store/auth.store";

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  // hide from UnAuthorized users
  if (to.meta.auth && !authStore.isLoggedIn) {
    return navigateTo("/", { replace: true });
  }

  // hide from authorized users
  if (to.meta.hideAuth && authStore.isLoggedIn) {
    return navigateTo("/", { replace: true });
  }

  // hide if page have definePageMeta({development: true});
  if (config.public.SiteMode === "production" && to.meta.development) {
    return navigateTo("/", { replace: true });
  }
});
