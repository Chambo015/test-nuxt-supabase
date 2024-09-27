<template>
  <div>
    <h2 class="mb-5 font-NeueMachina text-2xl font-extrabold tracking-wider text-gray-700 max-md:px-4">
      {{ $t("pages.feed.history_title") }}
    </h2>
    <template v-if="loader">
      <div class="flex overflow-hidden">
        <Skeleton
          v-for="i in 8"
          :key="i"
          class="mr-2 shrink-0"
          shape="circle"
          size="61px"
        />
      </div>
    </template>
    <VueCarousel
      v-else
      v-bind="settings"
      :breakpoints="breakpoints"
    >
      <VueSlide v-for="short in contentStore.shorts" :key="short.name">
        <div
          class="relative size-[61px] cursor-pointer overflow-hidden rounded-full border-2 border-main-purple"
          @click="historyModalOpen(short)"
        >
          <img class="size-full object-cover" :src="short.file" />
        </div>
      </VueSlide>
    </VueCarousel>
    <Teleport to="body">
      <HistoryModal
        v-if="!!currentShort"
        v-model:visible="visible"
        :short="currentShort"
        @close="visible = false"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useContentStore } from "~/shared/store/content.store";
import { ContentRepository } from "~/shared/repository/content.repository";
import type { Short } from "~/shared/models/short.model";
import HistoryModal from "~/shared/components/modals/HistoryModal.vue";

const contentStore = useContentStore();

const currentShort = ref<Short>();
const loader = ref(true);
const visible = ref(false);

ContentRepository.short().then(() => {
  loader.value = false;
});

const settings = {
  itemsToShow: 5,
  snapAlign: "start",
  transition: 500,
};
const breakpoints = {
  700: { itemsToShow: 3.5, snapAlign: "start" },
  1024: { itemsToShow: 8, snapAlign: "start" },
};

function historyModalOpen(short: Short) {
  currentShort.value = short;
  visible.value = true;
}
</script>
