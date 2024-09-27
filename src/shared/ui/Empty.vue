<template>
  <div class="flex max-w-[350px] flex-col items-center gap-4 font-inter">
    <div class="flex size-12 items-center justify-center rounded-full border-8 border-[#F9F5FF] bg-[#F4EBFF]">
      <svg
        class="shrink-0"
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m21 21-3.5-3.5m2.5-6a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"
          stroke="url(#a)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <defs>
          <linearGradient
            id="a"
            gradientUnits="userSpaceOnUse"
            x1="3"
            x2="21"
            y1="12"
            y2="12"
          >
            <stop stop-color="#AE89FF" />
            <stop offset="1" stop-color="#734CC9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div>
      <p v-if="title" class="text-center font-semibold text-[#101828]">
        {{ title }}
      </p>
      <p v-if="description" class="text-center text-sm text-[#475467]">
        {{ description }}
      </p>
    </div>
    <button v-if="actionTitle" class="mt-6 rounded-lg bg-gradient-to-r from-[#ae89ff] to-[#734cc9] bg-size-200 bg-pos-0 px-[18px] py-[10px] font-inter font-semibold text-white transition-all duration-500 hover:bg-pos-100 " @click="$emit('action')">
      {{ actionTitle || "Home" }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  actionTitle: string
}
defineProps<Props>();

defineEmits<{
  action: []
}>();
</script>

<style scoped></style>
