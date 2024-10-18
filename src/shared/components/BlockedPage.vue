<template>
  <div class="fixed inset-x-0 bottom-0 top-navbarHeight z-[1] bg-gradient-to-t from-white">
    <div class="absolute bottom-12 left-1/2 w-[min(95%,800px)] -translate-x-1/2 bg-[#734CC9] px-6 py-8 font-inter max-md:bottom-mobileTabsHeight max-md:px-3 max-md:py-4">
      <p class="text-center text-3xl font-semibold text-white max-md:text-xl">
        {{ title ? title : $t("pages.methodology.accessDenied") }}
      </p>
      <div class="mt-4 flex items-center justify-center gap-4">
        <Button
          :label="$t('actions.login')"
          @click="handleAuth(AuthModalType.LOGIN)"
        />
        <span class="text-lg font-medium text-white">или</span>
        <Button
          :label="$t('actions.regis')"
          @click="handleAuth(AuthModalType.REGIS)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalizatedRouter } from "../composables/useLocalizatedRouter";
import { AuthModalType } from "~/shared/enums/common.enum";
import { lockScroll, unlockScroll } from "~/shared/utils/lock-scroll";

const props = defineProps<{
  title?: string
  redirect?: string
}>();

const authStore = useAuthStore();
const { localeRouter } = useLocalizatedRouter();
const route = useRoute();

function handleAuth(modal: AuthModalType) {
  localeRouter.push(props.redirect || route.matched[0]);
  authStore.modal = modal;
}

onMounted(() => {
  lockScroll();
});
onUnmounted(() => {
  unlockScroll();
});
</script>

<style scoped></style>
