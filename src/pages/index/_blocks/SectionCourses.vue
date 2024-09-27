<template>
  <div class="bg-white overflow-hidden">
    <div class="max-w-[930px] mx-auto max-lg:px-4">
      <div class="py-14 max-md:py-10">
        <div class="flex justify-between items-center gap-22">
          <div>
            <h4 class="text-gray-950 leading-none tracking-wider font-NeueMachina text-[64px] font-medium max-md:text-5xl">
              Курсы
              <span class="text-violet-600 tracking-wider">с сертификацией</span>
            </h4>
            <p class="text-xl mt-5 text-gray-500 tracking-wider font-inter max-md:text-base">
              Курс по кибергигиене для государственных служащих и корпоративных работников. Для ответственных доступен
              дэшборд со всей статистикой
            </p>
          </div>
          <div class="flex gap-2 max-lg:hidden">
            <Button
              icon="pi pi-arrow-left"
              class="border-gray-300 text-gray-600"
              rounded
              severity="secondary"
              outlined
              @click="carouselCourses && carouselCourses.prev()" />
            <Button
              icon="pi pi-arrow-right"
              class="border-gray-300 text-gray-600"
              rounded
              severity="secondary"
              outlined
              @click="carouselCourses && carouselCourses.next()" />
          </div>
        </div>

        <div class="pt-16">
          <VueCarousel :breakpoints="breakpoints" ref="carouselCourses" v-bind="settings" snapAlign="center" :transition="500" class="cert-slider" >
            <VueSlide v-for="(n, idx) in 3" :key="n">
              <div
                class="bg-[#734CC9] p-6 w-full text-left mr-8">
                <div class="relative h-[137px]">
                  <img src="~/assets/images/course-img.jpg" alt="" class="w-full h-full object-cover">
                  <span class="bg-primaryHeadingBg text-sm py-2 px-4 rounded-full font-bold absolute right-4 top-5 text-white">{{ n * 2345 }} ₸</span>
                </div>
                <div class="p-4 border-white/50 border text-xl mt-6 font-inter text-white bg-white/30">
                  <p class="text-2xl font-semibold">Базовые навыки</p>
                  <p class="text-lg mt-4 font-medium">Расскажем вам о базовых навыках специалиста в информационной безопасности</p>
                  <nuxt-link to="#" class="mt-4 flex items-center text-base font-semibold ">
                    <span class="hover-link-effect">Подробнее</span> <i class="text-sm ml-3 rotate-45 pi pi-arrow-up"/>
                  </nuxt-link>
                </div>
              </div>
            </VueSlide>
          </VueCarousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const carouselCourses = ref<{ prev: () => void, next: () => void }>();
const settings = {
  itemsToShow: 1.2,
  snapAlign: "start",
  transition: 500,
};

const breakpoints = {
  700: {
    itemsToShow: 1.5,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 2.2,
  },
};
</script>

<style scoped></style>
