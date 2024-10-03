<template>
  <div v-if="listDescription.length > 0">
    <h3
      class="flex h-[70px] w-min items-center whitespace-nowrap bg-violet-600 px-6 font-NeueMachina text-[40px] leading-none text-white max-md:h-auto max-md:w-full max-md:p-4 max-md:text-2xl"
    >
      {{ "Что дает курс?" }}
    </h3>
    <ClientOnly>
      <ul class="mt-12 flex flex-wrap justify-between gap-4 max-md:mt-6">
        <li
          v-for="(item, idx) in listDescription"
          :key="item.title + idx.toString()"
          class="w-[230px] shrink-0 grow font-sfProDisplay"
        >
          <p class="font-bold text-[#10083F]">
            {{ item.title }}
          </p>
          <p class="mt-3 !bg-transparent text-[#10083F]" v-html="item.note"></p>
        </li>
      </ul>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Course } from "~/types/course.type";

const props = defineProps<{
  course: Course
}>();

const listDescription = computed(() => {
  const points = Array.from({ length: 4 });
  return points.map((v, idx) => {
    return {
      title: props.course[`name_${idx + 1}` as keyof Course] || null,
      note: props.course[`note_${idx + 1}` as keyof Course] || null,
    };
  }).filter(items => !!items.title || !!items.note);
});
</script>
