<template>
  <div class="border-4 border-[#e5e7eb] bg-[#e5e7eb] rounded-full">
    <div :class="['w-0 h-1 rounded-full', value === 100 ? 'bg-[#10b981]' : 'bg-[#734CC9]']" :style="{width: `${value}%`}"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number;
}>();
</script>

<style scoped></style>
