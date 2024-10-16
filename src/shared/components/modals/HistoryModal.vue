<template>
  <div class="modal z-20 flex items-center justify-center backdrop-blur-sm">
    <div class="content relative flex overflow-hidden rounded-2xl bg-white">
      <div
        class="close flex cursor-pointer items-center justify-center rounded-full"
        @click="$emit('close')"
      >
        <i class="pi pi-times"></i>
      </div>
      <div class="w-full">
        <img :alt="short.name" class="size-full object-cover" :src="short.file" />
      </div>
      <div
        class="absolute bottom-0 left-0 w-full flex-col items-start justify-between p-3 sm:relative sm:flex"
      >
        <div class="info pb-5 sm:p-8 sm:pb-2">
          <h3 class="mb-1 text-xl font-bold text-white sm:text-black">
            {{ short.name }}
          </h3>

          <p
            class="mt-5 text-base font-light text-white sm:text-gray-500"
            v-html="short.note"
          ></p>
        </div>
        <NuxtLink
          class="flex h-10 w-full items-center justify-center rounded-md border-0 bg-violet-600 text-white"
          :to="short.link"
        >
          {{ $t("actions.moreButton") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Short } from "~/shared/models/short.model";

defineProps<{
  short: Short
}>();

defineEmits(["close"]);
</script>

<style scoped lang="scss">
.modal {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.2s;
  z-index: 11;

  &:before {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
  }

  &[visible="true"] {
    opacity: 1;
    z-index: 11;
  }

  img {
    height: 100%;
  }

  .content {
    width: 825px;
    height: 660px;
    display: flex;
    position: relative;
    z-index: 1;

    .info {
      font-family: 'Inter', sans-serif;
    }
  }

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 38px;
    height: 38px;
    background: #f9fafb;
    z-index: 1;
  }
}

@media only screen and (max-width: 600px) {
  .modal {
    padding: 20px;

    .content {
      height: 70vh;
    }
  }
}
</style>
