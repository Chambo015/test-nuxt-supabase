<template>
  <div
    class="fixed z-10 flex items-center justify-center bg-gradient-to-r from-[#734CC9] to-[#AE89FF] text-white "
    :class="[($device.isMobile || $device.isTablet) ? 'bottom-mobileTabsHeight right-5 mb-2 aspect-square size-[54px] rounded-full drop-shadow-md' : 'bottom-0 right-10 rounded-t-md']"
  >
    <NuxtLink class="text-base font-medium !leading-none" :class="[($device.isMobile || $device.isTablet) ? 'p-3' : 'px-6 py-2 hover:opacity-70']" to="/faq">
      <template v-if="$device.isMobile || $device.isTablet">
        FAQ
      </template>
      <template v-else>
        {{ t("title") }}
      </template>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n({
  useScope: "local",
  messages: {
    ru: {
      title: "Вопросы и ответы",
    },
    kz: {
      title: "Сұрақтар мен жауаптар",
    },
    en: {
      title: "FAQ",
    },
  },
});
</script>

<style scoped>

</style>
