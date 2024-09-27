<script setup lang="ts"></script>

<template>
  <div class="flex gap-5">
    <div v-for="i in 3" :key="i">
      <Skeleton width="175px" height="276px" class="mb-3"></Skeleton>
      <Skeleton width="170px" height=".6rem" class="mt-4"></Skeleton>
      <Skeleton width="170px" height=".6rem" class="mt-2"></Skeleton>
      <Skeleton width="120px" height=".5rem" class="mt-2"></Skeleton>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
