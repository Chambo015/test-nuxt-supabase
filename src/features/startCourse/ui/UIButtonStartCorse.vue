<template>
  <button
    class="group flex items-center rounded-full bg-gradient-to-r from-[#e1ffa8] via-[#f3ffdb] to-[#cbff67] bg-size-200 bg-center px-12 py-4 font-inter text-4xl !leading-none text-black transition-all duration-500 hover:bg-pos-100"
  >
    <span>{{ $t("pages.awareness.start") }}</span>
    <IconArrowRight class="ml-5 !h-auto text-[40px] transition-transform group-hover:translate-x-4 group-hover:duration-500" filled />
  </button>
</template>

<script setup lang="ts">
import IconArrowRight from "~/assets/images/icons/long-arrow-right.svg";
</script>
