<template>
  <Dialog
    v-model:visible="model"
    class="mx-3 bg-white"
    closable
    dismissable-mask
    modal
    :pt="{
      header: '!justify-end',
      root: 'w-[min(95vw,440px)]',
    }"
  >
    <div class="flex flex-col items-center font-inter">
      <img
        height="181"
        src="/images/courses/security.png"
        width="180"
      />
      <div class="py-6">
        <p class="text-center text-lg font-semibold text-[#101828]">
          {{ $t("pages.course.certificate.title") }}
        </p>
        <p class="text-sm text-[#475467]">
          {{ $t("pages.course.certificate.note") }}
        </p>
      </div>
      <BlockGetCertificate />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import BlockGetCertificate from "./BlockGetCertificate.vue";

const model = defineModel<boolean>();
</script>

<style scoped>

</style>
