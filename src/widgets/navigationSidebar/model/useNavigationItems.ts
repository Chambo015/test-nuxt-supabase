import type { NavigationItemType } from "./navigationItem.type.ts";
import { AppRoutes } from "~/shared/enums";

export function useNavigationItems() {
  const config = useRuntimeConfig();
  const route = useRoute();
  const isCabinetInfoSecurity = computed(() => route.path.includes("cabinet-infosecurity"));

  const CabinetInfoSecuritySidebarItemsList: NavigationItemType[] = [
    {
      name: "actions.sideBar.referrals",
      icon: "flash-circle",
      path: AppRoutes.InfosecurityReferrals,
    },
    {
      name: "actions.sideBar.progress",
      icon: "list",
      path: AppRoutes.InfosecurityProgress,
    },
  ];

  const MainSidebarItemsList: NavigationItemType[] = [
    {
      name: "actions.sideBar.home",
      icon: "home",
      path: AppRoutes.Main,
    },
    {
      name: "actions.sideBar.list",
      icon: "list",
      path: AppRoutes.Feed,
    },
    {
      name: "actions.sideBar.awareness",
      icon: "awareness",
      path: AppRoutes.Awareness,
    },
    {
      name: "actions.sideBar.methodology",
      icon: "methodology",
      path: AppRoutes.Methodology,
    },
  ];

  const DevItemsList: NavigationItemType[] = [
    {
      name: "actions.sideBar.all-courses",
      icon: "courses",
      path: AppRoutes.Courses,
    },
  ];

  const computedSidebarItemsList = computed<NavigationItemType[]>(() => {
    // Сайдбар у кабинета ИБ
    if (isCabinetInfoSecurity.value) return CabinetInfoSecuritySidebarItemsList;
    // Добавляем в основной Сайдбар тестовую навигацию
    if (config.public.SiteMode === "development") return [...MainSidebarItemsList, ...DevItemsList];
    return MainSidebarItemsList;
  });

  return {
    sidebarItemsList: computedSidebarItemsList,
    isCabinetInfoSecurity,
  };
}
