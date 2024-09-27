<template>
  <div class="absolute inset-0 max-md:hidden ">
    <div class="relative mx-auto h-full max-w-screen-2xl">
      <div class="sidebar z-50 h-full" :class="{ mini: activeOpen }">
        <div class="sticky left-0 top-[30px]">
          <Button
            aria-label="Submit"
            class="bg-btn-back cursor-pointer border-0"
            :icon="`pi ${activeOpen ? 'pi-bars' : 'pi-arrow-left'}`"
            icon-class="text-black"
            @click="activeOpen = !activeOpen"
          />
          <ul class="menu bg-gradient-to-r from-main-bg">
            <li v-for="menu in menuList" :key="menu.name">
              <NuxtLink
                v-tooltip.right="{
                  value: $t(`actions.sideBar.${menu.name}`),
                  disabled: !activeOpen,
                  pt: {
                    text: '!bg-transparent font-medium !text-main-purple !p-0',
                    root: '!bg-transparent !shadow-none !p-0 !-ml-4',
                    arrow: '!hidden',
                  },
                }"
                active-class="active"
                class="flex items-center text-nowrap text-base"
                :to="menu.type"
                @click="menuActive = menu.type"
              >
                <BaseIcon class="mb-1 mr-2" :name="menu.icon" />
                <template
                  v-if="!activeOpen"
                >
                  {{ $t(`actions.sideBar.${menu.name}`) }}
                </template>
              </NuxtLink>
            </li>
          </ul>

          <div v-if="!activeOpen" class="links bg-gradient-to-r from-main-bg">
            <button
              class="flex items-center justify-between whitespace-nowrap text-left text-sm font-medium"
              @click="linksOpen = !linksOpen"
            >
              {{ $t("actions.sideBar.usefulLinks") }}
              <i
                class="pi pi-chevron-down ml-4 text-xs"
                :class="{ 'rotate-180': linksOpen }"
              ></i>
            </button>
            <ul v-if="linksOpen" class="text-base">
              <li class="font-medium">
                <NuxtLink to="/about">
                  {{ $t("actions.sideBar.about") }}
                </NuxtLink>
              </li>
              <!-- <li class="font-medium">
                <nuxt-link>{{ $t("actions.sideBar.contactUs") }}</nuxt-link>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "~/shared/components/BaseIcon.vue";
import { SidebarMenuType } from "~/shared/enums/common.enum";

const config = useRuntimeConfig();
const route = useRoute();
const activeOpen = ref(true);
const linksOpen = ref(false);
const menuActive = ref(route.path);

const menuList = computed<{ name: string, icon: string, type: SidebarMenuType }[]>(() => [
  {
    name: "home",
    icon: "home",
    type: SidebarMenuType.Main,
  },
  {
    name: "list",
    icon: "list",
    type: SidebarMenuType.Feed,
  },
  {
    name: "awareness",
    icon: "awareness",
    type: SidebarMenuType.Awareness,
  },
  {
    name: "methodology",
    icon: "methodology",
    type: SidebarMenuType.Methodology,
  },
  ...(config.public.SiteMode !== "production"
    ? [{
        name: "all-courses",
        icon: "courses",
        type: SidebarMenuType.AllCourses,
      }]
    : []),
]);
</script>

<style scoped lang="scss">
.sidebar {
  padding: 30px 0;
  width: 260px;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;

  &.mini {
    width: 90px;

    .bg-btn-back {
      margin-left: 18px;
    }
  }

  .bg-btn-back {
    background-color: #f5f5f5;
    margin-left: 30px;
    margin-bottom: 30px;
    transition: all 0.3s;

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

  .links {
    padding: 30px 0 0 30px;
    color: #6f7f95;

    ul li {
      margin-top: 25px;
    }

    .rotate-180 {
      transform: rotate(180deg);
    }
  }
}
</style>
