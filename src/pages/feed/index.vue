<template>
  <div class="container relative">
    <div class="grid grid-cols-[1fr_min(590px,100vw)_1fr] gap-x-4 pt-[30px] max-md:grid-cols-1">
      <div class="max-md:hidden"></div>
      <div>
        <FeedHistory />
        <div class="mb-5 mt-9 flex items-center justify-between max-md:px-4">
          <h2 class="font-NeueMachina text-2xl font-extrabold tracking-wider text-gray-700">
            {{ $t("pages.feed.title") }}
          </h2>
          <TypeSelect :is-loading="isPendingFilters" :types="filters?.types" @change="typeHandler" />
        </div>

        <TagsSection
          :is-loading="isPendingFilters"
          :tags="filters?.tags"
          @handle-tag="tagHandler"
        />

        <template v-if="isPendingFeeds && contents.length <= 0">
          <FeedCardSkeleton />
          <FeedCardSkeleton class="mt-6" />
          <FeedCardSkeleton class="mt-6" />
        </template>
        <template v-else>
          <div v-if="contents.length > 0" class="mb-5 max-md:px-4">
            <template v-for="content in contents" :key="content.id">
              <FeedCard :content="content" />
            </template>
          </div>
        </template>
        <Button
          v-if="pagination.hasMore"
          aria-label="Submit"
          class="h-10 w-full rounded-md border-0 bg-gray-100 transition hover:bg-gray-200"
          icon="pi pi-ellipsis-h text-violet-600"
          :loading="isPendingFeeds && statusFeeds !== 'idle'"
          severity="secondary"
          @click="moreLoad"
        />
      </div>
      <div class="relative flex flex-col items-end pr-4">
        <FeedBanner v-if="$device.isDesktop" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TagsSection from "./_blocks/TagsSection.vue";
import TypeSelect from "./_blocks/TypeSelect.vue";
import FeedHistory from "~/pages/feed/_blocks/feed-history.vue";
import FeedBanner from "~/pages/feed/_blocks/feed-banner.vue";
import FeedCardSkeleton from "~/shared/components/cards/FeedCardSkeleton.vue";
import FeedCard from "~/shared/components/cards/FeedCard.vue";
import { FeedSeo } from "~/shared/seo";
import { useUrlSearchParams } from "~/shared/composables/useUrlSearchParams";

useSeoMeta(FeedSeo);

const { $module } = useNuxtApp();
const route = useRoute();
const contentStore = useContentStore();
const { contents, pagination } = storeToRefs(contentStore);

const params = useUrlSearchParams();

const { data: feeds, pending: isPendingFeeds, execute, status: statusFeeds } = await $module.content.getFeeds({
  asyncDataOptions: {
    watch: [() => route.query],
    immediate: false,
    server: false,
    lazy: true,
  },
  fetchOptions: {
    query: params,
    params: reactive({ page: toRef(() => pagination.value.page) }),
  },
});

function moreLoad() {
  if (!pagination.value.hasMore) return;
  pagination.value.page++;
  execute();
}

watch(feeds, (newData) => {
  pagination.value.hasMore = !!newData?.links?.next;
  newData?.meta && contentStore.setContentPagination(newData.meta);
  newData?.data && contentStore.setContent(newData?.data);
});

onMounted(() => {
  if (contents.value.length <= 0) execute();
});

const { data: filters, pending: isPendingFilters } = await $module.content.getFeedFilters({
  asyncDataOptions: {
    server: false,
    lazy: true,
  },
});

function tagHandler({ id }: { id: number | "All" }) {
  contentStore.resetContents();
  params.tag_id = id === "All" ? undefined : id;
};

function typeHandler({ id }: { id: number | "All" }) {
  contentStore.resetContents();
  params.type_id = id === "All" ? undefined : id;
};
</script>
