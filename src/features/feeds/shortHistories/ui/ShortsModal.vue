<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { AdapterShortHistories } from "../model";
import ShortSlideItem from "./ShortSlideItem.vue";
import type { Short } from "~/types/content.type";

interface Props {
  shorts?: Short[]
  currentShort?: Short
  currentShortIdx?: number
}

const props = defineProps<Props>();
const model = defineModel({ type: Boolean });

const currentSlide = ref(props.currentShortIdx || 0);
const carouselNode = ref();
const adaptedShorts = computed(() => props.shorts ? props.shorts.map(s => new AdapterShortHistories(s).adapt()) : []);

onMounted(() => {
  document.documentElement.style.overflow = "hidden";
});

onUnmounted(() => {
  document.documentElement.style.removeProperty("overflow");
});
</script>

<template>
  <div>
    <Sidebar v-model:visible="model" :block-scroll="true" position="full">
      <template #container="{ closeCallback }">
        <div class="relative h-full bg-white">
          <VueCarousel
            ref="carouselNode"
            v-model="currentSlide"
            class="h-full"
            :mouse-drag="false"
            :touch-drag="false"
          >
            <VueSlide v-for="(short, idx) in adaptedShorts" :key="short.id" class="h-full">
              <div class="carousel__item  w-full overflow-hidden">
                <ShortSlideItem
                  :active="currentSlide === idx"
                  :file="short.file"
                  :link-url="short.link"
                  :name="short.name"
                  :note="short.note"
                  :thumbnail="short.thumbnail"
                  :type-file="short.typeFile"
                >
                  <template #navigation>
                    <div class="flex size-full justify-between">
                      <button class="h-full w-1/5 text-xl text-white/25" @click="carouselNode.prev">
                        <i v-show="idx !== 0" class="pi pi-chevron-left"></i>
                      </button>
                      <button class="h-full w-1/5 text-xl text-white/25" @click="carouselNode.next">
                        <i v-show="idx !== (adaptedShorts.length - 1)" class="pi pi-chevron-right"></i>
                      </button>
                    </div>
                  </template>
                </ShortSlideItem>
              </div>
            </VueSlide>
          </VueCarousel>

          <header class="absolute inset-x-0 top-0 flex justify-end">
            <button class="p-5 text-xl text-white" @click="() => closeCallback()">
              <i class="pi pi-times"></i>
            </button>
          </header>
        </div>
      </template>
    </Sidebar>
  </div>
</template>

<style scoped>
:global(.carousel__viewport) {
  height: 100%;
}
:global(.carousel__track) {
  height: 100%;
}
</style>
