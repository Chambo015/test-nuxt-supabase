<template>
  <div class="mx-auto max-w-[600px] pt-10">
    <SkeletonBreadcrumb />
    <Skeleton class="mt-8 h-8" height="32" />
    <Skeleton class="mb-4 mt-1 h-8" height="32" />
    <FeedCardSkeleton :is-page="true" />
  </div>
</template>

<script setup>
import FeedCardSkeleton from "~/shared/components/cards/FeedCardSkeleton.vue";
import SkeletonBreadcrumb from "~/shared/components/skeletons/SkeletonBreadcrumb.vue";
</script>
