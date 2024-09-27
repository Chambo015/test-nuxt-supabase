<template>
  <ul class="flex gap-6 text-white">
    <li><nuxt-link href="https://www.instagram.com/mssp.global?igsh=MXFieTJma2cyaXkxcw==" target="_blank" external><IconInstagram class="hover:text-yellow-100 transition-colors" /></nuxt-link></li>
    <li><nuxt-link href="https://www.instagram.com/citizensec.global?igsh=c2IzeWZuY2k5N2I4" target="_blank" external><IconInstagram class="hover:text-yellow-100 transition-colors" /></nuxt-link></li>
    <li><nuxt-link href="https://t.me/citizensecbot" target="_blank" external><IconTelegram class="hover:text-yellow-100 transition-colors" /></nuxt-link></li>
    <li><nuxt-link href="https://mssplab.github.io/" target="_blank" external><IconGitHub class="hover:text-yellow-100 transition-colors" /></nuxt-link></li>
  </ul>
</template>
<script setup lang="ts">
import IconGitHub from './social-icons/IconGitHub.vue';
import IconInstagram from './social-icons/IconInstagram.vue';
import IconTelegram from './social-icons/IconTelegram.vue';
</script>
