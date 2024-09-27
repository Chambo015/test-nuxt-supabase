<template>
  <div>
    <header class="flex flex-col items-start">
      <TopHeader>
        <p class="font-sfProDisplay text-xl text-white">
          Статья 12
        </p>
      </TopHeader>
      <MainHeader bg-color="secondary" class="">
        Обратная связь
      </MainHeader>
      <div class="bg-black pl-[18px] pr-[34px] py-[14px] text-white max-w-[640px]">
        <p class="font-inter text-sm *:font-inter">
          Для нас важно знать ваше мнение о предоставленной информации. Пожалуйста, ответьте на несколько вопросов, чтобы помочь нам улучшить качество материалов.
        </p>
      </div>
    </header>
    <main class="my-9">
      <div>
        <iframe
          class="flex flex-col"
          frameborder="0"
          height="4700"
          marginheight="0"
          marginwidth="0"
          src="https://docs.google.com/forms/d/e/1FAIpQLSf23x40qPYrUmog0eng2CPK0vTMhtGXHEYFjXHO4cd3la9zEQ/viewform?embedded=true"
          width="100%"
        >Загрузка…</iframe>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import MainHeader from "~/shared/components/headers/MainHeader.vue";
import TopHeader from "~/shared/components/headers/TopHeader.vue";
</script>

<style scoped>
strong {
  font-weight: 700;
}
</style>
