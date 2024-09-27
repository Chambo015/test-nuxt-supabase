<template>
  <div class="flex cursor-pointer flex-col gap-3 rounded-3xl border border-[#E5E7EB] bg-white px-[28px] py-[26px] font-inter transition-shadow hover:shadow-lg">
    <!-- header -->
    <div class="flex items-center justify-between text-sm text-[#6b7280]">
      <span>7 777 ₸</span> <span>Курс завершен</span>
    </div>
    <!-- body -->
    <p class="text-lg leading-tight text-[#111827]">
      Кибергигиена для начинающих
    </p>
    <div class="flex items-center">
      <div class="grow">
        <CourseProgressBar :value="100" />
      </div><span class="ml-2 text-sm text-[#5E6977]">100%</span>
    </div>
    <p class="text-sm text-[#6b7280]">
      Продолжительность: 02:56 часов
    </p>
  </div>
</template>

<script setup lang="ts">
import CourseProgressBar from "./CourseProgressBar.vue";
</script>

<style scoped>

</style>
