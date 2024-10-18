<template>
  <div class="navbar relative z-[9] flex h-navbarHeight items-center bg-white">
    <div class="w-full ">
      <div class="mx-auto flex max-w-screen-2xl items-center justify-between bg-white px-4">
        <LocalizatedLink to="/">
          <BaseIcon name="logo-title-main" width="114" />
        </LocalizatedLink>

        <template v-if="!$device.isDesktop">
          <div class="flex items-center gap-2">
            <i class="pi pi-bars mr-3 text-xl" @click="visible = true"></i>

            <Avatar
              v-if="!useAuthStore().isLoggedIn"
              class="min-w-10 cursor-pointer bg-violet-50 text-violet-600"
              icon="pi pi-user"
              shape="circle"
              @click="useAuthStore().modal = AuthModalType.LOGIN"
            />
          </div>
        </template>

        <div v-else class="flex items-center gap-2 max-md:hidden">
          <Button
            :label="$t('actions.noticeIncident')"
            rounded
            severity="warning"
            size="small"
            @click="visibleIncidentModal = true"
          />
          <template v-if="authStore.isLoggedIn">
            <Avatar
              v-if="authStore.user?.photo"
              class="size-10 cursor-pointer"
              :image="authStore.user?.photo"
              shape="circle"
              @click="toggle"
            />
            <Avatar
              v-else
              class="min-w-10 cursor-pointer"
              icon="pi pi-user"
              shape="circle"
              @click="toggle"
            />
            <Menu
              id="overlay_menu"
              ref="profileOpen"
              :model="profileMenu"
              :popup="true"
            >
              <template #item="{ item, props }">
                <LocalizatedLink
                  v-ripple
                  class="flex items-center"
                  :to="item.href"
                  v-bind="props.action"
                  @click="item?.call"
                >
                  <span :class="item.icon"></span>
                  <span class="ml-2">{{ $t(item.localeKey) }}</span>
                </LocalizatedLink>
              </template>
            </Menu>
          </template>
          <div
            v-else
            class="flex h-12 cursor-pointer items-center gap-4 rounded-xl bg-gray-50 px-5 font-semibold text-gray-800 hover:bg-gray-200"
            @click="authStore.modal = AuthModalType.LOGIN"
          >
            <div class="flex size-8 items-center justify-center rounded-full bg-white">
              <i class="pi pi-user"></i>
            </div>
            {{ $t("actions.login") }}
          </div>
          <LangSwitcher class="border-0 bg-white" />
        </div>
      </div>
    </div>
    <Sidebar
      v-model:visible="visible"
      class="modal head-none p-0"
      :show-close-icon="false"
    >
      <ul class="pt-4">
        <li class="mb-2 flex h-9 items-center pl-8 text-sm">
          <LocalizatedLink to="/about" @click="visible = false">
            {{ $t("actions.sideBar.about") }}
          </LocalizatedLink>
        </li>
        <!-- <li class="h-9 pl-8 flex items-center text-sm mb-2 border-b border-gray-200 pb-4">
          {{ $t("actions.sideBar.contactUs") }}
        </li> -->
        <li class="mb-2 flex h-8 items-center pl-8 pr-4 text-sm">
          <i class="pi pi-globe mr-1"></i>
          <LangSwitcher class="w-full border-0" />
        </li>
        <template v-if="authStore.isLoggedIn">
          <li
            v-for="(item, idx) in profileMenu"
            :key="`${item.label}_${idx}`"
            @click="visible = false"
          >
            <div v-if="item.separator" class="block h-1 w-full border-b border-gray-200"></div>
            <LocalizatedLink v-else class="flex items-center py-4 pl-8 text-sm" :to="item.href" @click="item.call">
              <span class="mr-4" :class="item.icon"></span>
              <span v-if="item.localeKey">{{ $t(item.localeKey) }}</span>
            </LocalizatedLink>
          </li>
        </template>
      </ul>
      <div class="py-3 pl-8">
        <Button
          :label="$t('actions.noticeIncident')"
          rounded
          severity="warning"
          size="small"
          @click="visibleIncidentModal = true"
        />
      </div>
    </Sidebar>
    <IncidentModal v-if="visibleIncidentModal" v-model="visibleIncidentModal" />
  </div>
</template>

<script setup lang="ts">
import IncidentModal from "../modals/IncidentModal.vue";
import BaseIcon from "../BaseIcon.vue";
import { useAuthStore } from "~/shared/store/auth.store";
import { AppRoutes, AuthModalType } from "~/shared/enums";
import { LangSwitcher } from "~/features/langSwitcher";
import { LocalizatedLink } from "~/shared/ui";
import { useLocalizatedRouter } from "~/shared/composables/useLocalizatedRouter";

const { localeRouter } = useLocalizatedRouter();
const authStore = useAuthStore();
const visible = ref(false);
const visibleIncidentModal = ref(false);

const profileOpen = ref();
const profileMenu = computed(() => {
  return [
    {
      label: "Профиль",
      localeKey: "actions.profile",
      icon: "pi pi-user",
      href: AppRoutes.Profile,
    },
    {
      label: "My courses",
      localeKey: "actions.sideBar.my-courses",
      icon: "pi pi-folder",
      href: AppRoutes.MyCourses,
    },
    {
      label: "Выход",
      localeKey: "actions.logout",
      icon: "pi pi-sign-out",
      async call() {
        await logout();
      },
    },
    ...(authStore.user?.is_ib
      ? [{
          separator: true,
        }, {
          label: "cabinet-infosecurity",
          localeKey: "actions.sideBar.cabinet-infosecurity",
          icon: "pi pi-shield",
          href: AppRoutes.InfosecurityProgress,
        }]
      : []),
  ];
});

function toggle(event: any) {
  profileOpen.value.toggle(event);
}

async function logout() {
  await authStore.logout();
  localeRouter.replace("/");
}
</script>

<style scoped lang="scss">
.navbar {
  height: 68px;
  border-bottom: 1px solid #f5f5f5;
  background: white;
  z-index: 9;

  .logo {
    height: 17px;
  }
}
</style>
