<template>
  <Button
    label="Скопировать ссылку"
    :loading="isLoading"
    severity="info"
    size="small"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import { copyText } from "~/shared/utils";

const { $toast, $module } = useNuxtApp();

const isLoading = ref(false);

async function handleClick() {
  try {
    isLoading.value = true;
    const tokenIB = await $module.user.getIBToken();
    if (!tokenIB.token?.trim()) {
      isLoading.value = false;
      $toast.error({ summary: "Не удалось получить токен" });
      return;
    }
    const url = `${window.location.origin}/?ref=${tokenIB.token?.trim()}`;
    const resCopy = await copyText(url);

    isLoading.value = false;

    if (!resCopy) return $toast.error({ summary: "Не удалось скопировать ссылку" });

    $toast.success({ summary: "Ссылка скопирована" });
  } catch (error) {
    isLoading.value = false;
  }
}
</script>

<style scoped>

</style>
