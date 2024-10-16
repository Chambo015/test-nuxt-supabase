<template>
  <div class="overflow-hidden pt-20 max-md:pt-7">
    <div class="mx-auto max-w-[930px]">
      <div>
        <div class="flex items-start justify-between gap-28 px-4 max-md:flex-col max-md:gap-4 md:p-0">
          <div>
            <h4 class="font-NeueMachina text-[64px] leading-none tracking-wider text-gray-950 max-md:text-[32px]">
              {{ $t("pages.main.news.title") }}
            </h4>
            <p class="mt-5 text-sm tracking-wider text-gray-500 sm:text-xl">
              {{ $t("pages.main.news.note") }}
            </p>
          </div>
          <LocalizatedLink
            class="relative ml-auto text-nowrap border-0 font-bold text-white max-md:w-full"
            to="/feed"
          >
            <Button :pt="{ root: { class: '!px-10 !rounded-full py-4 max-md:w-full' } }" severity="contrast">
              {{ $t("pages.main.news.all") }}
            </Button>
          </LocalizatedLink>
        </div>
      </div>
      <div v-if="!pending" class="body pt-6">
        <VueCarousel
          v-bind="settingsNews"
          :breakpoints="breakpoints"
          class="cert-slider"
          snap-align="start"
          :transition="500"
        >
          <VueSlide v-for="(n) in feeds.data.slice(0, 3)" :key="n.id">
            <NewsCard class="mr-8" :data="n" />
          </VueSlide>
        </VueCarousel>
      </div>
      <div v-else class="flex gap-5 pt-6">
        <FeedCardSkeleton />
        <FeedCardSkeleton />
        <FeedCardSkeleton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FeedCardSkeleton from "~/shared/components/cards/FeedCardSkeleton.vue";
import NewsCard from "~/shared/components/cards/NewsCard.vue";
import { LocalizatedLink } from "~/shared/ui";

const { $module } = useNuxtApp();

const { data: feeds, pending } = useLazyAsyncData(async () => await $module.content.getFeeds(), {
  server: false,
  default() {
    return {
      data: [],
    };
  },
});

const settingsNews = {
  itemsToShow: 1.1,
  snapAlign: "start",
  transition: 500,
};

const breakpoints = {
  700: {
    itemsToShow: 1.5,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 2,
  },
};
</script>

<style scoped>

</style>
