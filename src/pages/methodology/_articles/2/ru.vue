<template>
  <div>
    <header class="flex flex-col items-start">
      <TopHeader><p class="font-sfProDisplay text-xl text-white">Статья 2</p></TopHeader>
      <MainHeader class="max-w-[900px]" bg-color="primary">Кто и почему должен соблюдать</MainHeader>
      <MainHeader class="max-w-[900px]" bg-color="secondary">требования ИБ в РК?</MainHeader>
    </header>
    <main class="my-9">
      <ConclusionContainer title="ВЫВОД № 8:">
        <template #default>
          <div class="p-8 *:font-inter max-md:p-4">
            <p class="text-sm">
              Положения единых требований, относящиеся к сфере обеспечения информационной безопасности,<br />
              <span class="text-[#916AE9] font-bold">обязательны для применения:</span>
            </p>
            <IbScheme />
            <ArticleAlert title="Важный момент" type="warn" class="mt-6">
              <p class="text-sm text-white font-inter font-light">
                Собственники или владельцы объектов информатизации обязаны принимать меры, обеспечивающие
                информационную безопасность.<br />Помимо обязанности государства соблюдать требования информационной
                безопасности, принятие данных мер позволит обеспечить защиту конфиденциальной информации и финансовых
                средств, а также сохранение репутации организации.
              </p>
            </ArticleAlert>
          </div>
        </template>
        <template #conclusion>
          <p class="font-inter text-black">
            Кибербезопасность не просто формальность, а ключевой элемент защиты конфиденциальности, целостности и
            доступности данных. Соблюдение этих требований помогает предотвратить возможный ущерб для организации, её
            клиентов и партнёров, а также способствует поддержанию надёжности и репутации организации.
          </p>
        </template>
      </ConclusionContainer>
      <ConclusionContainer title="ВЫВОД № 9:" class="mt-[75px]">
        <template #default>
          <div class="p-8 max-md:p-4 [&_*]:font-inter">
            <p>В Единых требованиях информация разбита по категориям:</p>
            <ul class="list-disc list-inside mt-6">
              <li>Глава 1. Общие положения</li>
              <li>
                Глава 2. Требования к организации и управлению информатизацией и информационной безопасностью
                <ul class="list-disc list-inside ml-[3ch]">
                  <li>Параграф 1. Требования к информатизации государственного органа</li>
                </ul>
              </li>
              <li>
                Глава 3. Требования к объектам информатизации
                <ul class="list-disc list-inside ml-[3ch]">
                  <li>Параграф 1. Требования к электронным информационным ресурсам и интернет-ресурсам</li>
                  <li>
                    Параграф 2. Требования к разрабатываемому или приобретаемому прикладному программному обеспечению
                  </li>
                  <li>Параграф 3. Требования к информационно-коммуникационной инфраструктуре</li>
                  <li>Параграф 4. Требования к информационной системе</li>
                  <li>Параграф 5. Требования к технологической платформе</li>
                  <li>Параграф 6. Требования к аппаратно-программному комплексу</li>
                  <li>Параграф 7. Требования к сетям телекоммуникаций</li>
                  <li>
                    Параграф 8. Требования к системам бесперебойного функционирования технических средств и
                    информационной безопасности
                  </li>
                </ul>
              </li>
            </ul>
            <p class="mt-6">
              Для ознакомления перейдите по
              <a href="https://adilet.zan.kz/rus/docs/P1600000832" target="_blank">ссылке</a>.
            </p>
            <ArticleAlert type="question" class="my-9">
              <template #title>
                <div class="text-lg font-inter text-white">
                  <p class="font-bold font-inter">Что будет если не соблюдать требования ИБ?</p>
                  <p class="italic font-inter">Поговорим об административной ответственности</p>
                </div>
              </template>
            </ArticleAlert>
            <p>
              Если мы говорим об ответственности за нарушения единых требований, то она предусматривается подпунктом
              2) пункта 1 статьи 641 "Нарушение законодательства РК об информатизации" Кодекса РК от 5 июля 2014 года
              № 235-V ЗРК
              <a href="https://adilet.zan.kz/rus/docs/K1400000235#:~:text=2" target="_blank">“Об административных правонарушениях”</a>.
            </p>
            <p class="mt-5">Данный вид нарушений в РК влечёт штраф на физических лиц и организаций в размере:</p>
            <ul class="list-disc list-outside mt-5 ml-5">
              <li>Для должностных лиц (работников) штраф составляет <b>10 месячных расчетных показателей</b>;</li>
              <li>
                Для субъектов малого предпринимательства или некоммерческих организаций —
                <b>15 месячных расчетных показателей</b>;
              </li>
              <li>Для субъектов среднего предпринимательства — <b>30 месячных расчетных показателей</b>;</li>
              <li>Для субъектов крупного предпринимательства — <b>100 месячных расчетных показателей</b>.</li>
            </ul>
            <!-- <div class="mt-5">
              <NuxtImg
                src="/images/methodology/information-security.png"
                width="930"
                height="466"
                class="max-w-[930px] mx-auto max-xl:max-w-full"
                alt="information-security" />
            </div> -->
          </div>
        </template>
        <template #conclusion>
          <p class="font-inter text-black">
            Мы с вами рассмотрели основной документ, который является настольной книгой для руководителя организации и
            лиц, ответственных за обеспечение кибербезопасности и применение информационно-коммуникационных технологий
            в организации.
          </p>
        </template>
      </ConclusionContainer>
    </main>
  </div>
</template>

<script setup lang="ts">
import IbScheme from "./_ui/ib-scheme.vue";
import MainHeader from "~/shared/components/headers/MainHeader.vue";
import TopHeader from "~/shared/components/headers/TopHeader.vue";
import ArticleAlert from "~/pages/methodology/_block/article-alert.vue";
import ConclusionContainer from "~/pages/methodology/_block/conclusion-container.vue";
</script>

<style scoped>
a {
  @apply underline;
}
</style>
