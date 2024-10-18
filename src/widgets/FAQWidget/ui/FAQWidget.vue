<template>
  <div
    class="fixed z-10 flex items-center justify-center bg-gradient-to-r from-[#734CC9] to-[#AE89FF] text-white "
    :class="[$device.isMobileOrTablet ? 'bottom-mobileTabsHeight right-5 mb-2 aspect-square size-[54px] rounded-full drop-shadow-md' : 'bottom-0 right-10 rounded-t-md']"
  >
    <LocalizatedLink class="text-base font-medium !leading-none" :class="[$device.isMobileOrTablet ? 'p-3' : 'px-6 py-2 hover:opacity-70']" to="/faq">
      <template v-if="$device.isMobileOrTablet">
        FAQ
      </template>
      <template v-else>
        {{ t("title") }}
      </template>
    </LocalizatedLink>
  </div>
</template>

<script setup lang="ts">
import { LocalizatedLink } from "~/shared/ui";

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
