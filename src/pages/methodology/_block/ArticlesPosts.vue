<template>
  <section>
    <div v-if="data?.posts?.length" class="pt-20 max-md:pt-9">
      <div>
        <div class="head">
          <div class="head items-start justify-between gap-28 p-4 sm:flex sm:p-0">
            <div>
              <h4 class="font-NeueMachina text-[64px] font-extrabold leading-none tracking-wider text-gray-950">
                {{ $t("pages.methodology.post.title") }}
              </h4>
              <p class="mt-2 text-sm tracking-wider text-gray-500 sm:text-xl">
                {{ $t("pages.methodology.post.desc") }}
              </p>
            </div>
            <div>
              <LocalizatedLink
                class="relative mt-5 flex h-12 w-full items-center justify-center text-nowrap rounded-full border-0 bg-gray-950 px-6 font-bold text-white sm:w-auto"
                to="/feed"
              >
                {{ $t("pages.main.news.all") }}
              </LocalizatedLink>
            </div>
          </div>
        </div>
        <div class="pt-6">
          <div class="grid grid-cols-3 gap-x-4 max-2xl:grid-cols-2 max-md:grid-cols-1">
            <div v-for="n in (data?.posts || []).slice(0, 6)" :key="n.id" class="flex ">
              <NewsCard :data="n" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="data?.feeds?.length" class="pt-20 max-md:pt-9">
      <div>
        <div class="head">
          <div class="head items-start justify-between gap-28 p-4 sm:flex sm:p-0">
            <div>
              <h4 class="font-NeueMachina text-[64px] font-extrabold leading-none tracking-wider text-gray-950">
                {{ $t("pages.methodology.news.title") }}
              </h4>
              <p class="mt-2 text-sm tracking-wider text-gray-500 sm:text-xl">
                {{ $t("pages.methodology.news.desc") }}
              </p>
            </div>
            <div>
              <LocalizatedLink
                class="relative mt-5 flex h-12 w-full items-center justify-center text-nowrap rounded-full border-0 bg-gray-950 px-6 font-bold text-white sm:w-auto"
                to="/feed"
              >
                {{ $t("pages.main.news.all") }}
              </LocalizatedLink>
            </div>
          </div>
        </div>
        <div class="pt-6">
          <div class="grid grid-cols-3 gap-x-4 max-2xl:grid-cols-2 max-md:grid-cols-1">
            <div v-for="n in (data?.feeds || []).slice(0, 6)" :key="n.id" class="flex ">
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
import { LocalizatedLink } from "~/shared/ui";

const props = defineProps<{ moduleId: number }>();

const { $module } = useNuxtApp();

const { data } = useLazyAsyncData(`feeds-${props.moduleId}-${CONTENT_TYPE.NEWS}`, async () => {
  const [feeds, posts] = await Promise.all([
    $module.content.getFeeds({ fetchOptions: {
      query: {
        type_id: CONTENT_TYPE.NEWS,
      },
    } }),
    $module.content.getFeeds({ fetchOptions: {
      query: reactive({ module_id: toRef(() => props.moduleId) }),
    } }),
  ]);

  return {
    feeds: feeds.data,
    posts: posts.data,
  };
}, {
  server: false,
});
</script>

<style scoped></style>
