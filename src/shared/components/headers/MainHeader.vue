<template>
  <h1
    class="inline-block px-4 py-6 font-NeueMachina text-[40px] font-medium leading-none max-md:py-4 max-md:text-3xl"
    :class="[
      bgColorClass[bgColor],
      $attrs.class,
    ]"
  >
    <slot></slot>
  </h1>
</template>

<script setup lang="ts">
type BgColorType = "primary" | "secondary" | "lime";

withDefaults(defineProps<{ bgColor?: BgColorType }>(), {
  bgColor: "primary",
});

const bgColorClass: Record<BgColorType, string> = {
  primary: "bg-primaryHeadingBg text-white ",
  secondary: "bg-secondaryHeadingBg text-white ",
  lime: "bg-lime-main text-black",
};
</script>
