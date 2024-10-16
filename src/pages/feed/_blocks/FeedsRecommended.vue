<template>
  <section>
    <div v-if="props.tags.length && feeds?.data.length > 0" class="mb-4 rounded-xl bg-white p-6 max-md:p-4">
      <h3 class="mb-4 font-NeueMachina text-2xl font-semibold">
        {{ $t("message.recommendations") }}
      </h3>
      <div>
        <NewsCard v-for="item in feeds?.data.slice(0, 10)" :key="item.id" :data="item" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import NewsCard from "~/shared/components/cards/NewsCard.vue";
import type { ContentType } from "~/types/content.type";

const props = defineProps<{
  tags: ContentType[]
  excludeFeedId?: number
}>();

const { $module } = useNuxtApp();

// TODO: Реализовать запрос всех новостей для каждого отдельного Тега в массиве tags используя Promise.All

const { data: feeds } = useLazyAsyncData(`feeds-tag-${props.tags[0].id}`, async () => await $module.content.getFeeds({
  fetchOptions: {
    query: {
      tag_id: props.tags[0].id,
    },
  },
}), {
  watch: [toRef(props.tags)],
  default() {
    return { data: [] };
  },
  transform(input) {
    return {
      data: input.data.slice(0, 10).filter(n => n.id !== props.excludeFeedId),
    };
  },
});
</script>

<style scoped>

</style>
