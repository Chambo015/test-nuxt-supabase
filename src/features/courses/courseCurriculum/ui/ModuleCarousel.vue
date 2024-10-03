<template>
  <div>
    <div v-if="loading" class="flex overflow-hidden">
      <Skeleton v-for="n in 5" :key="n" class="!mr-3 !size-[145px] shrink-0 !rounded-3xl" />
    </div>
    <VueCarousel
      v-else
      id="thumbnails"
      v-model="currentModuleIdxComputed"
      :breakpoints="breakpointsThumbnails"
      :mouse-drag="true"
      v-bind="settingsThumbnails"
      snap-align="start"
      :wrap-around="false"
    >
      <VueSlide v-for="(m, idx) in data" :key="m.id">
        <div class="!mr-3 pb-2" :class="[currentModuleIdx === idx ? 'active_module' : '']">
          <button class="carousel__item relative aspect-square w-full cursor-pointer overflow-hidden rounded-3xl border-4" :class="[currentModuleIdx === idx ? 'border-[#8b5cf6]' : 'border-transparent']" @click="currentModuleIdx = idx">
            <img
              class="size-full rounded-3xl object-cover transition-transform"
              :class="[currentModuleIdx === idx ? 'scale-110' : 'scale-100']"
              :src="m.photo"
            />
            <div class="absolute inset-0 flex flex-col justify-end rounded-xl bg-gradient-to-t  pb-1" :class="[currentModuleIdx === idx ? 'from-[#744cc979]' : 'from-[#1E1C1C]']">
              <p class="truncate px-2 text-center text-sm font-semibold text-white">
                {{ m.name.split(".")[0] }}
              </p>
            </div>
          </button>
        </div>
      </VueSlide>
    </VueCarousel>
  </div>
</template>

<script setup lang="ts">
import type { Module } from "~/types/module.type";

defineProps<{
  loading: boolean
  data: Module[]
}>();
const currentModuleIdx = defineModel("currentModuleIdx");
const currentModuleIdxComputed = computed(() => currentModuleIdx.value);

const breakpointsThumbnails = {
  700: {
    itemsToShow: 3.5,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 6.5,
    snapAlign: "start",
  },
};

const settingsThumbnails = {
  itemsToShow: 2.5,
  snapAlign: "center",
  transition: 500,
};
</script>

<style scoped lang="scss">
.active_module {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -14px;
    background: black;
    left: 50%;
    width: 15px;
    height: 15px;
    transform: rotate(45deg) translateX(-50%);
    z-index: -1;
  }
}
</style>
