<template>
  <button @click="handleAuthGoogle">
    <svg
      fill="none"
      height="41"
      viewBox="0 0 40 41"
      width="40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        class="transition-[fill] hover:fill-[#e9ebee]"
        fill="#F9FAFB"
        height="40"
        rx="8"
        width="40"
        y=".231"
      />
      <path d="M30.144 18.258h-8.93a.712.712 0 0 0-.712.712v2.855c0 .394.318.713.712.713h5.03a6.704 6.704 0 0 1-2.888 3.384l2.142 3.712c3.436-1.987 5.47-5.48 5.47-9.384 0-.558-.041-.956-.121-1.402a.721.721 0 0 0-.703-.59Z" fill="#167EE6" />
      <path d="M20.023 26.822a6.66 6.66 0 0 1-5.76-3.333l-3.713 2.137a10.928 10.928 0 0 0 9.473 5.48c1.988 0 3.858-.534 5.475-1.467v-.005l-2.142-3.712c-.984.572-2.119.9-3.333.9Z" fill="#12B347" />
      <path d="M25.494 29.64v-.006l-2.142-3.712c-.98.567-2.114.9-3.329.9v4.284c1.988 0 3.858-.534 5.47-1.467Z" fill="#0F993E" />
      <path d="M13.363 20.16a6.61 6.61 0 0 1 .9-3.327l-3.713-2.138a10.81 10.81 0 0 0-1.472 5.466c0 1.992.535 3.858 1.472 5.466l3.712-2.138a6.574 6.574 0 0 1-.9-3.328Z" fill="#FFD500" />
      <path d="M20.023 13.5c1.603 0 3.08.572 4.228 1.518a.712.712 0 0 0 .957-.042l2.02-2.02a.718.718 0 0 0-.042-1.05 10.876 10.876 0 0 0-7.163-2.69 10.928 10.928 0 0 0-9.473 5.479l3.712 2.137a6.66 6.66 0 0 1 5.761-3.332Z" fill="#FF4B26" />
      <path d="M24.252 15.018a.712.712 0 0 0 .956-.042l2.02-2.02a.718.718 0 0 0-.042-1.05 10.876 10.876 0 0 0-7.163-2.69V13.5c1.604 0 3.08.567 4.229 1.518Z" fill="#D93F21" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { AuthRepository } from "~/shared/repository/auth.repository";

const runtimeConfig = useRuntimeConfig();

const scriptLoaded = ref(false);
useHead({
  script: [
    {
      src: "https://accounts.google.com/gsi/client",
      tagPosition: "head",
      onload: () => scriptLoaded.value = true,
    },
  ],
});

const client = ref<google.accounts.oauth2.TokenClient>();

watch(scriptLoaded, () => {
  if (!scriptLoaded.value) return;
  client.value = google.accounts.oauth2.initTokenClient({
    client_id: runtimeConfig.public.GoogleId,
    scope: "https://www.googleapis.com/auth/userinfo.email \ https://www.googleapis.com/auth/userinfo.profile \ https://www.googleapis.com/auth/calendar.readonly",
    callback: (response) => {
      AuthRepository.socialAuth({ social_provider: "google", access_token: response.access_token });
    },
  });
});

function handleAuthGoogle() {
  client.value && client.value.requestAccessToken();
}
</script>

<style scoped>

</style>
