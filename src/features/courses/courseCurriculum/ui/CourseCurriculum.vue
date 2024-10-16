<template>
  <div class="progamma py-20 max-md:py-10">
    <ClientOnly>
      <div class="head">
        <p class="font-bold">
          {{ $t("pages.awareness.progamma.title") }}
        </p>
        <span class="text-gray-500">
          {{ $t("pages.awareness.progamma.note") }}
        </span>
      </div>
      <ModuleCarousel
        v-model:current-module-idx="currentModuleIdx"
        :data="modules?.data || []"
        :loading="pending"
      />
      <div class="module-bg relative rounded-3xl">
        <VueCarousel
          id="gallery"
          v-model="currentModuleIdxComputed"
          :items-to-show="1"
          :mouse-drag="false"
          :touch-drag="false"
          :wrap-around="false"
        >
          <VueSlide v-for="m in modules?.data" :key="m.id">
            <div class="carousel__item w-full p-16 text-left max-md:px-4 max-md:py-6">
              <header class="grid w-full grid-cols-[70px_1fr_130px] items-start gap-x-3 max-md:grid-cols-1">
                <div class="inline-flex items-center justify-start">
                  <div class="relative ">
                    <img class="size-[70px] rounded-full object-cover" :src="m.photo" />
                    <svg class="circle_wrap" fill="none" viewBox="0 0 72 70" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M37.4 1C14.0667 1 1 12.6074 1 32.6712C1 52.7351 10.3333 69 33.6667 69C57 69 71 57.8583 71 37.7945C71 17.7307 60.7333 1 37.4 1Z"
                        stroke="#dcff98"
                        stroke-dasharray="5 10.45"
                        stroke-linecap="round"
                        stroke-width="3"
                      />
                    </svg>
                  </div>
                </div>
                <div class="mt-3 sm:ml-3 sm:mt-0">
                  <p class="font-NeueMachina text-2xl text-white max-md:text-xl">
                    {{ m.name }}
                  </p>
                </div>
                <div v-if="$device.isDesktop" class="flex justify-end">
                  <Button
                    class="!size-14 shrink-0 rounded-full border-0 !bg-[#dcff98] text-2xl hover:bg-lime-400"
                    icon="pi pi-angle-left"
                    icon-class="text-gray-700 text-4xl"
                    rounded
                    @click="prev"
                  />
                  <Button
                    class="ml-2 !size-14 shrink-0 rounded-full border-0 !bg-[#dcff98] text-2xl hover:bg-lime-400"
                    icon="pi pi-angle-right"
                    icon-class="text-gray-600 text-4xl"
                    rounded
                    @click="next"
                  />
                </div>
              </header>
              <template v-if="pending || pendingLesson || !lessons?.data">
                <SkeletonModulesSlide class="mt-12 max-md:mt-7" />
              </template>
              <template v-else>
                <div v-if="lessons?.data.length" class="relative w-full pt-12 max-md:pt-7">
                  <VueCarousel
                    ref="carousel"
                    v-bind="settingsLessonCarousel"
                    :breakpoints="breakpointsLessonCarousel"
                    class="items-start"
                    snap-align="start"
                  >
                    <VueSlide v-for="slide in lessons.data" :key="slide.id">
                      <div class="module-card">
                        <div class="video relative overflow-hidden rounded-2xl" @click="handleClickLesson(slide)">
                          <img class="size-full object-cover" :src="slide.photo" />
                          <img
                            class="play absolute size-12"
                            src="@/assets/images/icons/play.png"
                          />
                        </div>
                        <p class="mt-2 text-left text-white">
                          <span class="line-clamp-3 text-base font-bold">{{ slide.name }}</span>
                        </p>
                      </div>
                    </VueSlide>
                  </VueCarousel>
                </div>
              </template>
            </div>
          </VueSlide>
        </VueCarousel>
      </div>
      <Dialog
        v-model:visible="visibleModalVideoLesson"
        dismissable-mask
        header=" "
        mask
        modal
        :style="{ width: 'min(400px,90%)' }"
      >
        <div class="flex w-full flex-col items-center">
          <div class="inline-block w-full shrink-0 max-md:mx-auto">
            <div style="position: relative; padding-top: 177.78%; width: 100%">
              <iframe
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
                allowfullscreen
                frameborder="0"
                :src="currentPublicLesson?.link"
                style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"
              ></iframe>
            </div>
          </div>
        </div>
      </Dialog>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { usePublicLesson } from "../model/";
import ModuleCarousel from "./ModuleCarousel.vue";
import SkeletonModulesSlide from "./SkeletonModulesSlide.vue";
import "vue3-carousel/dist/carousel.css";

const props = defineProps<{
  courseId: number
}>();
const emits = defineEmits<{
  clickLesson: [articleId: string | number]
}>();

const settingsLessonCarousel = {
  itemsToShow: 2.1,
  snapAlign: "start",
  transition: 500,
};

const breakpointsLessonCarousel = {
  700: {
    itemsToShow: 3.5,
    snapAlign: "start",
  },
  1024: {
    itemsToShow: 4.5,
    snapAlign: "start",
  },
};

const { $module } = useNuxtApp();

const currentModuleIdx = ref<number>(0);
const currentModuleIdxComputed = computed(() => currentModuleIdx.value);
const carousel = ref<{ prev: () => void, next: () => void }[]>();

const { data: modules, pending } = useLazyAsyncData(`module-course-${props.courseId}`, async () => await $module.course.getModulesByCourseId(props.courseId), { server: false });

const { data: lessons, pending: pendingLesson, execute: fetchLesson } = useLazyAsyncData(
  `lessons-${modules.value?.data[currentModuleIdx.value]?.id}`,
  async () => await $module.course.getLessonsByModuleId(() => modules.value?.data[currentModuleIdx.value]?.id),
  {
    immediate: false,
    server: false,
    transform: data => ({
      data: data.data.sort((a, b) => (+a.name.split(".")[0] > +b.name.split(".")[0] ? 1 : -1)),
    }),
  },
);
watch([modules, currentModuleIdx], ([newModules]) => {
  if (!newModules?.data?.length) return;
  fetchLesson();
});

function next() {
  carousel.value?.[currentModuleIdx.value].next();
}

function prev() {
  carousel.value?.[currentModuleIdx.value].prev();
}

const { handleClickLesson, visibleModalVideoLesson, currentPublicLesson } = await usePublicLesson({
  onNotFoundPublicLesson(lesson) {
    emits("clickLesson", lesson.id);
  },
});
</script>

<style scoped lang="scss">
.progamma {
  > .head {
    margin-bottom: 30px;

    p {
      font-size: 40px;
      background: linear-gradient(
        90deg,
        var(--purple-400) 0%,
        var(--purple-800) 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .modules-list {
    .module-item {
      border: 4px solid white;
      position: relative;

      &.active {
        border-color: var(--purple-500);
        &::after {
          content: '';
          position: absolute;
          bottom: -18px;
          background: black;
          left: 50%;
          width: 15px;
          height: 15px;
          transform: rotate(45deg) translateX(-50%);
          z-index: -1;
        }
      }
    }
  }

  .module-bg {
    background-image: url('assets/images/main-training-program.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .module-current {
    .head {
      display: grid;
      grid-template-columns: 70px 1fr 130px;
      grid-gap: 10px;

      img {
        width: 70px;
        height: 70px;
        // border: 2px solid #dcff98;
      }

      p {
        font-family: 'Neue Machina', sans-serif;
        font-size: 24px;
      }
    }
    .btn {
      background: #dcff98;
    }
  }

  .module-card {
    width: 100%;
    cursor: pointer;
    margin-right: 10px;

    &:hover .video {
      border-color: var(--purple-600);
    }

    .video {
      width: 100%;
      height: 280px;
      transition: all 0.3s;
      border: 2px solid transparent;

      .play {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .progamma {
    .head {
      p {
        font-size: 24px;
      }
    }

    .module-current {
      padding: 24px 16px;

      .head {
        display: block;
      }
    }
  }
}

:global(.carousel__viewport) {
  height: 100%;
}

.circle_wrap {
  position: absolute;
  left: calc(50% - 80px / 2);
  top: calc(50% - 80px / 2);
  width: 80px;
  height: 80px;
  animation: rotation 60s linear 0s infinite normal none running;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
