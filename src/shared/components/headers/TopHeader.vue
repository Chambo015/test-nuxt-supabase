<template>
  <div class="box inline-flex h-14 items-center justify-center px-6 font-NeueMachina max-md:px-5">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.box {
  background: radial-gradient(
    circle at 50% 100%,
    rgba(115, 76, 201, 1) 0%,
    rgba(0, 0, 0, 1) 90%
  );
}
</style>
