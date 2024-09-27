<template>
  <div class="absolute inset-0 max-md:hidden ">
    <div class="relative mx-auto h-full max-w-screen-2xl">
      <div
        class="sidebar absolute left-0 top-0 z-[9] h-full py-[30px] transition-all duration-300"
        :class="[isCollapse ? 'w-miniSidebarWidth' : 'w-sidebarWidth']"
      >
        <div class="sticky left-0 top-[30px]">
          <div v-if="isCabinetInfoSecurity" class="mb-8 ml-[18px] w-[120px] text-nowrap">
            <h1 class="text-nowrap bg-gradient-to-r from-black to-primary bg-clip-text font-NeueMachina text-lg font-bold text-transparent">
              Кабинет ИБ
            </h1>
          </div>
          <Button
            aria-label="Submit"
            class="bg-btn-back mb-[30px] ml-[18px] cursor-pointer border-0 transition-transform duration-300"
            :class="[isCollapse ? 'translate-x-0' : 'translate-x-[22px]']"
            :icon="`pi ${isCollapse ? 'pi-bars' : 'pi-arrow-left'}`"
            icon-class="text-black"
            @click="isCollapse = !isCollapse"
          />
          <nav class="bg-gradient-to-r from-main-bg">
            <ul class="menu">
              <li v-for="menu in menuList" :key="menu.name">
                <NuxtLink
                  v-tooltip.right="{
                    value: $t(`actions.sideBar.${menu.name}`),
                    disabled: !isCollapse,
                    pt: {
                      text: '!bg-transparent font-medium !text-main-purple !p-0',
                      root: '!bg-transparent !shadow-none !p-0 !-ml-4',
                      arrow: '!hidden',
                    },
                  }"
                  active-class="active"
                  class="flex items-center text-nowrap text-base"
                  :to="menu.path"
                  @click="handleClickLink(menu)"
                >
                  <BaseIcon class="mb-0 mr-2" :name="menu.icon" />
                  <template
                    v-if="!isCollapse"
                  >
                    {{ $t(`actions.sideBar.${menu.name}`) }}
                  </template>
                </NuxtLink>
              </li>
            </ul>
            <div v-if="!isCollapse" class="pl-[30px] pt-5 text-[#6f7f95]">
              <button
                class="flex items-center justify-between whitespace-nowrap py-2 text-left text-sm font-medium"
                @click="linksOpen = !linksOpen"
              >
                {{ $t("actions.sideBar.usefulLinks") }}
                <i
                  class="pi pi-chevron-down ml-4 text-xs"
                  :class="{ 'rotate-180': linksOpen }"
                ></i>
              </button>
              <ul v-if="linksOpen" class="flex flex-col space-y-1 text-base">
                <li class="h-auto font-medium ">
                  <NuxtLink class="block py-4 hover:text-primary" to="/about">
                    {{ $t("actions.sideBar.about") }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "~/shared/components/BaseIcon.vue";
import { SidebarMenuType } from "~/shared/enums/common.enum";

interface NavItem {
  name: string
  icon: string
  path: SidebarMenuType
};

const config = useRuntimeConfig();
const route = useRoute();
const isCollapse = ref(true);
const linksOpen = ref(false);
const menuActive = ref(route.path);
const contentStore = useContentStore();

const isCabinetInfoSecurity = computed(() => route.path.includes("cabinet-infosecurity"));

const menuList = computed<NavItem[]>(() => {
  if (isCabinetInfoSecurity.value) {
    return [
      {
        name: "invitations",
        icon: "flash-circle",
        path: SidebarMenuType.InfosecurityInvitations,
      },
      {
        name: "progress",
        icon: "list",
        path: SidebarMenuType.InfosecurityProgress,
      },
    ];
  }

  return [
    {
      name: "home",
      icon: "home",
      path: SidebarMenuType.Main,
    },
    {
      name: "list",
      icon: "list",
      path: SidebarMenuType.Feed,
    },
    {
      name: "awareness",
      icon: "awareness",
      path: SidebarMenuType.Awareness,
    },
    {
      name: "methodology",
      icon: "methodology",
      path: SidebarMenuType.Methodology,
    },
    ...(config.public.SiteMode !== "production"
      ? [{
          name: "all-courses",
          icon: "courses",
          path: SidebarMenuType.Courses,
        }]
      : []),
  ];
});

function handleClickLink(item: NavItem) {
  menuActive.value = item.path;

  // if we go to '/feed', need to reset contents for upload new data
  if (item.path === SidebarMenuType.Feed && route.path !== SidebarMenuType.Feed) contentStore.resetContents();
}
</script>

<style scoped lang="scss">
.sidebar {
  .bg-btn-back {
    background-color: #f5f5f5;

    &:hover {
      background-color: var(--purple-100);
    }
  }

  .menu {
    a {
      height: 70px;
      padding: 0 25px;
      background: transparent;
      border-left: 5px solid transparent;
      cursor: pointer;
      transition: all 0.3s;
      display: grid;
      grid-template-columns: 24px 1fr;
      grid-gap: 10px;

      &:hover {
        color: var(--purple-600);
      }

      &.active {
        background: linear-gradient(
          90deg,
          var(--purple-200) 0%,
          transparent 100%
        );
        border-left: 5px solid var(--purple-600);
        color: var(--purple-600);
      }
    }
  }
}
</style>
