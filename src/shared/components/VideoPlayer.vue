<template>
  <div>
    <div v-if="isKinescope" class="flex flex-col w-full items-center">
      <div class="inline-block w-[300px] shrink-0 max-md:mx-auto">
        <div style="position: relative; padding-top: 177.78%; width: 100%">
          <iframe
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
            allowfullscreen
            frameborder="0"
            src="https://kinescope.io/5pSWouZG9R67NsYRdQrpBD"
            style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"
          ></iframe>
        </div>
      </div>
    </div>
    <div v-else class="relative h-[410px] overflow-hidden max-md:h-auto">
      <video-player
        :src="video"
        controls
        :loop="true"
        :poster="poster"
        :volume="1"
        class="rounded-3xl h-[410px] w-full max-h-[410px] max-md:h-auto max-md:aspect-[9/16] max-md:max-h-none overflow-hidden relative !bg-white"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";

const props = defineProps<{
  video: string
  poster?: string
}>();

const isKinescope = computed(() => props.video.includes("kinescope"));
</script>

<style scoped lang="scss">
</style>
