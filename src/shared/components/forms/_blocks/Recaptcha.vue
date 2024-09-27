<template>
  <div class="align-items-center inline-flex h-[76px] w-[302px] rounded-sm" :class="[invalid && 'ring-1 ring-red-600']">
    <RecaptchaV2
      size="normal"
      @error-callback="handleErrorCallback"
      @load-callback="handleLoadCallback"
    />
  </div>
</template>

<script setup lang="ts">
import { RecaptchaV2 } from "vue3-recaptcha-v2";

defineProps<{ invalid?: boolean }>();
const model = defineModel({ required: true, type: Boolean });
function handleErrorCallback() {
  console.error("Error callback");
  model.value = false;
}
function handleLoadCallback(response: unknown) {
  // console.log("Load callback", response);
  model.value = true;
}

onMounted(() => {
  model.value = false;
});
</script>

<style scoped>

</style>
