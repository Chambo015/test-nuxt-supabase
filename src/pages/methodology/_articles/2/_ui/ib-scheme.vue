<template>
  <div class="relative inline-flex mt-3">
    <span class="absolute w-[calc(50%+20px)] max-xl:w-[calc(50%+12px)] bg-main-purple h-0.5" />
    <svg class="absolute -top-[9px] left-1/4" width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.74286 0L18 9H0L8.74286 0Z" fill="#916AE9"/>
    </svg>
    <ul
      class="[--w-before:45px] max-xl:[--w-before:35px] overflow-hidden flex flex-col gap-x-10 max-xl:gap-x-6 max-h-[270px] max-xl:max-h-[340px] max-md:max-h-[400px] max-sm:max-h-max *:w-[calc(50%-20px)] *:max-sm:w-full flex-wrap pt-5 space-y-5 *:relative max-w-[830px] *:before:border-l-2 *:before:border-b-2 *:before:absolute *:before:w-[var(--w-before)] *:before:h-[140px] *:max-md:before:h-[200px] *:before:border-main-purple *:before:bottom-1/2 *:before:left-0 *:pl-[var(--w-before)]">
      <li><p>государственными органами</p><i class="pi pi-chevron-right arrow "></i></li>
      <li><p>органами местного самоуправления</p><i class="pi pi-chevron-right arrow "></i></li>
      <li><p>государственными юридическими лицами</p><i class="pi pi-chevron-right arrow "></i></li>
      <li><p>субъектами квазигосударственного сектора</p><i class="pi pi-chevron-right arrow "></i></li>
      <li>
        <p>
          собственниками и владельцами негосударственных информационных систем, интегрируемых с информационными
          системами государственных органов или предназначенных для формирования государственных электронных
          информационных ресурсов
        </p>
        <i class="pi pi-chevron-right arrow "></i>
      </li>
      <li>
        <p>собственниками и владельцами критически важных объектов информационно-коммуникационной инфраструктуры</p>
        <i class="pi pi-chevron-right arrow "></i>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
p {
  @apply rounded-[3px] border-2 border-main-purple p-[10px] font-inter font-bold text-xs text-[#333333];
}
.arrow {
 @apply text-main-purple absolute left-[var(--w-before)] -translate-x-[calc(100%-4px)] top-1/2 -translate-y-[calc(50%+1px)]
}
</style>
