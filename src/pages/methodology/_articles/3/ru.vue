<template>
    <div>
        <header class="flex flex-col items-start">
          <TopHeader><p class="font-sfProDisplay text-xl text-white">Статья 3</p></TopHeader>
          <MainHeader class="max-w-[900px]" bg-color="primary">Что же такое КВОИКИ?</MainHeader>
          <div class="bg-black pl-[18px] pr-[34px] py-[14px] text-white max-w-[650px]">
            <p class="font-inter text-sm *:font-inter">
              <strong class="font-inter">Критически важные объекты информационно-коммуникационной инфраструктуры (КВОИКИ)</strong> –
              это объекты, нарушение или прекращение функционирования которых приводит к незаконному сбору
              конфиденциальных (защищаемых) сведений, к чрезвычайной ситуации или к значительным негативным последствиям
              для обороны, экономики, отдельных сфер хозяйства или для жизнедеятельности населения.
            </p>
          </div>
        </header>
        <main class="my-[36px]">
          <ConclusionContainer title="ВЫВОД № 10:">
            <template #default>
              <div class="p-8 font-inter max-md:p-4">
                <h2 class="text-[#916AE9] font-extrabold text-[25px] leading-tight">Что могут отнести к КВОИКИ</h2>
                <ul class="list-disc list-inside mt-5">
                  <li>информационные системы</li>
                  <li>технологические платформы</li>
                  <li>аппаратно-программные комплексы</li>
                  <li>серверные помещения (центры обработки данных)</li>
                  <li>сети телекоммуникаций</li>
                  <li>а также системы обеспечения ИБ и их бесперебойного функционирования.</li>
                </ul>
                <div class="mt-10">
                  <!-- <NuxtImg src="/images/methodology/КВОИКИ.png" width="918" height="518" class="mx-auto mt-6" /> -->
                  <CriticalICIFacilities />
                </div>
                <ArticleAlert type="info" title="Примечание:" class="mt-[50px]">
                  <template #default>
                    <p class="text-sm text-black font-inter font-light">
                      Требования к КВОИКИ взяты из <a target="_blank" href="https://adilet.zan.kz/rus/docs/Z1500000418#z68">Закона об информатизации</a>, статья 17, пункт 2-1.<br/> Владелец КВОИКИ,
                      обрабатывающий данные, содержащие охраняемую законом тайну, должен проводить аудит информационной
                      безопасности не реже <strong>одного раза в год</strong>.
                    </p>
                  </template>
                </ArticleAlert>
                <div class="mt-14">
                  <h2 class="text-[25px] leading-tight font-extrabold max-w-[680px]">По каким критериям объекты могут быть включены в перечень <span class="text-[#916AE9]">КВОИКИ</span></h2>
                  <div class="grid grid-cols-2 gap-[35px] mt-10 *:border-2 *:border-[#916AE9] *:p-5 *:flex *:gap-4 max-lg:grid-cols-1">
                   
                    <div>
                      <BaseIcon name="methodology/group" class="shrink-0"  width="45" height="45"  />
                      <div class="">
                        <h3 class="font-bold">Объекты информационно-коммуникационной инфраструктуры, влияющие на непрерывную эксплуатацию особо важных государственных объектов.</h3>
                        <p class="text-[#4F4F4F] text-sm mt-5">К особо важным государственным объектам относятся объекты, нарушение целостности которых может негативно повлиять на безопасность государства, четкую реализацию возложенных на него функций, привести к значительному ущербу экономике, осложнить межгосударственные отношения, а также имеющие важное значение для государства и общества. </p>
                        <p class="text-[#4F4F4F] font-bold italic text-sm">Пример: информационные системы Правительства Республики Казахстан.</p>
                      </div>
                    </div>
  
                    <div>
                      <BaseIcon name="methodology/group" class="shrink-0"  width="45" height="45"  />
                      <div class="">
                        <h3 class="font-bold">Объекты информационно-коммуникационной инфраструктуры, влияющие на непрерывную и безопасную эксплуатацию стратегических объектов, при нарушении функционирования которых будет остановлена деятельность стратегических объектов либо возникает угроза чрезвычайной ситуации техногенного характера.</h3>
                        <p class="text-[#4F4F4F] text-sm mt-5">Стратегические объекты – объекты, имеющие социально-экономическое значение для устойчивого развития казахстанского общества, нанесение ущерба которым может негативно повлиять на состояние национальной безопасности РК, создать угрозу жизни и здоровью граждан.</p>
                        <p class="text-[#4F4F4F] font-bold italic text-sm">Пример: информационные системы Акционерного общества "Национальная атомная компания "Казатомпром”.</p>
                      </div>
                    </div>
  
                    <div>
                      <BaseIcon name="methodology/group" class="shrink-0"  width="45" height="45"  />
                      <div class="">
                        <h3 class="font-bold">Объекты информационно-коммуникационной инфраструктуры, влияющие на непрерывную и безопасную эксплуатацию объектов отраслей экономики, имеющих стратегическое значение, при нарушении функционирования которых будет остановлена деятельность имеющих стратегическое значение объектов отраслей экономики, либо возникает угроза чрезвычайной ситуации техногенного характера.</h3>
                        <p class="text-[#4F4F4F] text-sm mt-5">Объекты отраслей экономики, имеющие стратегическое значение – объекты, относящиеся к отраслям по добыче и переработке топливно-энергетический полезных ископаемых (угля, нефти, газа, урана и металлических руд), машиностроения, космической деятельности, агропромышленного комплекса, водного хозяйства, химической промышленности, транспорта и связи, производству и распределению электроэнергии, а также к отраслям, производящим продукцию военно-промышленного назначения.</p>
                        <p class="text-[#4F4F4F] font-bold italic text-sm">Пример: информационные системы Акционерного общества "Национальная компания "КазМунайГаз”.</p>
                      </div>
                    </div>
  
                    <div>
                      <BaseIcon name="methodology/group" class="shrink-0"  width="45" height="45"  />
                      <div class="">
                        <h3 class="font-bold">Объекты информационно-коммуникационной инфраструктуры, влияющие на обеспечение устойчивого функционирования объекта информатизации "электронного правительства" и иных информационно-коммуникационных услуг, частичное или полное нарушение (прекращение) функционирования которых может привести к незаконному сбору и обработке персональных данных ограниченного доступа и иных сведений, содержащих охраняемую законом тайну, чрезвычайной ситуации социального характера.</h3>
                        <p class="text-[#4F4F4F] text-sm mt-5"></p>
                        <p class="text-[#4F4F4F] font-bold italic text-sm">Пример: Шлюз «электронного правительства».</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="mt-14 max-md:mt-7">В РК предусмотрена система отнесения объектов ИКИ к КВОИКИ.</p>
                <ArticleAlert type="info" title="Примечание:" class="mt-[35px]">
                  <template #default>
                    <p class="text-sm text-black font-inter font-light">
                      Перечень КВОИКИ отсутствует в открытом доступе, так как отнесён к служебной информации.<br/>Чтобы узнать, отнесён ли ваш объект информатизации к КВОИКИ, необходимо обратиться в уполномоченный орган — Комитет по информационной безопасности МЦРИАП РК. Ссылка на <a target="_blank" href="https://eotinish.kz/ru">eOtinish</a>.
                    </p>
                  </template>
                </ArticleAlert>
                <div class="mt-14">
                  <h2 class="text-[25px] leading-tight font-extrabold max-w-[680px]">Процедура отнесения объектов <span class="text-[#916AE9]">ИКИ к  КВОИКИ</span></h2>
                  <div>
                    <KviokiScheme />
                  </div>
                  <ArticleAlert title="Важно отметить" type="warn" bg-color="#916AE9">
                    <p class="text-sm text-white font-inter font-light">
                      Cогласно пункту 50-1 ЕТ Собственники или владельцы КВОИКИ, кроме государственных органов, органов местного самоуправления, государственных юридических лиц, субъектов квазигосударственного сектора, в течение года со дня включения в перечень КВОИКИ создают собственный ОЦИБ и обеспечивают его функционирование или приобретают услуги ОЦИБ у третьих лиц в соответствии с ГК РК, а также обеспечивают взаимодействие его с НКЦИБ.
                    </p>
                  </ArticleAlert>
                </div>
              </div>
            </template>
            <template #conclusion>
              <p class="font-inter text-black">
                Мы разобрались, что КВОИКИ – это объекты, бесперебойная работа которых является критически важной.
                Выяснили, по каким критериям объекты включаются в перечень КВОИКИ, и разобрали процедуру отнесения
                объектов ИКИ к КВОИКИ
              </p>
            </template>
          </ConclusionContainer>
        </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import MainHeader from '~/shared/components/headers/MainHeader.vue';
  import TopHeader from '~/shared/components/headers/TopHeader.vue';
  import ConclusionContainer from '~/pages/methodology/_block/conclusion-container.vue';
  import ArticleAlert from '~/pages/methodology/_block/article-alert.vue';
  import KviokiScheme from './_ui/kvioki-scheme.vue';
  import BaseIcon from '~/shared/components/BaseIcon.vue';
  import CriticalICIFacilities from './_ui/CriticalICIFacilities.vue';
  </script>
  
  <style scoped>
  strong {
    font-weight: 700;
  }
  a {
    @apply underline
  }
  </style>
  