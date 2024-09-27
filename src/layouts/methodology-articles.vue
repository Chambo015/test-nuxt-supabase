<template>
  <div
    class="container pl-sidebarWidth max-lg:pl-0 max-md:!px-4 "
  >
    <slot></slot>
    <template v-if="userStore.isLoggedIn">
      <SpeedDial
        v-if="$device.isDesktop"
        class="!fixed bottom-5 right-5 !z-30 !items-end 2xl:bottom-[100px] 2xl:right-[200px]"
        :class="[visibleFAB ? 'pointer-events-auto' : 'pointer-events-none']"
        direction="up"
        mask
        mask-class="!fixed !inset-0 !z-20"
        :model="items"
        :pt="{
          menu: {
            class: ['!items-end', visibleFAB ? 'pointer-events-auto' : 'pointer-events-none'],
          },
          menuitem: {
            class: 'max-2xl:my-0.5',
          },
        }"
        :pt-options="{ mergeSections: true, mergeProps: true }"
        :visible="visibleFAB"
        @hide="visibleFAB = false"
        @show="visibleFAB = true"
      >
        <template #button="props">
          <button
            class="btn pointer-events-auto max-w-[220px] rounded-[53px] px-6 py-4 text-center font-inter text-xl font-bold !leading-none text-white transition-transform active:scale-95 max-xl:max-w-[180px] max-xl:px-4 max-xl:py-3 max-xl:text-base"
            @click="props.toggleCallback"
          >
            Все статьи методологии
          </button>
        </template>
        <template #item="props">
          <button
            class="rounded-[53px]  border-2 border-main-purple px-5 py-[10px] font-inter text-sm text-black transition-all hover:bg-main-purple hover:text-white max-2xl:px-3 max-2xl:py-1.5 max-2xl:text-xs"
            :class="[props.item.link === $route.path ? 'bg-main-purple text-white' : 'bg-white']"
            @click="props.onClick"
          >
            {{ props.item.label }}
          </button>
        </template>
      </SpeedDial>
      <template v-else>
        <button
          class="btn fixed bottom-mobileTabsHeight right-5 z-10 max-w-[220px] -translate-y-2 rounded-[53px] px-6 py-4 text-center font-inter text-xl font-bold !leading-none text-white transition-transform active:scale-95 max-xl:max-w-[180px] max-xl:px-4 max-xl:py-3 max-xl:text-base "
          @click="visibleModal = true"
        >
          Все статьи методологии
        </button>
        <Dialog
          v-model:visible="visibleModal"
          dismissable-mask
          :draggable="false"
          header="Состав методологии"
          modal
          position="bottom"
          :pt="{
            content: {
              class: '!px-2 !pt-2',
            },
          }"
          :style="{ marginBottom: '20px', width: '98vw' }"
        >
          <ul class="flex flex-col-reverse items-start gap-2">
            <li v-for="item in items" :key="item.label">
              <button
                class="rounded-[50px] border border-main-purple px-4 py-2 text-left text-sm"
                :class="[item.link === $route.path ? 'bg-main-purple text-white' : 'bg-white']"
                @click="item.command(); visibleModal = false"
              >
                {{ item.label }}
              </button>
            </li>
          </ul>
        </Dialog>
      </template>

      <div class="fixed bottom-5 left-sidebarWidth z-30 space-x-6 max-md:bottom-mobileTabsHeight max-md:left-5 max-md:-translate-y-2 2xl:bottom-[100px] ">
        <button
          v-tooltip.left="{
            value: paginationArrow.left?.label,
            disabled: false,
            pt: {
              text: '!bg-[#916AE9] font-medium !text-white !p-2 !font-NeueMachina text-xs',
              root: '!bg-transparent !shadow-none max-w-[150px]',
              icon: '!border-[#916AE9] !border-l-[#916AE9] !border-b-[#916AE9]',
            },
          }"
          class="rounded-full border border-white bg-main-purple p-6 opacity-40 transition-all  max-xl:p-4"
          :class="!paginationArrow.left ? '' : 'hover:opacity-100'"
          data-side="left"
          :disabled="!paginationArrow.left"
          @click="paginationArrow.left && paginationArrow.left.command()"
        >
          <svg
            class="rotate-180"
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#direct-right__a)">
              <path d="m2.71 17.02 1.74-3.48c.48-.97.48-2.1 0-3.07L2.71 6.98C1.22 4 4.43.85 7.38 2.41l1.54.82c.22.11.39.29.48.51l5.69 12.65c.23.52.02 1.13-.48 1.39l-7.24 3.81C4.43 23.15 1.22 20 2.71 17.02Zm13.6-1.42-3.73-8.28c-.42-.93.58-1.87 1.48-1.39l5.77 3.04c2.45 1.29 2.45 4.79 0 6.08l-2.04 1.07c-.55.28-1.22.05-1.48-.52Z" fill="#fff" />
            </g>
            <defs>
              <clipPath id="direct-right__a">
                <path d="M0 0h24v24H0z" fill="#fff" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button
          v-tooltip="{
            value: paginationArrow.right?.label,
            disabled: false,
            pt: {
              text: '!bg-[#916AE9] font-medium !text-white !p-2 !font-NeueMachina text-xs',
              root: '!bg-transparent !shadow-none max-w-[150px]',
              icon: '!border-[#916AE9] !border-t-[#916AE9] !border-b-[#916AE9]',
            },
          }"
          class="rounded-full border border-white bg-main-purple p-6 opacity-40 transition-all max-xl:p-4"
          :class="!paginationArrow.right ? '' : 'hover:opacity-100'"
          data-side="right"
          :disabled="!paginationArrow.right"
          @click="paginationArrow.right && paginationArrow.right.command()"
        >
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#direct-right__a)">
              <path d="m2.71 17.02 1.74-3.48c.48-.97.48-2.1 0-3.07L2.71 6.98C1.22 4 4.43.85 7.38 2.41l1.54.82c.22.11.39.29.48.51l5.69 12.65c.23.52.02 1.13-.48 1.39l-7.24 3.81C4.43 23.15 1.22 20 2.71 17.02Zm13.6-1.42-3.73-8.28c-.42-.93.58-1.87 1.48-1.39l5.77 3.04c2.45 1.29 2.45 4.79 0 6.08l-2.04 1.07c-.55.28-1.22.05-1.48-.52Z" fill="#fff" />
            </g>
            <defs>
              <clipPath id="direct-right__a">
                <path d="M0 0h24v24H0z" fill="#fff" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const userStore = useAuthStore();

const visibleModal = ref(false);
const visibleFAB = ref(false);

const items = ref(
  [
    {
      label: "1. Что такое информационная безопасность и какие документы ее регулируют?",
      link: "/methodology/1",
      command() {
        router.push(this.link);
      },
    },
    {
      label: "2. Кто и почему должен соблюдать требования ИБ в РК?",
      link: "/methodology/2",
      command: () => {
        router.push("/methodology/2");
      },
    },
    {
      label: "3. Что же такое КВОИКИ?",
      link: "/methodology/3",
      command: () => {
        router.push("/methodology/3");
      },
    },
    {
      label: "4. Чем занимается Подразделение по ИБ?",
      link: "/methodology/4",
      command: () => {
        router.push("/methodology/4");
      },
    },
    {
      label: "5. Что такое ОЦИБ, зачем и кому нужен?",
      link: "/methodology/5",
      command: () => {
        router.push("/methodology/5");
      },
    },
    {
      label: "6. Что такое испытания на соответствие требованиям ИБ, кто их проводит и кому нужно проходить?",
      link: "/methodology/6",
      command: () => {
        router.push("/methodology/6");
      },
    },
    {
      label: "7. Что такое аудит информационных систем, кто проводит и кому нужно проходить?",
      link: "/methodology/7",
      command: () => {
        router.push("/methodology/7");
      },
    },
    {
      label: "8. Что такое инструментальное обследование компонентов ИС?",
      link: "/methodology/8",
      command: () => {
        router.push("/methodology/8");
      },
    },
    {
      label: "9. Что такое реестр доверенного программного обеспечения?",
      link: "/methodology/9",
      command: () => {
        router.push("/methodology/9");
      },
    },
    {
      label: "10. Что такое оценочный уровень доверия или соответствие",
      link: "/methodology/10",
      command: () => {
        router.push("/methodology/10");
      },
    },
    {
      label: "11. Полезные ссылки и ресурсы",
      link: "/methodology/11",
      command: () => {
        router.push("/methodology/11");
      },
    },
    {
      label: "12. Обратная связь",
      link: "/methodology/12",
      command: () => {
        router.push("/methodology/12");
      },
    },
  ].reverse(),
);

const paginationArrow = computed(() => {
  const data = [...items.value].reverse();
  const currentIdx = data.findIndex(i => i.link === route.path);
  return {
    left: currentIdx < 1 ? null : data[currentIdx - 1],
    right: currentIdx + 1 >= data.length ? null : data[currentIdx + 1],
  };
});
</script>

<style scoped>
.btn {
  box-shadow:
    inset 0px -3px 1px 0 rgb(0 0 0 / 15%),
    inset 0px 9px 3px 0 rgba(255, 255, 255, 0.05);
  background: #916ae9;
}
</style>
