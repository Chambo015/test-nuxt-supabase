<template>
  <Breadcrumb :home="homeBreadcrumb" :model="itemsBreadcrumb" :pt="{ root: '!overflow-x-hidden', menuitem: 'has-[span.n-last]:truncate' }">
    <template #item="{ item }">
      <NuxtLink v-if="item.icon" :to="item.route">
        <BaseIcon
          v-if="item.icon === 'home'"
          color="rgb(107 114 128)"
          name="home-path"
          width="20"
        />
      </NuxtLink>
      <NuxtLink v-else :to="item.route">
        <span class="truncate font-inter text-sm font-medium" :class="item.route.includes('article') ? 'text-main-purple n-last' : 'text-[#475467]'">
          {{ item.label }}
        </span>
      </NuxtLink>
    </template>
  </Breadcrumb>
</template>

<script setup lang="ts">
import BaseIcon from "~/shared/components/BaseIcon.vue";

const journalStore = useJournalStore();

const homeBreadcrumb = ref({
  icon: "home",
  route: "/",
  label: "Home",
});

const itemsBreadcrumb = computed(() => [
  { label: "Кибергигиена", route: "/awareness" },
  ...(journalStore.detail ? [{ label: `${journalStore.detail?.module?.name || ""} | Урок ${journalStore.detail?.article?.name || ""}`, route: `/course/1?article=${journalStore.detail?.article?.id}` }] : []),
]);
</script>

<style scoped>

</style>
