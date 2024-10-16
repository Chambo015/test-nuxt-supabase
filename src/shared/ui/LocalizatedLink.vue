<script setup lang="ts">
import type { NuxtLinkProps } from "#app";

const props = defineProps<NuxtLinkProps>();
const localePath = useLocalePath();

// :no-prefetch="undefined" - Ругается что нельзя использовать одновременно два пропса noPrefetch и prefetch
</script>

<template>
  <NuxtLink v-bind="props" :no-prefetch="undefined" :to="props.to && localePath(props.to)">
    <slot></slot>
  </NuxtLink>
</template>
