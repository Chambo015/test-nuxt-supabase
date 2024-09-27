<template>
  <div class="">
    <div class="">
      <template v-for="banner in contentStore.banners" :key="banner.link">
        <a :href="banner.link">
          <img class="mb-3 aspect-square max-w-sidebarWidth rounded-xl object-cover" loading="lazy" :src="banner.file" />
        </a>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContentStore } from "~/shared/store/content.store";
import { ContentRepository } from "~/shared/repository/content.repository";

const contentStore = useContentStore();
ContentRepository.banner();
</script>
