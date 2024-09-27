<template>
  <div class="bg-black h-screen flex flex-col">
    <header class="container px-4 flex items-center justify-between py-4">
        <h1 class="font-bold text-2xl"><NuxtLink to="/">Project</NuxtLink></h1>
        <p class="font-semibold text-2xl">Aisakhanov Eraly</p>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>
