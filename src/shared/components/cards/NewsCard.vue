<template>
  <div class="group mb-4 flex grow cursor-pointer flex-col rounded-xl bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-lg" @click="openContent">
    <div class="flex flex-wrap items-start gap-1">
      <div
        class="tag-type mr-4 rounded-md px-2 text-sm max-md:text-xs"
        :style="{
          color: data.type?.color,
          background: `#${LigthenColor(data.type?.color ?? '', 60)}`,
        }"
      >
        {{ data.type?.name }}
      </div>
      <template v-for="tag in data.tags" :key="tag.id">
        <div class="mr-4 text-sm text-blue-400 max-md:text-xs" :style="{ color: tag.color }">
          #{{ tag.name }}
        </div>
      </template>
    </div>
    <h3 class="mb-2 mt-4 cursor-pointer text-xl font-semibold leading-7 text-gray-800 group-hover:text-violet-600 max-md:text-base">
      {{ data.name }}
    </h3>
    <p class="body mb-6 line-clamp-3 text-base font-semibold text-gray-500 max-md:text-sm">
      {{ data.short_note }}
    </p>
    <div class="mt-auto grid gap-2" :class="{ 'grid-cols-[1fr_50px]': data.is_pro }">
      <div class="head mb-4 flex items-start gap-4">
        <div class="w-10">
          <Avatar v-if="!!data.created_user?.photo" class="object-cover" :image="data.created_user?.photo" shape="circle" />
          <Avatar v-else icon="pi pi-user" shape="circle" />
        </div>
        <div class="w-full">
          <p class="text-sm font-semibold text-violet-600">
            @{{ data.created_user?.login }}
          </p>
          <span class="text-sm font-normal text-gray-500">{{ dateFormatted }}</span>
        </div>
      </div>
      <div
        v-if="data.is_pro"
        class="gradient flex h-6 w-full items-center justify-center rounded-full bg-violet-600 font-NeueMachina text-sm text-white"
      >
        PRO
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LigthenColor } from "~/shared/utils/lighten-color";
import type { Content } from "~/types/content.type";
import { Parse } from "~/shared/parse";

const props = defineProps<{
  data: Content
}>();

function openContent() {
  navigateTo(`/feed/${props.data.id}`);
}
const dateFormatted = computed(() => props.data.created_at ? Parse.date(props.data.created_at) : "");
</script>

<style scoped lang="scss">
.body {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  max-height: 100px;
}

.gradient {
  background: linear-gradient(
    90deg,
    var(--purple-400) 0%,
    var(--purple-600) 100%
  );
}
</style>
