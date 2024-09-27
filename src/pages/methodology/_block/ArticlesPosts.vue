<template>
  <section>
    <div v-if="posts?.data?.length > 0" class="pt-20 max-md:pt-9">
      <div>
        <div class="head">
          <div
            class="head items-start justify-between gap-28 p-4 sm:flex sm:p-0"
          >
            <div>
              <h4
                class="font-NeueMachina text-[64px] font-extrabold leading-none tracking-wider text-gray-950"
              >
                {{ $t("pages.methodology.post.title") }}
              </h4>
              <p class="mt-2 text-sm tracking-wider text-gray-500 sm:text-xl">
                {{ $t("pages.methodology.post.desc") }}
              </p>
            </div>
            <div>
              <NuxtLink
                class="relative mt-5 flex h-12 w-full items-center justify-center text-nowrap rounded-full border-0 bg-gray-950 px-6 font-bold text-white sm:w-auto"
                to="/feed"
              >
                {{ $t("pages.main.news.all") }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="pt-6">
          <div class="grid grid-cols-3 gap-x-4 max-2xl:grid-cols-2 max-md:grid-cols-1">
            <div v-for="n in (posts?.data || []).slice(0, 6)" :key="n.id" class="flex ">
              <NewsCard :data="n" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="feeds?.data?.length > 0" class="pt-20 max-md:pt-9">
      <div>
        <div class="head">
          <div
            class="head items-start justify-between gap-28 p-4 sm:flex sm:p-0"
          >
            <div>
              <h4
                class="font-NeueMachina text-[64px] font-extrabold leading-none tracking-wider text-gray-950"
              >
                {{ $t("pages.methodology.news.title") }}
              </h4>
              <p class="mt-2 text-sm tracking-wider text-gray-500 sm:text-xl">
                {{ $t("pages.methodology.news.desc") }}
              </p>
            </div>
            <div>
              <NuxtLink
                class="relative mt-5 flex h-12 w-full items-center justify-center text-nowrap rounded-full border-0 bg-gray-950 px-6 font-bold text-white sm:w-auto"
                to="/feed"
              >
                {{ $t("pages.main.news.all") }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="pt-6">
          <!-- <VueCarousel
                v-bind="settingsNews"
                snapAlign="start"
                :transition="500"
                class="cert-slider"
                :breakpoints="breakpoints"
              >
                <VueSlide v-for="(n, idx) in contentStore.contents" :key="n">
                  <NewsCard class="mr-8" :data="n" />
                </VueSlide>
              </VueCarousel> -->
          <div class="grid grid-cols-3 gap-x-4 max-2xl:grid-cols-2 max-md:grid-cols-1">
            <div v-for="n in (feeds?.data || []).slice(0, 6)" :key="n.id" class="flex ">
              <NewsCard :data="n" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import NewsCard from "~/shared/components/cards/NewsCard.vue";
import { CONTENT_TYPE } from "~/shared/config";

const props = defineProps<{ moduleId: number }>();

const { $module } = useNuxtApp();
const { data: feeds } = await $module.content.getFeeds({
  asyncDataOptions: {
    server: false,
    lazy: true,
  },
  fetchOptions: {
    query: {
      type_id: CONTENT_TYPE.NEWS,
    },
  },
  key: `feeds-${props.moduleId}-1`,
});
const { data: posts } = await $module.content.getFeeds({
  asyncDataOptions: {
    server: false,
    lazy: true,
    // transform({ data }) {
    //   return {
    //     data: data.filter(post => post.type?.id !== CONTENT_TYPE.NEWS),
    //   };
    // },
  },
  fetchOptions: {
    query: reactive({ module_id: toRef(() => props.moduleId) }),
  },
  key: `posts-${props.moduleId}`,
});
</script>

<style scoped>

</style>
