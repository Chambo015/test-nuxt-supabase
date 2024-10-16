<template>
  <div
    class="relative isolate mx-auto grid max-w-screen-2xl  items-center "
    :class="[$device.isDesktop ? 'grid-cols-[minmax(200px,260px)_1fr_minmax(200px,260px)] max-lg:grid-cols-[minmax(200px,260px)_1fr]' : 'grid-cols-1 overflow-x-hidden']"
  >
    <div aria-hidden="true" class="pointer-events-none absolute left-1/2 top-[-180px] -translate-x-1/2 select-none max-lg:top-[-340px]">
      <Waves />
    </div>
    <div v-if="course?.data" class="relative col-span-1 col-start-2 overflow-x-hidden max-lg:px-4 max-md:col-start-1">
      <header class="flex min-h-[750px] flex-col items-start py-[140px] max-md:min-h-[450px] max-sm:py-[100px] max-[440px]:py-[60px]">
        <TopHeader>
          <p class="font-NeueMachina text-3xl text-white max-md:text-2xl">
            {{ $t("pages.awareness.course") }}
          </p>
        </TopHeader>
        <MainHeader
          bg-color="primary"
          class="flex w-full !text-[70px] !leading-[70px] max-xl:!text-[60px] max-xl:!leading-[60px] max-md:py-2 max-md:pb-4 max-md:!text-4xl max-sm:text-wrap "
        >
          {{ course.data.name }}
        </MainHeader>
        <TopHeader class="ml-auto">
          <p class="font-NeueMachina text-3xl text-white max-md:text-lg">
            {{ course.data.is_free ? "Бесплатно" : `Стоимость: ${course.data.adaptedPrice} тг` }}
          </p>
        </TopHeader>
        <div class="mt-6 max-md:w-full">
          <PayStartCourseButton :course="course.data" variant="start" />
        </div>
      </header>
      <section class="font-inter text-lg text-black max-md:text-base">
        <div v-html="course.data.note"></div>
      </section>
      <section class="mt-11 max-md:mt-7">
        <CourseListDescription :course="course.data" />
      </section>
      <CourseCurriculum :course-id="+courseId" @click-lesson="(lessonId) => startCourse({ queryCourseLink: { article: lessonId } })" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdapterCourse } from "~/entities/course";
import { CourseCurriculum } from "~/features/courses/courseCurriculum";
import { CourseListDescription } from "~/features/courses/courseDescriptionSheet";
import { PayStartCourseButton, useStartCourse } from "~/features/startCourse";
import MainHeader from "~/shared/components/headers/MainHeader.vue";
import TopHeader from "~/shared/components/headers/TopHeader.vue";
import Waves from "~/shared/components/svg/Waves.vue";

definePageMeta({
  middleware: [
    function (to) {
      if (Number.isNaN(+to.params.id)) {
        throw createError({ statusCode: 404, statusMessage: `Not Found Course with id ${to.params.id}` });
      }
    },
  ],
});

// useSeoMeta(AwarenessSeo);
const { $module } = useNuxtApp();
const { id: courseId } = useRoute().params;

const { data: course } = await useLazyAsyncData(`course-${courseId}`, async () => await $module.course.getCourseById(+courseId as number), {
  server: true,
  transform(res) {
    return {
      ...res,
      data: new AdapterCourse(res.data).adapt(),
    };
  },
});

const paymentsStore = usePaymentsStore();
const { startCourse } = useStartCourse(() => course?.value?.data || null, {
  callPayCourse(onSuccess) {
    if (!course?.value?.data) return;
    paymentsStore.showModal({ currentBuyCourse: course?.value?.data, onSuccessPay: onSuccess });
  },
});
</script>
