<template>
  <div
    class="inline-flex items-center gap-2 bg-transparent font-inter"
    :class="[
      {
        'text-black': index < currentStepIdx,
        'text-primary': index === currentStepIdx,
        'text-[#737373]': index > currentStepIdx,
      },
    ]"
  >
    <span class="inline-flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-[#e2e8f0] bg-white font-medium leading-[30px]">
      {{ index + 1 }}
    </span>
    <span class="text-nowrap text-sm font-medium">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentStepIdx: number
  index: number
  label: string
}>();
</script>
