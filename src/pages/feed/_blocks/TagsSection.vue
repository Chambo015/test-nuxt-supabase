<template>
  <div>
    <div v-if="isLoading" class="mb-4 flex w-full gap-2">
      <Skeleton class="mb-2" height="1rem" width="2rem" />
      <Skeleton class="mb-2" height="1rem" width="2rem" />
      <Skeleton class="mb-2" height="1rem" width="2rem" />
    </div>
    <div v-else class="group mb-4 grid grid-rows-[0fr] py-2 transition-all delay-[250ms] duration-500 hover:grid-rows-[1fr] max-md:grid-rows-1">
      <ul class="relative flex flex-wrap items-center overflow-hidden from-main-bg pb-[28px] transition-all delay-200 duration-500 *:text-nowrap after:absolute after:inset-y-0 after:right-0 after:w-16 after:bg-gradient-to-l hover:after:hidden group-hover:pb-0 group-hover:delay-300 max-md:flex-wrap  max-md:gap-1 max-md:px-4 max-md:pb-0 max-md:after:hidden">
        <li
          class="flex shrink-0 cursor-pointer items-center rounded-md px-2 py-0.5 font-manrope text-base font-semibold text-gray-400 max-md:text-sm"
          :class="[!$route.query.tag_id && 'bg-black/5']"
          style="min-height: 0px;"
          @click="$emit('handleTag', { id: 'All' })"
        >
          <i class="square mr-2 size-3 shrink-0 rounded bg-violet-600 font-medium tracking-widest"></i>{{ $t('actions.all') }}
        </li>
        <li
          v-for="t in tagsSorted"
          :key="t.id"
          class="flex shrink-0 cursor-pointer items-center rounded-md px-2 py-0.5 font-manrope text-base  font-semibold text-gray-400 max-md:text-sm"
          :class="[t.id === +($route.query.tag_id as string) && 'bg-black/5']"
          @click="$emit('handleTag', { id: t.id })"
        >
          <i class="square mr-2 size-3 shrink-0 rounded font-medium tracking-widest" :style="{ background: t.color }"></i>
          {{ t.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentType } from "~/types/content.type";

const props = withDefaults(defineProps<{ tags?: ContentType[], isLoading: boolean }>(), {
  tags: () => [],
});
defineEmits<{
  (e: "handleTag", value: { id: "All" | number }): void
}>();

const route = useRoute();
const tagsSorted = computed(() => route.query.tag_id ? [...props.tags].sort(a => a.id === +(route.query.tag_id as string) ? -1 : 1) : props.tags);
</script>
