<template>
  <div class="rounded-full border-4 border-[#e5e7eb] bg-[#e5e7eb]">
    <div class="h-1 w-0 rounded-full" :class="[value === 100 ? 'bg-[#10b981]' : 'bg-[#734CC9]']" :style="{ width: `${value}%` }"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number
}>();
</script>

<style scoped></style>
