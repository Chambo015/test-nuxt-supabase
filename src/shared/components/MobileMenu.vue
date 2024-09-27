<template>
  <div
    class="menu fixed bottom-0 left-0 z-50 grid w-full items-center justify-around bg-white shadow-2xl"
    :class="authStore.isLoggedIn ? ' grid-cols-5' : ' grid-cols-4'"
  >
    <template v-for="m in menuList" :key="m.name">
      <NuxtLink active-class="active" class="flex flex-col items-center justify-center  [&.active_span]:text-violet-600 [&.active_svg]:text-violet-600" :to="m.type">
        <BaseIcon
          class="text-gray-400"
          :class="{ 'text-violet-600': route.path === m.type }"
          :name="m.icon"
        />
        <span
          class="text-[10px]"
          :class="{ 'text-violet-600': route.path === m.type }"
        >
          {{ $t(`actions.sideBar.${m.icon}`) }}
        </span>
      </NuxtLink>
    </template>
    <NuxtLink
      v-if="authStore.isLoggedIn"
      class="flex flex-col items-center justify-center"
      :to="SidebarMenuType.Profile"
    >
      <BaseIcon
        class="text-gray-400"
        :class="{ 'text-violet-600': route.path === SidebarMenuType.Profile }"
        name="user"
      />
      <span
        class="text-[10px]"
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
    name: "Главная",
    icon: "home",
    type: SidebarMenuType.Main,
  },
  {
    name: "Лента",
    icon: "list",
    type: SidebarMenuType.Feed,
  },
  {
    name: "Awareness",
    icon: "awareness",
    type: SidebarMenuType.Awareness,
  },
  {
    name: "Методология",
    icon: "methodology",
    type: SidebarMenuType.Methodology,
  },
] as { name: string, icon: string, type: SidebarMenuType }[];
</script>

<style scoped lang="scss">
.menu {
  height: 60px;
}
</style>
