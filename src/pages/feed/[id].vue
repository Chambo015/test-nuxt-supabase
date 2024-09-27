<template>
  <div>
    <FeedSkeleton v-if="pending && !feed" />
    <div v-else class="relative mx-auto max-w-[600px] pt-10">
      <div class="path flex items-center gap-2 max-md:px-4">
        <NuxtLink to="/">
          <BaseIcon color="rgb(107 114 128)" name="home-path" width="40" />
        </NuxtLink>
        <i class="pi pi-angle-right text-gray-400"></i>

        <NuxtLink :to="`/feed?type_id=${feed?.type?.id}`">
          <p class="text-nowrap text-sm text-gray-600">
            {{ feed?.type?.name }}
          </p>
        </NuxtLink>
        <i class="pi pi-angle-right text-gray-400"></i>
        <p class="w-full truncate text-nowrap text-sm font-bold text-violet-600">
          {{ feed?.name }}
        </p>
      </div>

      <h1 class="mb-4 mt-8 font-NeueMachina text-2xl font-bold max-md:px-4">
        {{ feed?.name }}
      </h1>

      <div class="mb-4 rounded-xl bg-white p-6 max-md:p-4">
        <!-- Header -->
        <div class="grid gap-2" :class="{ 'grid-cols-[1fr_50px]': feed?.is_pro }">
          <div class="mb-4 flex items-start gap-4">
            <div class="w-10">
              <Avatar
                v-if="!!feed?.created_user?.photo"
                :image="feed?.created_user?.photo"
                shape="circle"
              />
              <Avatar v-else icon="pi pi-user" shape="circle" />
            </div>
            <div class="w-full">
              <h4 class="mb-1 mt-0 text-base font-semibold">
                {{ feed?.created_user?.name }}
                {{ feed?.created_user?.last_name }}
              </h4>
              <p class="text-sm font-semibold text-violet-600">
                @{{ feed?.created_user?.login }}
                <span class="font-normal text-gray-500">, {{ feed?.created_at }}</span>
              </p>
            </div>
            <button class="p-1 text-xl text-gray-600 transition-colors hover:text-black/90" @click="handleShareClick">
              <ShareIcon />
            </button>
          </div>
          <div
            v-if="feed?.is_pro"
            class="gradient flex h-6 w-full items-center justify-center rounded-full bg-violet-600 font-NeueMachina text-sm text-white"
          >
            PRO
          </div>
        </div>
        <!-- Subheader -->
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <div
            class="tag-type rounded-md p-2 py-0 text-sm"
            :style="{
              color: feed?.type?.color,
              background: `#${LigthenColor(feed?.type?.color ?? '', 60)}`,
            }"
          >
            {{ feed?.type?.name }}
          </div>
          <template v-if="tagsFeed">
            <div v-for="tag in tagsFeed" :key="tag.id" class="text-sm text-blue-400" :style="{ color: tag.color }">
              #{{ tag.name }}
            </div>
          </template>
        </div>
        <!-- Poster -->
        <img :alt="feed?.name" class="my-5 h-72 w-full rounded-xl object-cover" :src="feed?.poster" />
        <!-- Body -->
        <div class="mb-4 font-inter text-[#2B2B2B] antialiased" v-html="feed?.note || feed?.short_note"></div>
      </div>
      <BlockedPage v-if="!authStore.isLoggedIn && feed?.is_pro" redirect="/feed" title="Для получения доступа к Pro постам, Вам необходимо" />
      <ShareModal v-model="visibleShareModal" />
      <div v-if="relatedCyberModule" class="mb-4 w-full">
        <div
          class="flex w-full flex-col bg-[#734CC9] p-6 text-white "
        >
          <p class="font-NeueMachina text-2xl">
            {{ 'Узнайте больше в нашей методологии' }}
          </p>
          <div
            class="mt-6 flex w-full grow flex-col border border-white/50 bg-white/30 px-6 py-8"
          >
            <p class="mb-8 font-NeueMachina text-[20px] font-medium !leading-none">
              {{ $t(relatedCyberModule.locale) }}
            </p>
            <NuxtLink
              class="hover-link-effect mt-auto flex items-center self-start font-inter font-semibold"
              :to="relatedCyberModule.link"
            >
              {{ $t('actions.moreButton') }} <i class="pi pi-arrow-up ml-3 rotate-45 text-sm"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
      <FeedsRecommended v-if="tagsFeed" :exclude-feed-id="feed.id" :tags="tagsFeed" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FeedSkeleton from "./_blocks/FeedSkeleton.vue";
import FeedsRecommended from "./_blocks/FeedsRecommended.vue";
import BaseIcon from "~/shared/components/BaseIcon.vue";
import ShareIcon from "~/assets/images/icons/share.svg";
import BlockedPage from "~/shared/components/BlockedPage.vue";
import { useFeedById } from "~/shared/composables/api/useFeedById";
import { LigthenColor } from "~/shared/utils/lighten-color";
import ShareModal from "~/shared/components/modals/ShareModal.vue";
import { METHODOLOGY_ARTICLES } from "~/shared/constants";

const authStore = useAuthStore();
const { isDesktop } = useDevice();
const route = useRoute();
const visibleShareModal = ref(false);

const { data: feed, pending } = await useFeedById();

const tagsFeed = computed(() => {
  if (!feed?.value?.tags) return null;
  if (feed.value.tags.length === 0) return null;
  return feed.value.tags;
});

const relatedCyberModule = computed(() => {
  if (!feed?.value?.cyber_module) return null;
  const module = feed.value.cyber_module;
  const relatedModule = METHODOLOGY_ARTICLES.find(m => m.name === module.id.toString());
  return relatedModule || null;
});

function handleShareClick() {
  if (isDesktop) {
    visibleShareModal.value = true;
  } else {
    navigator.share({ url: window.location.href }).catch(() => visibleShareModal.value = true);
  }
}

useSeoMeta({
  title: () => feed.value?.name || "News",
  ogTitle: () => feed.value?.name,
  description: () => feed.value?.short_note || "",
  ogDescription: () => feed.value?.short_note,
  ogImage: () => feed.value?.poster,
  ogUrl: () => `https://citizensec.kz${route.fullPath}`,
  ogType: "article",
});
</script>

<style scoped lang="scss">
.gradient {
  background: linear-gradient(
    90deg,
    var(--purple-400) 0%,
    var(--purple-600) 100%
  );
}
</style>
