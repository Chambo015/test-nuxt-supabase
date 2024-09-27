<template>
  <div>
    {{ JSON.stringify(data) }}
  </div>
</template>

<script setup lang="ts">
const { data } = await useLazyAsyncData('', () => $fetch('https://jsonplaceholder.typicode.com/todos/'))
</script>

<style scoped>

</style>