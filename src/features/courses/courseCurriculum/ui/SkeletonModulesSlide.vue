<script setup lang="ts"></script>

<template>
  <div class="flex gap-5">
    <div v-for="i in 3" :key="i">
      <Skeleton class="mb-3" height="276px" width="175px" />
      <Skeleton class="mt-4" height=".6rem" width="170px" />
      <Skeleton class="mt-2" height=".6rem" width="170px" />
      <Skeleton class="mt-2" height=".5rem" width="120px" />
    </div>
  </div>
</template>
