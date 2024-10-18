<template>
  <div class="mx-auto -mt-20 mb-20 flex max-w-[990px] justify-center gap-20 max-md:mt-6 max-md:flex-col max-md:gap-10">
    <div class="w-[300px] shrink-0 max-md:mx-auto">
      <div style="position: relative; padding-top: 177.78%; width: 100%">
        <iframe
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
          allowfullscreen
          frameborder="0"
          :src="videoSrc"
          style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"
        ></iframe>
      </div>
    </div>
    <div class="max-w-[500px] space-y-6 pt-10 max-md:px-4 max-md:pt-0">
      <h3>{{ $t("pages.awareness.promo.title_1") }}</h3>
      <p>{{ $t("pages.awareness.promo.note_1") }}</p>
      <h3>{{ $t("pages.awareness.promo.title_2") }}</h3>
      <p>{{ $t("pages.awareness.promo.note_2") }}</p>

      <button class="mt-6 rounded-full bg-gradient-to-r from-[#ae89ff] to-[#734cc9] bg-size-200 bg-pos-0 px-9 py-5 font-inter text-2xl leading-none text-white transition-all duration-500 hover:bg-pos-100" @click="open">
        {{ $t("actions.moreLessons") }}
        <i class="pi pi-arrow-right ml-5 text-xl font-light"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalizatedRouter } from "~/shared/composables/useLocalizatedRouter";
import { AppLangs, AuthModalType } from "~/shared/enums/common.enum";

const { localeNavigateTo } = useLocalizatedRouter();
const authStore = useAuthStore();
const { locale } = useI18n<unknown, AppLangs>();

async function open() {
  if (!authStore.isLoggedIn) {
    return (authStore.modal = AuthModalType.LOGIN);
  }
  await localeNavigateTo({ path: "/course/1" });
};

const videoSrc = computed(() => {
  switch (locale.value) {
    case AppLangs.RU:
      return "https://kinescope.io/embed/grVKF4yynF72Cem3mCxZS1";
    case AppLangs.KZ:
      return "https://kinescope.io/eT99P4kDWQGA5QbKc4FgMa";
    default:
      return "https://kinescope.io/embed/grVKF4yynF72Cem3mCxZS1";
  };
});
</script>

<style scoped>
h3 {
  @apply text-3xl font-medium font-NeueMachina bg-gradient-to-r from-[#AE89FF] to-[#734CC9] bg-clip-text text-transparent;
}
</style>
