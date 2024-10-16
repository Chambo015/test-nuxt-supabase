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
import type { AppLangs } from "~/shared/enums";

const switchLocalePath = useSwitchLocalePath();
const { locale } = useI18n<unknown, AppLangs>();
const authStore = useAuthStore();

watch(() => locale.value, (newLocale) => {
  const initialLang = langs.find(l => l.code === newLocale);
  if (initialLang && authStore.localLang.code !== initialLang.code) {
    authStore.localLang = initialLang;
  };
}, { immediate: true });

function localSet(v: { value: TypeLang }) {
  authStore.localLang = v.value;
  // setLocale(v.value.code);
  navigateTo(switchLocalePath(v.value.code));
  // window.location.reload();
}
</script>
