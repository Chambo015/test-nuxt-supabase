<template>
  <Breadcrumb :home="homeBreadcrumb" :model="itemsBreadcrumb" :pt="{ root: '!overflow-x-hidden', menuitem: 'has-[span.n-last]:truncate has-[.home-icon]:shrink-0 truncate' }">
    <template #item="{ item }">
      <LocalizatedLink v-if="item.icon" class="home-icon" :to="item.route">
        <BaseIcon
          v-if="item.icon === 'home'"
          color="rgb(107 114 128)"
          name="home-path"
          width="20"
        />
      </LocalizatedLink>
      <LocalizatedLink v-else :to="item.route">
        <span
          class="truncate font-inter text-sm font-medium"
          :class="item.route.includes('article') ? 'text-main-purple n-last' : 'text-[#475467] max-w-16'"
          :title="(item.label as string)"
        >
          {{ item.label }}
        </span>
      </LocalizatedLink>
    </template>
  </Breadcrumb>
</template>

<script setup lang="ts">
import BaseIcon from "~/shared/components/BaseIcon.vue";
import { LocalizatedLink } from "~/shared/ui";

const journalStore = useJournalStore();

const homeBreadcrumb = ref({
  icon: "home",
  route: "/",
  label: "Home",
});

const itemsBreadcrumb = computed(() => [
  { label: journalStore.detail?.course?.name, route: `/courses/${journalStore.detail?.course?.id}` },
  ...(journalStore.detail
    ? [{
        label: `${journalStore.detail?.module?.name || ""} | Урок ${journalStore.detail?.article?.name || ""}`,
        route: `/course/${journalStore.detail.course?.id}?article=${journalStore.detail?.article?.id}`,
      }]
    : []),
]);
</script>

<style scoped>

</style>
