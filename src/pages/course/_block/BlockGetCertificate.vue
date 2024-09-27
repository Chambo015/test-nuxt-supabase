<template>
  <div>
    <Inplace
      v-tooltip.bottom="{ value: $t('message.tooltip.uncompletedReg'), disabled: authStore.user?.is_registration_complete }"
      :disabled="!authStore.user?.is_registration_complete"
      :pt="{
        display: ['!p-0'],
      }"
      @open="loadData"
    >
      <template #display>
        <Button
          :disabled="!authStore.user?.is_registration_complete"
          :label="$t('actions.getCertificate')"
          style="width: 100%; display: inline;"
        />
      </template>
      <template #content>
        <div v-if="isLoading" class="flex justify-center">
          <ProgressSpinner />
        </div>
        <div v-else class="w-full space-y-4">
          <Button
            v-if="journal?.certificate_ru"
            :label="$t('pages.course.certificate.ru')"
            size="small"
            style="width: 100%;"
            @click="dowlandFile('cert_ru.png', journal?.certificate_ru)"
          />
          <Button
            v-if="journal?.certificate_kz"
            :label="$t('pages.course.certificate.kz')"
            size="small"
            style="width: 100%;"
            @click="dowlandFile('cert_ru.png', journal?.certificate_kz)"
          />
          <Button
            v-if="journal?.certificate_en"
            :label="$t('pages.course.certificate.en')"
            size="small"
            style="width: 100%;"
            @click="dowlandFile('cert_ru.png', journal?.certificate_en)"
          />
        </div>
      </template>
    </Inplace>
  </div>
</template>

<script setup lang="ts">
import { dowlandFile } from "~/shared/utils";
import type { Journal } from "~/types/journal.type";

const { $module } = useNuxtApp();

const journalStore = useJournalStore();
const authStore = useAuthStore();
const journal = ref<Journal>();
const isLoading = ref(false);

async function loadData() {
  if (!journalStore.detail?.journal?.id) throw new Error("Отсутствует id журнала");
  try {
    isLoading.value = true;
    const data = await $module.course.getCertificates(journalStore.detail?.journal?.id);
    journal.value = data.data;
  } catch (error) {
    console.error("@error generate certificates", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>

</style>
