<template>
  <div class="progamma local-container py-20">
    <div class="head">
      <p class="font-bold">
        {{ $t("pages.awareness.progamma.title") }}
      </p>
      <span class="text-gray-500">
        {{ $t("pages.awareness.progamma.note") }}
      </span>
    </div>
    <div v-if="pending" class="flex overflow-hidden">
      <Skeleton v-for="n in 5" :key="n" class="!mr-3 !size-[145px] shrink-0 !rounded-3xl" />
    </div>
    <VueCarousel
      v-else
      id="thumbnails"
      v-model="currentModuleIdxComputed"
      :breakpoints="breakpointsThumbnails"
      :mouse-drag="true"
      :wrap-around="false"
      v-bind="settingsThumbnails"
    >
      <VueSlide v-for="(m, idx) in data?.data" :key="idx">
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
    <div class="module-bg relative rounded-3xl">
      <VueCarousel
        id="gallery"
        v-model="currentModuleIdx"
        :items-to-show="1"
        :mouse-drag="false"
        :touch-drag="false"
        :wrap-around="false"
      >
        <VueSlide v-for="m in data?.data" :key="m.id">
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
              <SlideSkeleton class="mt-12 max-md:mt-7" />
            </template>
            <template v-else>
              <div v-if="lessons?.data.length" class="relative w-full pt-12 max-md:pt-7">
                <VueCarousel
                  ref="carousel"
                  v-bind="settings"
                  :breakpoints="breakpoints"
                  class="items-start"
                  snap-align="start"
                >
                  <VueSlide v-for="slide in lessons.data" :key="slide.id">
                    <div class="module-card">
                      <div class="video relative overflow-hidden rounded-2xl" @click="open(slide)">
                        <img class="size-full object-cover" :src="slide.photo" />
                        <img
                          class="play absolute size-12"
                          src="@/assets/images/icons/play.png"
                        />
                      </div>
                      <p class="mt-2 text-left text-white">
                        <span class="text-base font-bold">{{ slide.name }}</span>
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
              :src="openLesson?.link"
              style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"
            ></iframe>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import SlideSkeleton from "./SlideSkeleton.vue";
import { AuthModalType } from "~/shared/enums/common.enum";
import type { Lesson } from "~/shared/models/lesson.model";
import { useAuthStore } from "~/shared/store/auth.store";
import type { OpenLesson } from "~/types/lesson.type";

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

const settings = {
  itemsToShow: 2.1,
  snapAlign: "start",
  transition: 500,
};

const breakpoints = {
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

const courseStore = useCourseStore();
const authStore = useAuthStore();

const currentModuleIdx = ref<number>(0);
const currentModuleIdxComputed = computed<number>(() => currentModuleIdx.value);
const carousel = ref<{ prev: () => void, next: () => void }[]>();
const visibleModalVideoLesson = ref(false);
const openLesson = ref<OpenLesson>();

const { data, pending } = await $module.course.getModules({ asyncDataOptions: { server: false } });
const { data: lessons, pending: pendingLesson } = await $module.course.getLessonsByModuleId(() => data.value?.data[currentModuleIdx.value].id, { asyncDataOptions:
  {
    watch: [currentModuleIdx, data],
    immediate: false,
    server: false,
    transform: data => ({ data: data.data.sort((a, b) => (+a.name.split(".")[0] > +b.name.split(".")[0] ? 1 : -1)) }), // sort by name "12. урок такой то"
  },
});
const { data: openLessonsList, execute: fetchOpenLessons } = await $module.course.getOpenLesson({ asyncDataOptions: { immediate: false, server: false } });

function next() {
  carousel.value?.[currentModuleIdx.value].next();
}

function prev() {
  carousel.value?.[currentModuleIdx.value].prev();
}

async function open(lesson: Lesson) {
  if (!authStore.isLoggedIn) {
    await fetchOpenLessons();
    let findOpenLesson: OpenLesson | undefined;
    if (openLessonsList.value?.data && openLessonsList.value?.data.length) {
      findOpenLesson = openLessonsList.value?.data.find(v => v.lesson_id === lesson.id);
    }
    if (findOpenLesson) {
      openLesson.value = findOpenLesson;
      visibleModalVideoLesson.value = true;
      return;
    } else {
      visibleModalVideoLesson.value = false;
      return (authStore.modal = AuthModalType.LOGIN);
    }
  }

  courseStore.setCurrentLesson(lesson);
  navigateTo(`course/${lesson.course_id}?article=${lesson.id}`);
}
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
    padding-left: 15px;
    padding-right: 15px;

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
