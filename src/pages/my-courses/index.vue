<template>
  <div>
    <NuxtLayout name="aside-container">
      <div class="pt-[30px] max-2xl:px-4 max-lg:pl-0 max-md:px-4">
        <div>
          <Breadcrumb :home="homeBreadcrumb" :model="itemsBreadcrumb">
            <template #itemicon="{ item }">
              <BaseIcon v-if="item.icon === 'home'" color="rgb(107 114 128)" name="home-path" width="20" />
            </template>
          </Breadcrumb>
        </div>
        <div class="pt-3">
          <h1 class="font-NeueMachina text-[25px] font-extrabold !leading-none text-[#3b3551]">
            Мои курсы
          </h1>
          <div class="pt-9">
            <div v-if="data.length > 0" class="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-x-6 gap-y-[18px]">
              <LocalizatedLink
                v-for="item in data"
                :key="item.id"
                :to="`/course/${item.id}`"
              >
                <MyCourseCard
                  :is-free="item.is_free"
                  :poster-src="item.poster"
                  :price="`${item.adaptedPrice} тг`"
                  :status="item.status"
                  :title-course="item.name"
                />
              </LocalizatedLink>
            </div>
            <div v-else class="flex min-h-[50dvh] items-center justify-center lg:mr-sidebarWidth">
              <Empty action-title="Найти курсы" description="Начните изучать наши курсы и отслеживайте прогресс курсов" title="У вас нет курсов" @action="$router.push('/courses')" />
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { MyCourseCard, useMyCourses } from "~/features/courses/myCourses";
import BaseIcon from "~/shared/components/BaseIcon.vue";
import { Empty, LocalizatedLink } from "~/shared/ui";

definePageMeta({
  auth: true,
});

const { data } = useMyCourses();

const homeBreadcrumb = ref({
  icon: "home",
  route: "/",
});

const itemsBreadcrumb = ref([
  { label: "Мои курсы", route: "/my-courses" },
]);
</script>

<style scoped>

</style>
