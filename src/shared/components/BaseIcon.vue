<template>
  <Component
    :is="iconComponent"
    class="base-icon"
    role="img"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
}>();

const iconComponent = computed(() => {
  // need to trigger rerender if icon name changes
  const splitName = props.name.split("/");

  return defineAsyncComponent(() => {
    switch (splitName.length) {
      case 2:
        return import(`./icons/${splitName[0]}/${splitName[1]}.vue`);
      case 3:
        return import(`./icons/${splitName[0]}/${splitName[1]}/${splitName[2]}.vue`);
      case 1:
      default:
        return import(`./icons/${splitName[0]}.vue`);
    }
  });
});
</script>
