<script setup lang="ts">
import ShortsModal from "./ShortsModal.vue";
import type { Short } from "~/types/content.type";
import HistoryModal from "~/shared/components/modals/HistoryModal.vue";

const currentShort = ref<Short>();
const currentShortIdx = ref<number>();
const visible = ref(false);

const { $module } = useNuxtApp();
const { data: shorts, status } = useLazyAsyncData("shorts", async () => $module.content.getShorts(), {
  server: false,
  default() {
    return {
      data: [],
    };
  },
});

const settings = {
  itemsToShow: 5.5,
  snapAlign: "start",
  transition: 500,
};
const breakpoints = {
  700: { itemsToShow: 4.5, snapAlign: "start" },
  1024: { itemsToShow: 8, snapAlign: "start" },
};

function historyModalOpen(short: Short, idx: number) {
  currentShort.value = short;
  visible.value = true;
  currentShortIdx.value = idx;
}
</script>

<template>
  <div>
    <h2 class="mb-5 font-NeueMachina text-2xl font-extrabold tracking-wider text-gray-700 max-md:px-4">
      {{ $t("pages.feed.history_title") }}
    </h2>
    <template v-if="status === 'idle' || status === 'pending'">
      <div class="flex overflow-hidden pl-2">
        <Skeleton
          v-for="i in 8"
          :key="i"
          class="mr-2 shrink-0"
          shape="circle"
          size="61px"
        />
      </div>
    </template>
    <template v-else>
      <VueCarousel
        v-bind="settings"
        :breakpoints="breakpoints"
      >
        <VueSlide v-for="(short, idx) in shorts?.data" :key="short.name">
          <div
            class="relative size-[61px] shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-main-purple"
            @click="historyModalOpen(short, idx)"
          >
            <img class="size-full object-cover" :src="short.file" />
          </div>
        </VueSlide>
      </VueCarousel>
    </template>
    <template v-if="!$device.isDesktop">
      <ShortsModal
        v-if="currentShort && visible"
        v-model="visible"
        :current-short="currentShort"
        :current-short-idx="currentShortIdx"
        :shorts="shorts.data"
      />
    </template>
    <template v-else>
      <Teleport v-if="visible && currentShort" to="body">
        <HistoryModal
          v-model:visible="visible"
          :short="currentShort"
          @close="visible = false"
        />
      </Teleport>
    </template>
  </div>
</template>
