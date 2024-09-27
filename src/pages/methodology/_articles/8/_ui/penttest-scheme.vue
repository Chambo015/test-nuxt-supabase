<template>
  <div
    class="grid grid-cols-6 mt-[53px] max-md:grid-cols-2 *:border-t-2 *:px-5 *:border-[#916AE9] *:pt-[30px] *:pb-[50px] *:relative *:before:size-[50px] *:before:border-[#916AE9] *:before:border-2 *:before:absolute *:before:bg-main-bg *:before:-top-[25px] *:before:left-5 *:before:text-[#916AE9] *:before:text-[25px] *:before:flex *:before:items-center *:before:justify-center *:before:font-extrabold">
    <div
      class="col-span-2 before:content-['1'] order-1 after:bg-main-bg after:left-0 after:absolute after:-top-[25px] after:w-5 after:h-[50px] max-md:border-r-2">
      <p class="text-[#916AE9] font-bold text-lg">Определение целей</p>
      <p class="text-xs">
        Определите цели и ожидания от проведения пентеста. Чёткое понимание того, что вы хотите проверить или защитить,
        поможет специалистам сфокусироваться на ключевых аспектах безопасности вашей информационной системы.
      </p>
    </div>
    <div class="col-span-2 before:content-['2'] order-2 max-md:border-l-2">
      <p class="text-[#916AE9] font-bold text-lg">Подготовка системы</p>
      <p class="text-xs">Перед проведением пентеста убедитесь, что ваша информационная система находится в рабочем состоянии и готова к анализу. Обновите программное обеспечение, убедитесь в правильной настройке защитных механизмов и наличии резервных копий данных.</p>
    
      <svg class="left-arrow max-md:hidden" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg class="right-arrow md:hidden" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div class="col-span-2 border-r-2 before:content-['3'] order-3">
      <p class="text-[#916AE9] font-bold text-lg">Согласование с заинтересованными сторонами</p>
      <p class="text-xs">Обсудите план проведения пентеста с заинтересованными сторонами в вашей организации, такими как руководство, IT-отдел и юридический отдел. Убедитесь, что все заинтересованные стороны понимают цели и ограничения этого процесса.</p>
      <svg class="left-arrow" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div class="col-span-3 max-md:grid-cols-2 before:content-['4'] max-md:order-4 max-md:border-l-2 order-5">
      <p class="text-[#916AE9] font-bold text-lg">Установление ограничений</p>
      <p class="text-xs">
        Определите ограничения и правила проведения пентеста, такие как время проведения, область действия, разрешённые методы и инструменты.
      </p>
      <svg class="right-arrow" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div class="col-span-3 max-md:grid-cols-2 before:content-['5'] max-md:order-5  order-4 ">
      <p class="text-[#916AE9] font-bold text-lg">Анализ результатов</p>
      <p class="text-xs">
        После завершения пентеста проведите анализ полученных результатов совместно с командой специалистов. Оцените выявленные уязвимости и разработайте план действий по их устранению.
      </p>
      <svg class="right-arrow max-md:hidden" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg class="left-arrow md:hidden" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span class="hide-left-border max-md:hidden" />
      <span class="hide-right-border md:hidden" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
svg.left-arrow {
  @apply absolute top-0 -translate-y-[calc(50%+1px)] left-5 -translate-x-full;
}
svg.right-arrow {
  @apply absolute top-0 -translate-y-[calc(50%+1px)] left-[70px] rotate-180;
}
.hide-left-border {
  @apply bg-main-bg left-0 absolute -top-[25px] w-5 h-[50px]
}
.hide-right-border {
  @apply bg-main-bg right-0 absolute -top-[25px] w-[calc(100%-50px-20px)] h-[50px]
}
</style>
