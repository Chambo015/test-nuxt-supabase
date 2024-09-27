<template>
  <div class="feed-card rounded-xl bg-white p-6">
    <div class="mb-4 flex w-full items-center">
      <Skeleton shape="circle" size="3rem" />
      <div class="ml-5">
        <Skeleton class="mb-3" width="15rem" />
        <Skeleton height=".5rem" width="10rem" />
      </div>
    </div>
    <div class="mb-5 mt-2 w-full">
      <Skeleton class="mb-2" height=".5rem" />
      <Skeleton class="mb-2" height=".5rem" />
      <Skeleton class="mb-2" height=".5rem" />
    </div>
    <div class="flex w-full gap-2">
      <Skeleton class="mb-2" height="1rem" width="3rem" />
      <Skeleton class="mb-2" height="1rem" width="2rem" />
      <Skeleton class="mb-2" height="1rem" width="2rem" />
    </div>
    <Skeleton height="150px" width="100%" />
    <div v-if="isPage" class="mb-5 mt-2 w-full">
      <Skeleton
        v-for="n in 33"
        :key="n"
        class="mb-2"
        height=".5rem"
        :width="`${100 / (n % 5)}%`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isPage?: boolean
}>();
</script>
