<template>
  <div>
    <header class="flex flex-col items-start">
      <TopHeader>
        <p class="font-sfProDisplay text-xl text-white">
          Статья 11
        </p>
      </TopHeader>
      <MainHeader bg-color="secondary" class="">
        Полезные ссылки и ресурсы.
      </MainHeader>
      <div class="bg-black pl-[18px] pr-[34px] py-[14px] text-white max-w-[650px]">
        <p class="font-inter text-sm">
          Давайте разбираться, где и какая документация должна быть.
        </p>
      </div>
    </header>
    <main class="my-9">
      <ul class="space-y-4 font-inter">
        <li
          v-for="l in links"
          :key="l.title"
          class="text-xl"
        >
          <a
            class="inline-block relative after-list-arrow"
            :href="l.link"
            target="_blank"
          ><span class="underline underline-offset-2  ">{{ l.title }}</span>
            <!-- <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 25 5 27.5 11.25 27.5Z"
                    stroke="#916AE9"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path
                    d="M13.4258 19.4124L17.8258 14.9999L13.4258 10.5874"
                    stroke="#916AE9"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg> -->
          </a>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
import MainHeader from "~/shared/components/headers/MainHeader.vue";
import TopHeader from "~/shared/components/headers/TopHeader.vue";

const links = [
/*     {
      title: '1. Словарь и терминология ИБ. Сложные вещи простыми словами',
      link: ''
    },
    {
      title: '2. НПА по ИБ',
      link: ''
    },
    {
      title: '3. Стандарты по ИБ',
      link: 'https://www.notion.so/3-471bd35316114cf09b6c7b60c4e59d62'
    }, */
  {
    title: "1. Государственная техническая служба",
    link: "https://sts.kz",
  },
  {
    title: "2. Комитет информационной безопасности",
    link: "https://www.gov.kz/memleket/entities/infsecurity?lang=ru",
  },
  {
    title: "3. MSSP.GLOBAL",
    link: "https://mssp.global/",
  },
];
</script>

<style scoped>
strong {
  font-weight: 700;
}
.after-list-arrow::after {
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='none' viewBox='0 0 30 30'%3e%3cg stroke='%23916AE9' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3e%3cpath d='M11.25 27.5h7.5c6.25 0 8.75-2.5 8.75-8.75v-7.5C27.5 5 25 2.5 18.75 2.5h-7.5C5 2.5 2.5 5 2.5 11.25v7.5C2.5 25 5 27.5 11.25 27.5Z'/%3e%3cpath d='m13.425 19.413 4.4-4.413-4.4-4.412'/%3e%3c/g%3e%3c/svg%3e");
  width: 30px;
  height: 30px;
  margin-left: 10px;
  display: inline-block;
  transform: translateY(5px);
}
</style>
