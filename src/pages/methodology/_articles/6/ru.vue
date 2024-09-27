<template>
  <div>
    <header class="flex flex-col items-start ">
      <TopHeader><p class="font-sfProDisplay text-xl text-white">Статья 6</p></TopHeader>
      <MainHeader class="" bg-color="primary">Что такое испытания на соответствие требованиям ИБ,</MainHeader>
      <MainHeader class="" bg-color="secondary">кто их проводит и кому нужно проходить?</MainHeader>
      <div class="bg-black pl-[18px] pr-[34px] py-[14px] text-white max-w-[650px]">
        <p class="font-inter text-sm">
          Испытания на соответствие требованиям ИБ - организационно-технические мероприятия по определению состояния
          защищенности объектов информатизации, а также их соответствия требованиям информационной безопасности,
          предусмотренные в технической документации, нормативных правовых актах Республики Казахстан и действующих на
          территории Республики Казахстан стандартов.
        </p>
      </div>
    </header>
    <main class="my-9">
      <ConclusionContainer title="ВЫВОД № 13:">
        <template #default>
          <div class="font-inter p-8 max-md:p-4">
            <p class="[&>a]:underline">
              При проведении испытаний на соответствие требованиям ИБ аккредитованные лаборатории руководствуются
              <a class="underline" href="https://adilet.zan.kz/rus/docs/V1900018795" target="_blank">
                Приказом Министра цифрового развития, оборонной и аэрокосмической промышленности Республики Казахстан
                от 3 июня 2019 года № 111/НҚ “Об утверждении методики и правил проведения испытаний объектов
                информатизации "электронного правительства" и информационных систем, отнесенных к критически важным
                объектам информационно-коммуникационной инфраструктуры, на соответствие требованиям информационной
                безопасности”</a>.
            </p>
            <ArticleAlert type="question" class="mt-20 max-md:mt-10">
              <template #title>
                <p class="text-lg text-white font-inter font-bold">Кто в РК проводит испытания?</p>
              </template>
            </ArticleAlert>
            <ol class="list-decimal list-inside mt-3 ml-16 max-md:ml-10">
              <li>Частная испытательная лаборатория, аккредитованная на данный вид работы.</li>
              <li>АО “Государственная техническая служба”.</li>
            </ol>
            <ArticleAlert type="question" class="mt-14">
              <template #title>
                <p class="text-lg text-white font-inter font-bold">В чем между ними разница?</p>
              </template>
            </ArticleAlert>
            <p class="mt-3 ml-16 max-md:ml-10">
              Если информационная система принадлежит госоргану или создана для госоргана, то необходимо проходить
              испытания в <strong>АО «Государственная техническая служба» (ГТС).</strong> В иных случаях испытания
              допускается проводить в <strong>частных испытательных лабораториях.</strong>
            </p>
            <ArticleAlert type="question" class="mt-14">
              <template #title>
                <p class="text-lg text-white font-inter font-bold">
                  Какие объекты информатизации должны проходить испытания?
                </p>
              </template>
            </ArticleAlert>
            <ol class="list-decimal list-outside mt-3 ml-20 max-md:ml-10">
              <li>
                Программное обеспечение (программный продукт), созданное и (или) размещённое на
                информационно-коммуникационной платформе «электронного правительства».
              </li>
              <li>Информационно-коммуникационная платформа «электронного правительства».</li>
              <li>
                Интернет-ресурс госоргана, государственного юридического лица, субъекта квазигосударственного сектора.
              </li>
              <li>
                Информационная система госоргана, государственного юридического лица, субъекта квазигосударственного
                сектора.
              </li>
              <li>Критически важные объекты информационно-коммуникационной инфраструктуры (КВОИКИ).</li>
              <li>
                Негосударственная информационная система, предназначенная для формирования государственных электронных
                информационных ресурсов, осуществления государственных функций и оказания государственных услуг.
              </li>
            </ol>
            <div>
              <h2 class="text-[25px] font-extrabold text-center mt-16">
                <span class="text-main-purple">Проведение испытания</span> включает следующие виды работ:
              </h2>
              <div class="grid grid-cols-6 gap-6 mt-9 max-md:grid-cols-2">
                <div
                  v-for="item in conductingTest"
                  :key="item.title"
                  class="p-5 border-2 border-main-purple col-span-2 [&:nth-child(4)]:col-span-3 max-md:[&:nth-child(4)]:col-span-2 max-md:[&:nth-child(5)]:col-span-2 [&:nth-child(5)]:col-span-3">
                  <p class="font-bold text-main-purple">{{ item.title }}</p>
                  <p class="text-xs mt-4">{{ item.note }}</p>
                </div>
              </div>
              <ArticleAlert
                type="info"
                title="Испытания проводятся с использованием специализированных программных средств."
                class="mt-[38px]">
              </ArticleAlert>
              <p class="text-center mx-auto max-w-[830px] mt-9">
                Краткое описание проводимых работ в рамках испытаний, к которым следует основательно подготовиться,
                можно найти <a href="https://adilet.zan.kz/rus/docs/V1900018795" target="_blank" class="underline"
                  >здесь</a
                >. Результаты испытаний оформляются соответствующими протоколами (отрицательными/положительными) по
                каждому виду работ.
              </p>
              <ArticleAlert type="warn" title="Важная информация" class="mt-[38px]">
                <template #default>
                  <p class="text-white text-sm font-light">
                    Ввод в промышленную эксплуатацию объекта информатизации возможен только <strong class="font-bold"
                      >при наличии протоколов испытаний с положительными результатами на соответствие требованиям
                      информационной безопасности.</strong
                    >
                  </p>
                </template>
              </ArticleAlert>
              <div>
                <h2 class="text-[25px] font-extrabold text-center mt-16">
                  <span class="text-main-purple">Где пройти испытания: </span><br />в частной лаборатории или в ГТС?
                </h2>
                <form @submit="handleSubmit" class="border-[3px] border-main-purple rounded-[20px] mt-8 flex max-lg:flex-col">
                  <div
                    class="w-[70%] shrink-0 border-[3px] -my-[3px] lg:-ml-[3px] border-main-purple rounded-[20px] p-[30px] max-lg:w-auto max-lg:-mx-[3px] max-lg:p-5">
                    <h4 class="text-main-purple font-bold">Ответьте на следующие вопросы:</h4>
                    <ol class="list-decimal ml-4 text-sm font-medium space-y-[30px] mt-6">
                      <li>
                        <p>Владелец объекта информатизации - государственный орган* ?</p>
                        <div class="flex gap-8 items-center mt-2">
                          <CustomRadioButton id="1" label="Да" v-model="ownerOfInformatization" value="Yes" />
                          <CustomRadioButton id="2" label="Нет" v-model="ownerOfInformatization" value="No" />
                        </div>
                      </li>
                      <li>
                        <p>Собственник объекта информатизации - государственный орган* ?</p>
                        <div class="flex gap-8 items-center mt-2">
                          <CustomRadioButton id="3" label="Да" v-model="ownerOfInformatizationFacility" value="Yes" />
                          <CustomRadioButton id="4" label="Нет" v-model="ownerOfInformatizationFacility" value="No" />
                        </div>
                      </li>
                      <li>
                        <p>Заказчиком** объекта информатизации (через услугу или товар) - государственный орган* ?</p>
                        <div class="flex gap-8 items-center mt-2">
                          <CustomRadioButton id="5" label="Да" v-model="customerOfInformatization" value="Yes" />
                          <CustomRadioButton id="6" label="Нет" v-model="customerOfInformatization" value="No" />
                        </div>
                      </li>
                    </ol>
                    <p class="font-medium text-[10px] text-[#949494] italic mt-10">
                      * государственный орган - министерство, акимат или их территориальные подразделения
                      (департаменты)
                    </p>
                    <p class="font-medium text-[10px] text-[#949494] italic">
                      ** заказчик - представляет собой лицо или организацию, которая заказывает определенные услуги
                      или товары у другой стороны, известной как исполнитель или поставщик. 
                    </p>
                  </div>
                  <div class="grow flex items-center flex-col justify-center max-lg:p-4">
                    <p class="font-bold text-center max-w-[200px] leading-none">Вы должны пройти испытание в:</p>
                    <div class="mt-8">
                      <p v-if="resultTest" class="text-center text-lg font-medium leading-tight">{{ resultTest }}</p>
                      <button v-else class="bg-[#7F56D9] font-semibold py-[10px] px-[30px] rounded-lg text-white">
                        Узнать результат
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </template>
        <template #conclusion>
          <p class="font-inter text-black">
            Мы узнали, что такое испытания на соответствие требованиям ИБ, и ознакомились с процессом их проведения.
            Это важный шаг для организаций, позволяющий обеспечить безопасность ваших систем.
          </p>
        </template>
      </ConclusionContainer>
    </main>
  </div>
</template>

<script setup lang="ts">
import CustomRadioButton from "./_ui/CustomRadioButton.vue";
import MainHeader from "~/shared/components/headers/MainHeader.vue";
import TopHeader from "~/shared/components/headers/TopHeader.vue";
import ArticleAlert from "~/pages/methodology/_block/article-alert.vue";
import ConclusionContainer from "~/pages/methodology/_block/conclusion-container.vue";

const conductingTest = [
  {
    title: 'Анализ исходных кодов',
    note: 'Проводится с целью выявления недостатков программного обеспечения (ПО).',
  },
  {
    title: 'Испытание функций ИБ',
    note: 'Осуществляется с целью оценки их соответствия требованиям технической документации, нормативных правовых актов РК и действующих стандартов по ИБ.',
  },
  {
    title: 'Нагрузочное испытание',
    note: 'Проводится с целью оценки соблюдения доступности, целостности и конфиденциальности объекта испытаний.',
  },
  {
    title: 'Обследование сетевой инфраструктуры',
    note: 'Проводится с целью оценки уровня защищенности и безопасности сетевой инфраструктуры.',
  },
  {
    title: 'Обследование процессов обеспечения ИБ',
    note: 'Осуществляется с целью определения их соответствия требованиям нормативных правовых актов и стандартов в сфере ИБ.',
  },
];

type Answer = "Yes" | "No";
const ownerOfInformatization = ref<Answer>("No");
const ownerOfInformatizationFacility = ref<Answer>("No");
const customerOfInformatization = ref<Answer>("No");
const resultTest = ref<string | null>(null);

function handleSubmit(e: Event) {
  e.preventDefault();
  if (
    ownerOfInformatization.value === "No"
    && ownerOfInformatizationFacility.value === "No"
    && customerOfInformatization.value === "No"
  ) {
    resultTest.value = "частной испытательной лаборатории";
  } else {
    resultTest.value = "ГТС";
  }
}

watch([ownerOfInformatization, ownerOfInformatizationFacility, customerOfInformatization], () => {
  resultTest.value = null;
});
</script>

<style scoped>
a {
  text-decoration-line: underline;
}
</style>
