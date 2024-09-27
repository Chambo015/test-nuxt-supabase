<template>
  <div class="relative overflow-hidden pt-[30px]">
    <NuxtLayout name="methodology-articles">
      <Component :is="articleComponent" />
      <ArticlesPosts :module-id="+id" />
    </NuxtLayout>
    <BlockedPage v-if="!isLoggedIn" redirect="/methodology" />
  </div>
</template>

<script setup lang="ts">
import ArticlesPosts from "../_block/ArticlesPosts.vue";
import { METHODOLOGY_ARTICLES } from "~/shared/constants";
import BlockedPage from "~/shared/components/BlockedPage.vue";
import { MethodologySeo } from "~/shared/seo";

const { id } = useRoute().params;
const authStore = useAuthStore();
const { localLang, isLoggedIn } = storeToRefs(authStore);
const currentArticle = computed(() => METHODOLOGY_ARTICLES.find(a => a.link.includes(id as string)));

useSeoMeta({
  ogTitle: () => currentArticle.value?.desc,
  title: () => currentArticle.value?.desc || "Статья",
  description: "",
  ogDescription: "",
  ogImage: () => MethodologySeo.ogImage,
  twitterImage: () => MethodologySeo.ogImage,
  ogUrl: () => `https://citizensec.kz/methodology/${id}`,
});

const articleComponent = computed(() => {
  const lang = localLang.value;
  return defineAsyncComponent(
    () =>
      import(
        `~/pages/methodology/_articles/${id}/${lang.code}.vue`
      ),
  );
});
</script>

<style scoped></style>
