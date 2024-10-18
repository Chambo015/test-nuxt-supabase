import type { RouteLocationRaw } from "vue-router";

export function useLocalizatedRouter() {
  const localeRoute = useLocaleRoute();
  const router = useRouter();

  const changeLocale = (v: RouteLocationRaw) => {
    const route = localeRoute(v);
    if (route) {
      return route.fullPath;
    } else {
      throw new Error("localeRoute don't work");
    }
  };

  const localeRouter = {
    push: (v: RouteLocationRaw) => router.push(changeLocale(v)),
    replace: (v: RouteLocationRaw) => router.replace(changeLocale(v)),
  };

  return {
    localeRouter,
    localeNavigateTo: (v: RouteLocationRaw) => navigateTo(changeLocale(v)),
  };
}
