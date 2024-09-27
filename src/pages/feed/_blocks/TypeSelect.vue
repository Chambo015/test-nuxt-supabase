<template>
  <div>
    <Dropdown
      v-if="$device.isDesktop"
      v-model="selectedType"
      class="border-0 bg-white font-semibold text-[#6F7F95] shadow md:w-[190px]"
      :loading="isLoading"
      option-label="name"
      option-value="id"
      :options="types"
      :placeholder="$t('pages.feed.select_type_content')"
      show-clear
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { ContentType } from "~/types/content.type";

withDefaults(defineProps<{ types?: ContentType[], isLoading: boolean }>(), {
  types: () => [],
});
const emit = defineEmits<{
  (e: "change", value: { id: "All" | number }): void
}>();

const selectedType = ref();

function onChange(e: { value: number | null }) {
  emit("change", { id: e.value ? e.value : "All" });
}
</script>
