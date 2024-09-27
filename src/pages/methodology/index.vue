<template>
  <div class="overflow-x-hidden">
    <div class="methodology ">
      <div class="header overflow-hidden pt-24 md:overflow-visible">
        <div class="info relative max-md:px-4">
          <img
            alt="methodology"
            class="head-img"
            :src="backgroundImage"
            width="570"
          />
          <div class="relative">
            <TopHeader>
              <p class="font-NeueMachina text-3xl text-white">
                1.0
              </p>
            </TopHeader>
            <br />
            <MainHeader bg-color="lime" class="md:!text-[100px] !leading-none">
              {{ $t('pages.methodology.title') }}
            </MainHeader>
            <div class="flex flex-col gap-4 bg-black p-5 font-inter *:flex-1 md:pr-10">
              <span class=" text-sm font-normal text-white"> {{ $t('pages.methodology.note_2') }}</span>
              <span class=" text-sm font-normal text-white">
                {{ $t('pages.methodology.note_1') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-[35px] bg-[#E1FFA8] p-6 font-inter max-md:mx-4">
        <div class="bg-white/50 p-[10px]">
          <p class="font-medium">
            {{ $t('pages.methodology.desc') }}
          </p>
          <p class="mt-6 font-medium">
            {{ $t('pages.methodology.subDesc') }}
          </p>
        </div>
        <div class="mt-6 bg-white/50 p-[10px]">
          <p class="text-xs font-light italic">
            {{ $t('pages.methodology.disclaimer') }}
          </p>
        </div>
      </div>
      <div class="mt-14 max-md:px-4">
        <h3
          class="text-11 w-min text-nowrap bg-gray-950 p-4 px-6 font-NeueMachina text-[40px] !leading-none text-white max-md:text-wrap"
        >
          {{ $t('pages.methodology.list_title') }}
        </h3>

        <div class="grid w-full grid-cols-2 max-md:grid-cols-1">
          <div
            v-for="n in METHODOLOGY_ARTICLES"
            :key="n.name"
            class="flex w-full flex-col bg-[#734CC9] p-6 text-white max-md:even:bg-black  md:[&:nth-child(4n-1)]:bg-black md:[&:nth-child(4n-2)]:bg-black"
          >
            <p class="font-NeueMachina text-2xl">
              {{ `${$t('pages.methodology.article')} ${n.name}` }}
            </p>
            <div
              class="mt-6 flex w-full grow flex-col border border-white/50 bg-white/30 px-6 py-8"
            >
              <p class="mb-8 font-NeueMachina text-[20px] font-medium !leading-none">
                {{ $t(n.locale) }}
              </p>
              <NuxtLink
                class="hover-link-effect mt-auto flex items-center self-start font-inter font-semibold"
                :to="n.link"
              >
                {{ $t('actions.moreButton') }} <i class="pi pi-arrow-up ml-3 rotate-45 text-sm"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from "~/shared/components/headers/MainHeader.vue";
import TopHeader from "~/shared/components/headers/TopHeader.vue";
import { METHODOLOGY_ARTICLES } from "~/shared/constants";

/* useHead({
  title: "Методология",
  meta: [
    {
      name: "description",
      content: "Миссия проекта состоит в том, чтобы сделать сложные стандарты ISO понятными и простыми во внедрении и использовании.",
    },
    {
      name: "og:image",
      content: "https://citizensec.kz/methodology-og.jpg",
    },
  ],
}); */
useSeoMeta({
  ogTitle: "1.0 Методология",
  title: "Методология",
  ogDescription: "Миссия проекта состоит в том, чтобы сделать сложные стандарты ISO понятными и простыми во внедрении и использовании.",
  description: "Миссия проекта состоит в том, чтобы сделать сложные стандарты ISO понятными и простыми во внедрении и использовании.",
  ogImage: "https://citizensec.kz/methodology-og.jpg",
  twitterCard: "summary_large_image",
  ogUrl: "https://citizensec.kz/methodology",
  ogImageUrl: "https://citizensec.kz/methodology-og.jpg",
  ogImageSecureUrl: "https://citizensec.kz/methodology-og.jpg",
  ogImageType: "image/jpeg",
  ogImageWidth: 1155,
  ogImageHeight: 480,
});
const { locale } = useI18n();

const backgroundImage = computed(() => `/images/methodology/main-header-methodology_${locale.value}.png`);
</script>

<style scoped lang="scss">
.methodology {
  max-width: 790px;
  margin: auto;
}

.header {
  .head-img {
    position: absolute;
    width: 570px;
    top: -120px;
    right: -40%;
  }
  .info {
    position: relative;
    margin: auto;

    h1,
    h2,
    p {
      font-family: 'Neue Machina', sans-serif;
    }

    h2 {
      padding: 0 15px;
      height: 110px;
      line-height: 110px;
      font-size: 100px;
      background: linear-gradient(
        90deg,
        var(--purple-400) 0%,
        var(--purple-600) 100%
      );
    }
  }
}

.hover-link-effect {
  @apply relative after:absolute after:bg-gray-200 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300;
}
</style>
