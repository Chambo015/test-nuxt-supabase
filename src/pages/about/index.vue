<template>
  <div class="grid grid-cols-[1fr_min(100%,990px)_1fr] pb-8 max-xl:grid-cols-[1fr_min(100%,750px)_1fr] max-md:px-4 max-md:pb-mobileTabsHeight">
    <div class="col-span-1 col-start-2 pt-[30px] max-md:pt-10">
      <div class="">
        <h1
          class="bg-headingLinerGradientBg py-5 pl-4 font-NeueMachina text-[100px] font-medium !leading-none text-white max-md:text-[32px]"
        >
          {{ $t("pages.about.head.title") }}
        </h1>
        <!-- <img
          alt=""
          class="w-full max-md:h-[340px] object-cover"
          height="485"
          src="@/assets/images/about.png"
        /> -->
      </div>
    </div>

    <section class="col-span-1 col-start-2 mt-16 space-y-6 text-center font-inter text-xl max-md:mt-10 max-md:text-base">
      <p>
        {{ $t('pages.about.note1') }}
      </p>
      <p>
        {{ $t('pages.about.note2') }}
      </p>
      <p>
        <I18nT keypath="pages.about.note3" scope="global">
          <template #link>
            <a class="text-main-purple" href="mailto:info@citizensec.kz">info@citizensec.kz</a>
          </template>
        </I18nT>
      </p>
    </section>
    <section class="mask-v relative col-span-1 col-start-2 mt-9 h-[var(--h-c)]  overflow-hidden py-8 [--h-c:500px] max-md:[--h-c:350px]">
      <div class=" wrapper absolute left-1/2 top-0 mx-auto w-full text-black  will-change-[top]">
        <h3 class="text-center font-NeueMachina text-4xl font-medium ">
          {{ $t('pages.about.credits') }}
        </h3>
        <div class=" mt-8 space-y-4">
          <div
            v-for="t in team"
            :key="t.title"
            class="flex"
          >
            <p class="w-1/2 shrink-0 pr-5 text-right font-sfProDisplay text-lg font-bold">
              {{ t.title }}
            </p>
            <ul class="w-1/2">
              <li
                v-for="n in t.persons"
                :key="n"
                v-html="n"
              ></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "О нас",
  description: "Мы - MSSP.GLOBAL компания-лидер в сфере кибербезопасности. Поможем защитить ваш бизнес от киберугроз с помощью тестирования на проникновение, анализа уязвимостей, создания системы безопасности и обучения правилам кибербезопасности",
});
const team = [
  {
    title: "Project founders",
    persons: ["Dauren <b>Salipov</b>", "Medet <b>Turin</b>"],
  },
  {
    title: "General sponsor",
    persons: ["<b>MSSP Global</b>"],
  },
  {
    title: "Methodology",
    persons: [
      "Dinmukhamed <b>Jilkaidarov</b>",
      "Vadim <b>Rachinskiy</b>",
      "Talgat <b>Mustagulov</b>",
      "Ali <b>Nurseitov</b>",
      "Ruslan <b>Jansengirov</b>",
    ],
  },
  {
    title: "Design",
    persons: ["Aidana <b>Karabalina</b>", "Yelena <b>Kan</b>"],
  },
  {
    title: "Front-end",
    persons: ["Erbol <b>Tokpayev</b>", "Eraly <b>Aisakhanov</b>", "Temirlan <b>Kuralbayev</b>"],
  },
  {
    title: "Back-end",
    persons: ["Dauren <b>Amirzhanov</b>", "Amir <b>Inkarov</b>", "Murat <b>Brezhikeev</b>", "Medet <b>Turin</b>", "Ayan <b>Satybaldy</b>"],
  },
  {
    title: "Awareness",
    persons: [
      "Dauren <b>Salipov</b>",
      "Medet <b>Turin</b>",
      "Guldana <b>Zhumatay</b>",
      "Aidana <b>Karabalina</b>",
      "Meirzhan <b>Toleutai</b>",
      "Bekzhan <b>Demesin</b>",
      "Yrysty <b>Zhalilkhanova</b>",
      "Rakhima <b>Kunbalayeva</b>",
      "Iliyas <b>Dabyltay</b>",
    ],
  },
  {
    title: "Partners",
    persons: ["<b>BFE</b>", "<b>2600 Qazaqstan</b>", "<b>CloudTek</b>", "<b>Dodger</b>", "<b>Spyleak</b>"],
  },
  {
    title: "Support from government",
    persons: ["<b>MDDIAI and NSC</b>", "<b>STS RK</b>"],
  },
  {
    title: "Information support",
    persons: ["<b>ER10.kz</b>"],
  },
];
/* const settings = {
  itemsToShow: 2,
  snapAlign: "start",
  autoplay: 1500,
};
const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: 3,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
    itemsToShow: 4,
    snapAlign: "start",
  },
  1300: {
    itemsToShow: 5,
    snapAlign: "start",
  },
}; */
</script>

<style scoped lang="scss">
h2 {
  @apply text-[#734CC9] text-[64px] leading-tight font-NeueMachina font-medium max-md:text-[32px];
}

.mask-v {
  -webkit-mask: linear-gradient(
    180deg,
    transparent,
    white 20%,
    white 80%,
    transparent
  );
  mask: linear-gradient(180, transparent, white 20%, white 80%, transparent);
}

.wrapper {
  animation: 60s credits linear infinite;
}
@keyframes credits {
  0% {
    transform: translate(-50%, var(--h-c));
  }
  100% {
    transform: translate(-50%, -100%);
  }
}
</style>

<!-- <section class="mt-[56px] font-sfProDisplay max-md:mt-[32px]">
        <h2 class="">{{ $t('pages.about.proud.title') }}</h2>
        <div class="grid grid-cols-4 gap-x-[60px] mt-11 max-md:mt-6 max-md:grid-cols-1 gap-y-6">
          <div v-for="i in 4" :key="i">
            <h3 class="text-[#10083F] font-bold ">{{ $t(`pages.about.proud.block${i}.title`) }}</h3>
            <p class="mt-3 text-[#10083F]">
              {{ $t(`pages.about.proud.block${i}.note`) }}
            </p>
          </div>
        </div>
      </section> -->
<!--    <section class="mt-[42px] flex justify-between max-md:flex-col">
       <div class="pt-11 max-md:pt-0">
          <h2><span class="text-[#10083F]">{{ $t('pages.about.culture.title.partOne') }}</span>{{ " " + $t('pages.about.culture.title.partTwo') }}</h2>
         <div class="mt-4 max-w-[405px] font-sfProDisplay space-y-5 max-md:text-sm max-md:max-w-full max-md:items-center">
            <p>Добро пожаловать на наш социальный проект, который призван помочь людям лучше понять, как быть безопасными в цифровом мире, и поддержать специалистов по кибербезопасности.</p>
<p>Мы - MSSP.GLOBAL компания-лидер в сфере кибербезопасности. Поможем защитить ваш бизнес от киберугроз с помощью тестирования на проникновение, анализа уязвимостей, создания системы безопасности и обучения правилам кибербезопасности.</p>
<p>Мы всегда рады вашим предложениям <a href="mailto:info@citizensec.kz" class="text-main-purple">info@citizensec.kz</a></p>
         </div>
       </div>
       <div class="w-[460px] shrink-0 max-md:w-screen  max-md:h-[444px] max-md:text-center max-md:mt-7 max-md:-ml-4">
        <img src="@/assets/images/our-culture.png" alt="our-culture" width="460" height="445" class="mx-auto object-cover max-md:h-full">
       </div>
      </section> -->
<!-- <ClientOnly>
        <section class="mt-[42px] max-md:pb-5">
          <h2 class="text-[#111827]">{{ $t('pages.about.team.title') }}</h2>
          <div class="mt-7">
            <VueCarousel v-bind="settings" :breakpoints="breakpoints">
              <VueSlide v-for="slide in 10" :key="slide">
                <div class="!cursor-pointer">
                  <div class="h-[165px] w-[165px] rounded-[21px] overflow-hidden"><img src="https://placehold.co/165x165" alt="" height="165" width="165"></div>
                  <div class="font-sfProDisplay text-sm text-center mt-2">
                    <p class="text-[#111827] font-bold">Лилия</p>
                    <p class="text-[#6B7280]">Middle-manager</p>
                  </div>
                </div>
              </VueSlide>
            </VueCarousel>
          </div>
        </section>
      </ClientOnly> -->
