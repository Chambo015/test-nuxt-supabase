<template>
  <div
    class="mx-auto grid max-w-screen-2xl"
    :class="[$device.isDesktop ? 'grid-cols-[minmax(200px,260px)_1fr]' : 'grid-cols-1']"
  >
    <div
      class="col-span-1 overflow-x-hidden"
      :class="[$device.isDesktop ? 'col-start-2' : 'col-start-1']"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
