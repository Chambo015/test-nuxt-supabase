<template>
  <div class="flex cursor-pointer flex-col gap-3 rounded-3xl border border-[#E5E7EB] bg-white px-[28px] py-[26px] font-inter transition-shadow hover:shadow-lg">
    <!-- header -->
    <div class="flex items-center justify-between gap-2 text-sm text-[#6b7280]">
      <span>{{ isFree ? $t("message.free") : price }}</span> <span class="truncate">{{ status }}</span>
    </div>
    <!-- body -->
    <p class="text-lg leading-tight text-[#111827]">
      {{ titleCourse }}
    </p>
    <div class="h-[170px] overflow-hidden rounded-md">
      <img class="size-full object-cover" :src="posterSrc" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  titleCourse: string
  posterSrc: string
  status: string
  isFree: boolean
  price?: string
}>();
</script>

<style scoped>

</style>
