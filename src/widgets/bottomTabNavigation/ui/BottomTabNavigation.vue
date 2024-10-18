<template>
  <div
    class="fixed inset-x-2 bottom-[max(env(safe-area-inset-bottom),8px)] z-50 grid h-mobileTabsHeight items-center justify-around rounded-2xl bg-white font-inter drop-shadow-2xl"
    :class="authStore.isLoggedIn ? ' grid-cols-5' : ' grid-cols-4'"
  >
    <template v-for="m in menuList" :key="m.name">
      <LocalizatedLink active-class="active" class="flex flex-col px-0.5 [&.active_span]:text-violet-600 [&.active_svg]:text-violet-600" :to="m.type">
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
      </LocalizatedLink>
    </template>
    <LocalizatedLink
      v-if="authStore.isLoggedIn"
      class="flex flex-col px-0.5"
      :to="AppRoutes.Profile"
    >
      <!-- TODO: Change active router like group-[.active] -->
      <BaseIcon
        class="mx-auto text-gray-400"
        :class="{ 'text-violet-600': route.path === AppRoutes.Profile }"
        name="user"
      />
      <span
        class="truncate text-center text-[10px] text-gray-500"
        :class="{ 'text-violet-600': route.path === AppRoutes.Profile }"
      >
        Профиль
      </span>
    </LocalizatedLink>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "~/shared/components/BaseIcon.vue";
import { AppRoutes } from "~/shared/enums";
import { LocalizatedLink } from "~/shared/ui";

const route = useRoute();

const authStore = useAuthStore();

const menuList = [
  {
    name: "home",
    icon: "home",
    type: AppRoutes.Main,
  },
  {
    name: "list",
    icon: "list",
    type: AppRoutes.Feed,
  },
  {
    name: "all-courses",
    icon: "awareness",
    type: AppRoutes.Courses,
  },
  {
    name: "methodology",
    icon: "methodology",
    type: AppRoutes.Methodology,
  },
] as { name: string, icon: string, type: AppRoutes }[];
</script>
