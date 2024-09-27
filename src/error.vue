<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div class="flex min-h-dvh flex-col items-center justify-center gap-5 bg-black text-white">
    <h1 class="text-5xl font-bold">Citizensec</h1>
    <h2>{{ error?.statusCode }}</h2>
    <p>{{ error?.statusMessage }}</p>
    <NuxtLink class="rounded-2xl px-10 py-4 ring-1 ring-white/10" to="/">
      Go back home
    </NuxtLink>
  </div>
</template>
