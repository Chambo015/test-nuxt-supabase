<template>
  <div
    class="flex cursor-pointer flex-col items-start gap-3 rounded-3xl border border-[#E5E7EB] bg-white px-7 py-6 transition-all hover:shadow-lg"
    @click="handleClickCourse(course)"
  >
    <img
      :alt="course.name"
      class="aspect-video w-full rounded-xl object-cover"
      height="181"
      :src="course.poster"
      width="322"
    />
    <div class="flex flex-row items-center justify-between self-stretch">
      <Chip
        :label="course.is_purchased ? 'Приобретен' : course.is_free ? 'Бесплатный курс' : `${course.adaptedPrice} тг`"
        :pt="{
          root: ['!px-2.5 !text-sm', course.price === 0 ? '!text-[#90D272] !bg-[#90D272]/10' : '!text-[#EB6A6A] !bg-[#EB6A6A]/10'],
          label: '!my-0',
        }"
      />
      <slot name="action-right"></slot>
    </div>
    <p class="text-lg font-medium leading-tight text-black">
      {{ course.name }}
    </p>
    <div class="line-clamp-3 max-w-full leading-tight !text-[#606060]">
      <div class="text-[#606060] [&_*]:inline [&_*]:after:whitespace-pre [&_*]:after:content-['_\A\A']" v-html="course.note"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdapterCourseReturnType } from "~/entities/course";
import type { Course } from "~/types/course.type";

defineProps<{
  course: AdapterCourseReturnType
}>();

async function handleClickCourse(course: Course) {
  if (course.id === 1) {
    navigateTo("/awareness");
  } else {
    navigateTo(`/courses/${course.id}`);
  }
}
</script>

<style scoped>

</style>
