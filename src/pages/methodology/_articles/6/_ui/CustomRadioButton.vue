<template>
  <div class="flex items-center">
    <RadioButton
      class="text-xs"
      v-model="model"
      :inputId="id"
      :name="value"
      :value="value"
      :pt="{
        root: {
          class: '!w-4 !h-4',
        },
        box: {
          class: '!w-4 !h-4',
        },
        icon: {
          class: '!w-2 !h-2',
        },
      }"
      :ptOptions="{mergeSections: true, mergeProps: true}" />
    <label :for="id" class="ml-2 text-[#344054]">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel({required: true});
defineProps<{
  label: string;
  id: string;
  value: string
}>();
</script>

<style scoped></style>
