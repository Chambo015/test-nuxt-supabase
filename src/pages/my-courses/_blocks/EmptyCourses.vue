<template>
  <div class="max-w-[350px] flex flex-col items-center gap-4 font-inter">
    <div class="bg-[#F4EBFF] w-12 h-12 rounded-full flex items-center justify-center border-8 border-[#F9F5FF]">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="shrink-0">
        <path
          stroke="url(#a)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m21 21-3.5-3.5m2.5-6a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z" />
        <defs>
          <linearGradient id="a" x1="3" x2="21" y1="12" y2="12" gradientUnits="userSpaceOnUse">
            <stop stop-color="#AE89FF" />
            <stop offset="1" stop-color="#734CC9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div>
        <p class="font-semibold text-[#101828] text-center">У вас нет курсов</p>
        <p class="text-[#475467] text-sm text-center">Начните изучать наши курсы и отслеживайте прогресс курсов</p>
    </div>
    <button class="mt-6 py-[10px] px-[18px] rounded-lg bg-gradient-to-r from-[#ae89ff] to-[#734cc9] text-white font-inter font-semibold bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 ">Найти курсы</button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
