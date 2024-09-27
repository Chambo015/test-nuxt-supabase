<template>
  <div
    class="fixed inset-x-2 bottom-[max(env(safe-area-inset-bottom),8px)] z-50 grid h-mobileTabsHeight items-center justify-around rounded-2xl bg-white font-inter drop-shadow-2xl"
    :class="authStore.isLoggedIn ? ' grid-cols-5' : ' grid-cols-4'"
  >
    <template v-for="m in menuList" :key="m.name">
      <NuxtLink active-class="active" class="flex flex-col px-0.5 [&.active_span]:text-violet-600 [&.active_svg]:text-violet-600" :to="m.type">
        <BaseIcon
          class="mx-auto text-gray-400"
          :class="{ 'text-violet-600': route.path === m.type }"
          :name="m.icon"
        />

        <span
          class="truncate text-center text-[10px] text-gray-500"
          :class="{ 'text-violet-600': route.path === m.type }"
        >
          {{ $t(`actions.sideBar.${m.name}`) }}
        </span>
      </NuxtLink>
    </template>
    <NuxtLink
      v-if="authStore.isLoggedIn"
      class="flex flex-col px-0.5"
      :to="SidebarMenuType.Profile"
    >
      <BaseIcon
        class="mx-auto text-gray-400"
        :class="{ 'text-violet-600': route.path === SidebarMenuType.Profile }"
        name="user"
      />
      <span
        class="truncate text-center text-[10px] text-gray-500"
        :class="{ 'text-violet-600': route.path === SidebarMenuType.Profile }"
      >
        Профиль
      </span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "~/shared/components/BaseIcon.vue";
import { SidebarMenuType } from "~/shared/enums/common.enum";

const route = useRoute();

const authStore = useAuthStore();

const menuList = [
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
    name: "all-courses",
    icon: "awareness",
    type: SidebarMenuType.Awareness,
  },
  {
    name: "methodology",
    icon: "methodology",
    type: SidebarMenuType.Methodology,
  },
] as { name: string, icon: string, type: SidebarMenuType }[];
</script>
