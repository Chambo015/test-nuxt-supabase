<script setup lang="ts">
import { LocalizatedLink } from "~/shared/ui";
import { ShortType } from "~/types/content.type";

interface Props {
  name: string
  note: string
  thumbnail: string
  file: string
  linkUrl: string
  typeFile: ShortType
  active: boolean
}
const props = defineProps<Props>();
const videoEl = ref<HTMLMediaElement | null>(null);

watch(() => props.active, (isActive) => {
  if (isActive && videoEl.value) {
    videoEl.value.play();
  } else if (videoEl.value) {
    videoEl.value?.pause();
  }
});

const isCollapse = ref(false);

onMounted(() => {
  if (videoEl.value) {
    videoEl.value.volume = 0.5;
  }
});
</script>

<template>
  <div class="relative size-full font-inter" @click="isCollapse = false">
    <div class="absolute inset-0 isolate size-full">
      <NuxtImg
        class="pointer-events-none size-full select-none object-cover object-center"
        format="webp"
        height="100"
        quality="20"
        :src="thumbnail"
        width="50"
      />
      <div class="absolute inset-0 bg-black/30 backdrop-blur-md"></div>
    </div>
    <div class="relative size-full">
      <NuxtImg
        v-if="typeFile === ShortType.IMAGE"
        class="pointer-events-none size-full select-none object-contain object-center"
        fit="contain"
        format="webp"
        :placeholder="[50, 25, 60, 15]"
        :src="file"
      />
      <video
        ref="videoEl"
        autoplay
        class="size-full"
        loop
        playsinline
        muted
      >
        <source :src="file" type="video/mp4" />
        <source :src="file" type="video/mov" />
        Ваш браузер не поддерживает встроенные видео
      </video>
    </div>

    <!-- Content -->
    <div class="absolute inset-0 z-10 overflow-hidden ">
      <div class="flex size-full flex-col items-start justify-end overflow-hidden px-4 pb-5 transition-colors" :class="[isCollapse ? 'bg-black/25' : 'bg-black/0']">
        <div class="absolute inset-0 z-[5]">
          <slot name="navigation"></slot>
        </div>
        <div class="relative z-10 mt-auto flex max-h-[50%] flex-col self-stretch overflow-hidden">
          <div class="mb-5 mt-auto min-w-[50%] shrink-0 text-left">
            <LocalizatedLink external target="_blank" :to="linkUrl">
              <Button :pt="{ root: 'min-w-[40%]' }" size="small">
                Подробнее
              </Button>
            </LocalizatedLink>
          </div>
          <div class="grow overflow-y-auto" @click.stop="isCollapse = true">
            <p class="text-left font-medium text-white">
              {{ name }}
            </p>
            <p class="mt-3 text-left text-sm text-white *:!bg-transparent" :class="[isCollapse ? '' : 'line-clamp-1']" style="background-color: transparent;" v-html="note">
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
