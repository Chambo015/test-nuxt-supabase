<template>
  <div class="flex h-full cursor-pointer flex-col gap-3 rounded-3xl border border-[#E5E7EB] bg-white px-[28px] py-[26px] font-inter transition-shadow hover:shadow-lg">
    <!-- header -->
    <div class="flex items-center justify-between gap-2 text-sm text-[#6b7280]">
      <span class="shrink-0">
        {{ isFree ? $t("message.free") : price }}
      </span>
      <span class="truncate">
        {{ status }}
      </span>
    </div>
    <!-- body -->
    <p class="line-clamp-2 text-lg leading-tight text-[#111827] [&>*]:inline">
      {{ titleCourse }}
    </p>
    <div class="mt-auto h-[170px] overflow-hidden rounded-md">
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
