<template>
  <div class="group mb-4 cursor-pointer rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md" @click="openContent">
    <div class="flex flex-row gap-2">
      <div v-if="content" class="mb-4 items-start gap-4 sm:flex">
        <div class="w-10">
          <Avatar
            v-if="!!content.created_user?.photo"
            :image="content.created_user?.photo"
            shape="circle"
          />
          <Avatar
            v-else
            icon="pi pi-user"
            shape="circle"
          />
        </div>
        <div class="w-full">
          <h4 class="mb-1 mt-0 line-clamp-2 font-manrope text-base font-semibold text-[#3B3551] group-hover:text-violet-600" :title="content.name">
            {{ content.name }}
          </h4>
          <p class="font-manrope text-sm font-semibold text-violet-600">
            @{{ content.created_user?.login }}<span class="font-medium text-gray-500">, {{ dateFormatted }}</span>
          </p>
        </div>
      </div>
      <div v-if="content.is_pro" class="w-[50px] shrink-0">
        <div
          class="gradient flex h-6 w-full items-center justify-center rounded-full font-NeueMachina text-sm text-white"
        >
          PRO
        </div>
      </div>
      <div v-if="content.pin_to_top" class="ml-auto flex w-[30px] shrink-0 items-start justify-end">
        <IconPin class="rotate-45 text-xl text-black/40" filled />
      </div>
    </div>
    <div class="mb-4 line-clamp-3 text-base font-semibold text-gray-500" v-html="content.short_note"></div>
    <div class="flex flex-wrap items-start gap-1">
      <div
        v-if="content.type"
        class="mr-4 rounded-md px-2.5 py-0.5 font-manrope text-sm font-semibold"
        :style="{
          color: content.type?.color,
          background: `#${LigthenColor(content.type?.color ?? '', 60)}`,
        }"
      >
        {{ content.type.name }}
      </div>
      <template v-for="tag in content.tags" :key="tag.name">
        <div class="mr-4 font-manrope text-sm font-semibold text-blue-400" :style="{ color: tag.color }">
          #{{ tag.name }}
        </div>
      </template>
    </div>
    <img :alt="content.name" class="mt-3 aspect-video max-h-72 w-full rounded-xl object-cover" loading="lazy" :src="content.poster" />
  </div>
</template>

<script setup lang="ts">
import { LigthenColor } from "~/shared/utils/lighten-color";
import type { Content } from "~/types/content.type";
import { Parse } from "~/shared/parse";
import IconPin from "~/assets/images/icons/pin.svg";

const props = defineProps<{
  content: Content
}>();

function openContent() {
  // contentStore.setCurrentContent(props.content);
  navigateTo(`/feed/${props.content.id}`);
}

const dateFormatted = computed(() => props.content.created_at ? Parse.date(props.content.created_at) : "");
</script>

<style scoped lang="scss">
.gradient {
  background: linear-gradient(
    90deg,
    var(--purple-400) 0%,
    var(--purple-600) 100%
  );
}
</style>
