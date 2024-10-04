<template>
  <div class="mx-auto grid min-h-[50dvh] max-w-screen-2xl grid-cols-[minmax(200px,260px)_1fr] max-md:grid-cols-1">
    <div></div>
    <div class="pr-4 pt-[30px] max-md:px-4">
      <div>
        <Breadcrumb :home="homeBreadcrumb" :model="itemsBreadcrumb">
          <!-- <template #item="{ item, props }">
                    </template>  -->
          <template #itemicon="{ item }">
            <BaseIcon v-if="item.icon === 'home'" color="rgb(107 114 128)" name="home-path" width="20" />
          </template>
        </Breadcrumb>
      </div>
      <div class="pt-3">
        <h1 class="font-NeueMachina text-[25px] font-extrabold !leading-none text-[#3b3551]">
          Все курсы
        </h1>
        <div class="pt-9">
          <template v-if="pending">
            <div class="grid grid-cols-[repeat(3,minmax(250px,380px))] gap-x-6 gap-y-[18px] max-md:grid-cols-1">
              <SkeletonCourseCard v-for="skeleton in 5" :key="skeleton" />
            </div>
          </template>
          <template v-else>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-x-6 gap-y-[18px] max-md:grid-cols-1">
              <CourseCard
                v-for="course in data?.data || []"
                :key="course.id"
                :course="course"
              >
                <template #action-right>
                  <PayStartCourseButton :course="course" variant="buy" />
                </template>
              </CourseCard>
            </div>
          </template>
          <!-- if Empty -->
          <!-- <div class="flex items-center justify-center h-full lg:mr-sidebarWidth"><EmptyCourses /></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdapterCourse } from "~/entities/course";
import { CourseCard, SkeletonCourseCard } from "~/features/courses/courseCard";
import { PayStartCourseButton } from "~/features/startCourse";
import BaseIcon from "~/shared/components/BaseIcon.vue";
import { AllCoursesSeo } from "~/shared/seo";

// config page
definePageMeta({
  development: true, // TODO: remove when production
});

useSeoMeta(AllCoursesSeo);

// Breadcrumb
const homeBreadcrumb = ref({ icon: "home", route: "/" });
const itemsBreadcrumb = ref([{ label: "Все курсы", route: "/courses" }]);

const { $module } = useNuxtApp();

const { data, pending } = useLazyAsyncData("all-courses", async () => await $module.course.getAllCourses(), {
  server: false,
  transform(res) {
    return {
      ...res,
      data: res.data.map(course => new AdapterCourse(course).adapt()),
    };
  },
});
</script>
