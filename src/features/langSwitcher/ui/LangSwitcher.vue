<template>
  <Dropdown
    v-model="authStore.localLang"
    :class="$attrs.class"
    option-label="name"
    :options="langs"
    @change="localSet"
  />
</template>

<script setup lang="ts">
import { type TypeLang, langs } from "../model";

const { setLocale } = useI18n();
const authStore = useAuthStore();

function localSet(v: { value: TypeLang }) {
  authStore.localLang = v.value;
  setLocale(v.value.code);
  window.location.reload();
}
</script>
