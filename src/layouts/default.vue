<template>
  <div>
    <NuxtLoadingIndicator :height="5" />
    <NavBar />
    <div class="relative">
      <NavigationSidebar v-show="$device.isDesktop" />
      <BottomTabNavigation v-if="!$device.isDesktop" />
      <div class="relative min-h-[450px]">
        <slot></slot>
      </div>
      <AppFooter />
    </div>
    <ModalBuyCourseSteps :key="paymentsStore?.currentBuyCourse?.id || 0" />
    <AuthModal />
    <Teleport to="body">
      <Toast />
    </Teleport>
    <FAQWidget />
    <Transition
      enter-active-class=""
      enter-from-class=""
      leave-active-class="transition-all duration-500"
      leave-to-class=" opacity-0"
    >
      <div v-if="loading" class="fixed inset-0 z-[8] bg-main-bg">
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import NavBar from "~/shared/components/layouts/NavBar.vue";
import AuthModal from "~/shared/components/modals/Auth/AuthModal.vue";
import AppFooter from "~/shared/components/layouts/AppFooter/AppFooter.vue";
import { ModalBuyCourseSteps } from "~/features/finance";
import { NavigationSidebar } from "~/widgets/navigationSidebar";
import { BottomTabNavigation } from "~/widgets/bottomTabNavigation";
import { FAQWidget } from "~/widgets/FAQWidget";
import { useReferralToken } from "~/shared/composables/useReferralToken";

useSeoMeta({
  ogTitle: "CitizenSec - Портал от экспертов информационной безопасности",
  ogDescription: "Цель CitizenSec - достижение полной кибергигиены в обществе через создание социального института, обеспечивающее сбор, обработку и распространение информации в массовом масштабе.",
  ogImage: "https://citizensec.kz/og.jpeg",
  twitterCard: "summary_large_image",
  ogSiteName: "Citizensec",
  ogType: "website",
});

const authStore = useAuthStore();
const paymentsStore = usePaymentsStore();
const { setLocale } = useI18n({ useScope: "global" });
const { saveReferralToken } = useReferralToken();

setLocale(authStore.localLang.code);

onMounted(() => {
  if (authStore.isLoggedIn) {
    authStore.fetchUser();
  }
  // Save refToken
  if (!authStore.isLoggedIn) {
    saveReferralToken();
  }
});

const nuxtApp = useNuxtApp();
const loading = ref(true);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>
