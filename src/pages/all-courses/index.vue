<template>
  <div class="mx-auto grid min-h-[50dvh] max-w-screen-2xl grid-cols-[minmax(200px,260px)_1fr]">
    <div></div>
    <div class="pt-[30px] max-lg:px-4 max-lg:pl-0">
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
          <div class="grid grid-cols-[repeat(3,380px)] gap-x-6 gap-y-[18px]">
            <div
              v-for="course in [...initData, ...(data?.data || [])]"
              :key="course.id"
              class="flex cursor-pointer flex-col items-start gap-3 rounded-3xl border border-[#E5E7EB] bg-white px-7 py-6 transition-all hover:shadow-lg"
              @click="handleClickCourse(course)"
            >
              <img :alt="course.name" class="aspect-video rounded-xl object-cover" :src="course.poster" />
              <Chip
                :label="course.price === 0 ? 'Бесплатный курс' : `${course.price} тг`"
                :pt="{
                  root: ['!px-2.5 !text-sm', course.price === 0 ? '!text-[#90D272] !bg-[#90D272]/10' : '!text-[#EB6A6A] !bg-[#EB6A6A]/10'],
                  label: '!my-0',
                }"
              />
              <p class="text-lg font-medium leading-tight text-black">
                {{ course.name }}
              </p>
              <p class="line-clamp-4 leading-tight text-[#606060]">
                {{ course.note }}
              </p>
            </div>
          </div>
          <!-- if Empty -->
          <!-- <div class="flex items-center justify-center h-full lg:mr-sidebarWidth"><EmptyCourses /></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "~/shared/components/BaseIcon.vue";
import { useTipTopPay } from "~/shared/composables/useTipTopPay";
import { AuthModalType } from "~/shared/enums/common.enum";
import { AllCoursesSeo } from "~/shared/seo";
import type { Course } from "~/types/course.type";

// config page
definePageMeta({
  development: true,
});
useSeoMeta(AllCoursesSeo);

// Breadcrumb
const homeBreadcrumb = ref({ icon: "home", route: "/" });
const itemsBreadcrumb = ref([{ label: "Все курсы", route: "/all-courses" }]);

const { pay, isLoading } = useTipTopPay();
const { $module } = useNuxtApp();
const authStore = useAuthStore();
const toast = useToast();

function handleClickCourse(course: CourseWithLink) {
  if (course.link) {
    return navigateTo(course.link);
  } else if (+course.price > 0) {
    if (!authStore.isLoggedIn) return authStore.modal = AuthModalType.LOGIN;
    if (course.is_paid) return toast.add({ severity: "warn", summary: "Оплачено", detail: "Курс уже приобретен", life: 3000 });
    console.log('@handleClickCourse');
    pay({ courseId: course.id, description: course.note });
  }
}

interface CourseWithLink extends Course {
  link?: string
}
const initData: CourseWithLink[] = [
  {
    id: 9999999,
    name: "Кибергигиена",
    price: 0,
    note: "Каждый урок содержит практические советы и полезные подсказки, разработанные специально для граждан. Присоединяйтесь и станьте частью безопасного онлайн-сообщества!",
    poster: "og.jpeg",
    journal: null,
    link: "/awareness",
    is_paid: false,
    is_started: false,
    current_journal_detail: null,
  },
];
const { data } = await $module.course.getAllCourses({ asyncDataOptions: { lazy: true } });
</script>

<style scoped>

</style>
