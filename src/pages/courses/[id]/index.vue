<template>
  <div class="relative isolate mx-auto grid max-w-screen-2xl grid-cols-[minmax(200px,260px)_1fr_minmax(200px,260px)] items-center max-lg:grid-cols-[minmax(200px,260px)_1fr] max-md:grid-cols-1">
    <div aria-hidden="true" class="pointer-events-none absolute left-1/2 top-[-180px] -translate-x-1/2 select-none">
      <Waves />
    </div>
    <div v-if="course?.data" class="relative col-span-1 col-start-2 overflow-x-hidden max-lg:px-4 max-md:col-start-1">
      <header class="flex min-h-[750px] flex-col items-start py-[140px]">
        <TopHeader>
          <p class="font-NeueMachina text-3xl text-white">
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
          <p class="font-NeueMachina text-3xl text-white">
            {{ course.data.is_free ? "Бесплатно" : `Стоимость: ${course.data.price} тг` }}
          </p>
        </TopHeader>
        <div class="mt-6">
          <PayStartCourseButton :course="course.data" variant="start" />
        </div>
      </header>
      <section class="font-inter text-lg text-black">
        <div v-html="course.data.note"></div>
      </section>
      <section class="mt-11">
        <CourseListDescription :course="course.data" />
      </section>
      <CourseCurriculum :course-id="+courseId" @click-lesson="(lessonId) => startCourse({ queryCourseLink: { article: lessonId } })" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CourseListDescription } from "~/features/course/course-list-description";
import { CourseCurriculum } from "~/features/course/curriculum";
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

const { data: course } = useLazyAsyncData(`course-${courseId}`, () => $module.course.getCourseById(+courseId as number));
watch(course, (newCourse) => {
  console.log('@newCourse', newCourse);
});

const paymentsStore = usePaymentsStore();
const { startCourse } = useStartCourse(() => course?.value && course.value.data, {
  callPayCourse(onSuccess) {
    if (!course?.value?.data) return;
    paymentsStore.showModal({ currentBuyCourse: course?.value?.data, onSuccessPay: onSuccess });
  },
});
</script>
