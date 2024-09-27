<template>
  <div class="grid grid-cols-4 max-md:grid-cols-1 mt-[53px] *:border-t-2 *:max-md: *:px-5 *:border-[#916AE9] *:pt-[30px] *:pb-[50px] *:relative *:before:size-[50px] *:before:border-[#916AE9] *:before:border-2 *:before:absolute *:before:bg-main-bg *:before:-top-[25px] *:before:left-5 *:before:text-[#916AE9] *:before:text-[25px] *:before:flex *:before:items-center *:before:justify-center *:before:font-extrabold ">
    <div class=" before:content-['1'] order-1 max-md:border-r-2">
      <p class="text-[#916AE9] font-bold text-lg">Запрос от КИБ</p>
      <p class="text-xs">
        Комитет по информационной безопасности (КИБ) направляет запрос потенциальным КВОИКИ не <b>позднее 1 февраля.</b>
      </p>
      <span class="hide-left-border" />
    </div>
    <div class="col-span-2 max-md:col-span-1 before:content-['2'] order-2 max-md:border-l-2 ">
      <p class="text-[#916AE9] font-bold text-lg">Ответ на запросы</p>
      <ul class="list-disc list-inside text-xs">
        <li>
          Не позднее <b>1 марта</b> собственники/владельцы объектов ИКИ, а также Комитет национальной безопасности (КНБ),
          Министерство обороны (МО) и Министерство по чрезвычайным ситуациям (МЧС) направляют свои ответы и предложения
          в КИБ для рассмотрения включения, исключения или изменения статуса объектов.
        </li>
        <li>
          Примечание: органы национальной безопасности, обороны и гражданской защиты имеют право без согласия
          собственников/владельцев объектов ИКИ вносить предложения о включении, исключении или изменении статуса
          объектов.
        </li>
      </ul>
      <svg class="left-arrow max-md:hidden" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="right-arrow md:hidden" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class=" border-r-2  before:content-['3'] order-3">
      <p class="text-[#916AE9] font-bold text-lg">Сбор предложений</p>
      <p class="text-xs">
        КИБ собирает все документы и предложения (ответы на запросы)
      </p>
      <svg class="left-arrow" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="before:content-['4']  col-span-2 order-5 max-md:order-4 max-md:col-span-1 max-md:border-l-2">
      <p class="text-[#916AE9] font-bold text-lg">Формирование комиссии</p>
      <p class="text-xs">
        КИБ формирует комиссию, состоящую из председателя, секретаря и членов комиссии. Число членов комиссии должно быть не менее 5 человек и включать представителей уполномоченных органов и профильных общественных объединений.
      </p>
      <svg class="right-arrow" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="before:content-['5']  border-l-2 col-span-2 max-md:col-span-1 order-4 max-md:order-5 max-md:border-l-0 max-md:border-r-2">
      <p class="text-[#916AE9] font-bold text-lg">Заседание комиссии</p>
      <p class="text-xs">
        Комиссия проводит заседание, на котором формируется протокол о включении, исключении или изменении статуса объектов. На основании протокола комиссия <b>до 1 августа</b> формирует и утверждает перечень соответствующим актом.
      </p>
      <svg class="left-arrow md:hidden" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="right-arrow max-md:hidden" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="before:content-['6']   col-span-2 max-md:col-span-1 order-6 max-md:border-l-2">
      <p class="text-[#916AE9] font-bold text-lg">Уведомление собственников</p>
      <p class="text-xs">
        В течение одного месяца со дня утверждения перечня, КИБ направляет уведомление собственникам (владельцам) объектов, отнесённых к КВОИКИ, об отнесении объекта к КВОИКИ.
      </p>
      <svg class="left-arrow max-md:hidden" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="right-arrow md:hidden" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="before:content-['7']   col-span-2 order-7 max-md:col-span-1">
      <p class="text-[#916AE9] font-bold text-lg">Право на обжалование</p>
      <p class="text-xs">
        Собственник (владелец) объекта, отнесённого к КВОИКИ, в случае несогласия с отнесением имеет право внести на рассмотрение в КИБ предложение по исключению объекта из перечня с приложением документов и иных обосновывающих материалов согласно правилам, либо обратиться в суд в установленном законодательством Республики Казахстан порядке.
      </p>
      <svg class="left-arrow" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L8 8L1 15" stroke="#916AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="hide-right-border"></span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped >
svg.left-arrow {
  @apply absolute top-0 -translate-y-[calc(50%+1px)] left-5 -translate-x-full 
}
svg.right-arrow {
  @apply absolute top-0 -translate-y-[calc(50%+1px)] left-[70px] rotate-180 
}
.hide-left-border {
  @apply bg-main-bg left-0 absolute -top-[25px] w-5 h-[50px]
}
.hide-right-border {
  @apply bg-main-bg right-0 absolute -top-[25px] w-[calc(100%-50px-20px)] h-[50px]
}
</style>
