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
  </div>
</template>

<script setup lang="ts">
import NavBar from "~/shared/components/layouts/NavBar.vue";
import AuthModal from "~/shared/components/modals/Auth/AuthModal.vue";
import AppFooter from "~/shared/components/layouts/AppFooter/AppFooter.vue";
import FAQWidget from "~/shared/components/layouts/FAQWidget.vue";
import { ModalBuyCourseSteps } from "~/features/finance";
import { NavigationSidebar } from "~/widgets/navigation-sidebar";
import { BottomTabNavigation } from "~/widgets/bottom-tab-navigation";

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

setLocale(authStore.localLang.code);

onMounted(() => {
  if (authStore.isLoggedIn) {
    authStore.fetchUser();
  }
});
</script>
