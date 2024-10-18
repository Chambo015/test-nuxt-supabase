<template>
  <div class="path flex items-center gap-2">
    <LocalizatedLink to="/">
      <BaseIcon color="rgb(107 114 128)" name="home-path" width="40" />
    </LocalizatedLink>
    <i class="pi pi-angle-right text-gray-400"></i>
    <Skeleton />
    <i class="pi pi-angle-right text-gray-400"></i>
    <Skeleton />
  </div>
</template>

<script lang="ts" setup>
import BaseIcon from "../BaseIcon.vue";
import { LocalizatedLink } from "~/shared/ui";
</script>
