<template>
  <div class="max-w-[990px] mx-auto max-md:px-4">
    <div class="pb-16">
      <p
        class="bg-violet-600 w-min whitespace-nowrap h-[70px] text-white flex items-center pl-6 pr-6 text-[40px] font-NeueMachina leading-none max-md:text-2xl max-md:h-auto max-md:w-full max-md:p-4"
      >
        {{ $t("pages.awareness.security.title") }}
      </p>
      <p
        class="bg-black w-min whitespace-nowrap max-md:whitespace-normal h-[70px] text-white flex items-center pl-6 pr-6 text-[40px] font-NeueMachina leading-none max-md:text-2xl max-md:h-auto max-md:w-full max-md:p-4"
      >
        {{ $t("pages.awareness.security.note") }}
      </p>
    </div>
    <div class="grid grid-cols-[minmax(450px,1fr)_485px] tabs gap-16 max-md:block">
      <ul>
        <li
          v-for="(item, idx) in tabsData"
          :key="item.value"
          class="flex justify-between font-normal items-center mb-7"
          :class="{
            'active': activeTabIdx === idx,
            'text-violet-600': activeTabIdx === idx,
          }"
          @click="activeTabIdx = idx"
        >
          {{ $t(`pages.awareness.progamma.${item.value}.title`) }}
          <i v-if="activeTabIdx === idx" class="pi pi-arrow-right text-xl"></i>
        </li>
      </ul>
      <div class="min-h-[535px]">
        <div class="block bg-white rounded-3xl px-11 py-8 w-full shadow-sm relative">
          <div class="relative w-[405px] h-[382px] -mt-[80px] max-md:mt-0 max-sm:w-full [&_svg]:w-full">
            <Transition name="fade">
              <component :is="imageSlide" :key="tabsData[activeTabIdx].value" />
            </Transition>
          </div>
          <div class="relative mt-7 min-h-[100px]">
            <Transition name="fade">
              <p
                :key="tabsData[activeTabIdx].value"
                class="font-inter text-xl text-[#171717]"
              >
                {{ $t(`pages.awareness.progamma.${tabsData[activeTabIdx].value}.note`) }}
              </p>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeTabIdx = ref(0);

const tabsData = [
  {
    label: "pages.awareness.progamma.protection.title",
    value: "protection",
    img: "ProtectionImage",
    note: "pages.awareness.progamma.protection.note",
  },
  {
    label: "Безопасность",
    value: "safety",
    img: "SafetyImage",
    note: "Соблюдение кибергигиены снижает риск заражения компьютера вирусами и вредоносными программами, обеспечивая безопасность ваших устройств и данных.",
  },
  {
    label: "Надежность",
    value: "reliability",
    img: "/images/awareness/reliability.png",
    note: "Правильная кибергигиена помогает укрепить ваши пароли и аккаунты, что делает их менее уязвимыми для взлома.",
  },
  {
    label: "Распознавания",
    value: "recognition",
    img: "/images/awareness/recognition.png",
    note: "Навыки кибергигиены помогают распознавать фишинг и избегать мошенничества в интернете.",
  },
  {
    label: "Ответственность",
    value: "responsibility",
    img: "/images/awareness/responsibility.png",
    note: "Кибергигиена обеспечивает безопасное и ответственное поведение в социальных сетях и онлайн-средах.",
  },
  {
    label: "Производительность",
    value: "efficiency",
    img: "/images/awareness/efficiency.png",
    note: "Практика кибергигиены способствует повышению производительности и снижению стресса при использовании интернета.",
  },
  {
    label: "Обновления",
    value: "updates",
    img: "/images/awareness/updates.png",
    note: "Регулярное обновление программ и операционных систем повышает безопасность вашего устройства.",
  },
];

const imageSlide = computed(() => {
  switch (tabsData[activeTabIdx.value].value) {
    case "safety":
      return defineAsyncComponent(() => import("./basics-cyber-hygiene/SVGSafety.vue"));
    case "reliability":
      return defineAsyncComponent(() => import("./basics-cyber-hygiene/SVGReliability.vue"));
    case "recognition":
      return defineAsyncComponent(() => import("./basics-cyber-hygiene/SVGRecognition.vue"));
    case "responsibility":
      return defineAsyncComponent(() => import("./basics-cyber-hygiene/SVGResponsibility.vue"));
    case "efficiency":
      return defineAsyncComponent(() => import("./basics-cyber-hygiene/SVGEfficiency.vue"));
    case "updates":
      return defineAsyncComponent(() => import("./basics-cyber-hygiene/SVGUpdates.vue"));
    case "protection":
    default: return defineAsyncComponent(() => import("./basics-cyber-hygiene/SVGProtection.vue"));
  }
});
</script>

<style scoped lang="scss">
.tabs {
  li {
    font-size: 40px;
    font-family: 'Neue Machina', sans-serif;
    cursor: pointer;
    line-height: 40px;
    transition: all 0.3s;

    &:hover {
      color: var(--purple-600);
    }
  }
}

@media only screen and (max-width: 600px) {
  .tabs {
    display: block;

    ul {
      display: flex;
      overflow: hidden;
      overflow-x: scroll;
      height: auto;
      padding-bottom: 15px;

      li {
        gap: 15px;
        margin-right: 15px;
        font-size: 24px;
        margin-bottom: 0;
      }
    }

    .block {
      padding: 25px 15px;

      /*   img {
        margin-top: 0;
      } */
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
  position: absolute;
}

.fade-enter-from {
  transform: translateY(30px);
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
