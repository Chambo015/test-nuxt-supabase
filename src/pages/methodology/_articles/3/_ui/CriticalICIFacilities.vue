<template>
  <div class="font-inter">
    <h2 class="text-2xl font-extrabold text-black">
      Критически важные объекты <span class="text-main-purple">ИКИ</span>
    </h2>
    <div class="flex overflow-hidden mt-10 justify-center max-md:flex-col">
      <div class="pr-[45px] max-md:pr-0 flex flex-col max-md:flex-col-reverse">
        <div class="px-6 py-4 max-md:mt-5 max-md:after:hidden max-md:before:hidden border-black border-2 text-main-purple text-2xl max-xl:text-xl font-black relative after:absolute after:w-[48px] after:left-full after:border-b-2 after:border-black after:h-24 after:bottom-1/2 before:z-10 before:bg-main-bg before:absolute before:left-[calc(100%+2px)] before:-top-[2px] before:w-[60px] before:h-1/2">
          ОСНОВНЫЕ ТРЕБОВАНИЯ:
        </div>
        <div class="flex flex-col gap-3 mt-14 max-md:mt-0 max-md:w-full">
          <div class="border-2 border-main-purple py-4 px-6 flex flex-col items-center">
            <span class="text-[40px] font-black text-main-purple leading-none">4</span>
            <p class="font-semibold text-xl text-center">
              Критерия отнесения объектов
            </p>
          </div>
          <div class="border-2 border-main-purple py-4 px-6 flex flex-col items-center">
            <span class="text-[40px] font-black text-main-purple leading-none">514</span>
            <p class="font-semibold text-xl text-center">
              Критически важных объектов
            </p>
          </div>
        </div>
      </div>
      <ul
        class="[--w-before:45px] space-y-5 max-md:pt-6 max-md:overflow-hidden max-md:ml-4">
        <li class="list-item">
          <div>
            <img src="/images/methodology/3/critical-ICI-facilities/1.png" width="91" height="63" />
            <p>Исполнение единых требований в области ИКТ и обеспечения ИБ</p>
          </div>
          <i class="pi pi-chevron-right arrow"></i>
        </li>
        <li class="list-item">
          <div>
            <img src="/images/methodology/3/critical-ICI-facilities/2.png" width="91" height="63" />
            <p>Подключение к системам мониторинга ИБ ОЦИБ</p>
          </div>
          <i class="pi pi-chevron-right arrow"></i>
        </li>
        <li class="list-item">
          <div>
            <img src="/images/methodology/3/critical-ICI-facilities/3.png" width="91" height="63" />
            <p>Проведение испытаний на соответствение требованиям ИБ</p>
          </div>
          <i class="pi pi-chevron-right arrow"></i>
        </li>
        <li class="list-item">
          <div>
            <img height="63" src="/images/methodology/3/critical-ICI-facilities/4.png" width="91" />
            <p>Передача резервных копий ЭИР на единую платформу резервного хранения ЭИР</p>
          </div>
          <i class="pi pi-chevron-right arrow"></i>
        </li>
        <li class="list-item">
          <div>
            <img height="63" src="/images/methodology/3/critical-ICI-facilities/5.png" width="91" />
            <p>Оповещение НКЦИБ об инцидентах ИБ</p>
          </div>
          <i class="pi pi-chevron-right arrow"></i>
        </li>
      </ul>
    </div>
    <div class="flex justify-center items-center mt-10 max-md:mt-0">
      <SvgMapKazakhstan />
    </div>
    <div class="grid grid-cols-4 max-md:grid-cols-2 gap-2 *:border-2 *:border-[#77AFC7] mt-8 max-md:mt-0">
      <div v-for="item in stats" :key="item.title" class="flex flex-col items-center py-4 px-6">
        <span class="text-[40px] max-md:text-2xl leading-none font-black text-[#77AFC7]">{{ item.count }}</span>
        <p class="text-center text-black font-light">
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgMapKazakhstan from "./SvgMapKazakhstan.vue";

const stats = [
  {
    title: "Гос. услуги",
    count: 230,
  },
  {
    title: "Транспорт",
    count: 64,
  },
  {
    title: "Энергетика",
    count: 33,
  },
  {
    title: "Нефтегаз",
    count: 16,
  },
  {
    title: "Связь и информация",
    count: 98,
  },
  {
    title: "Финансы",
    count: 43,
  },
  {
    title: "Здравоохранение",
    count: 18,
  },
  {
    title: "Промышленность",
    count: 12,
  },
];
</script>

<style scoped>
.arrow {
  @apply text-black absolute left-[var(--w-before)] -translate-x-[calc(100%-4px)] top-1/2 -translate-y-[calc(50%+1px)];
}
.list-item {
  @apply relative before:content-[''] before:border-l-2 before:border-b-2 before:absolute before:w-[var(--w-before)] before:h-[280px] max-md:before:h-[200px] before:border-black before:bottom-1/2 before:left-0 pl-[var(--w-before)]  
}
.list-item > div {
  @apply border-black border-2 px-6 py-4 max-w-[460px] flex items-center
}
.list-item > div > img {
  @apply shrink-0 w-[91px] h-[63px]
}

.list-item > div > p {
  @apply text-xl font-semibold max-xl:text-base
}
</style>
