<template>
  <div>
    <div>
      <div class="mx-auto max-w-[930px] max-lg:px-4 max-[930px]:overflow-x-hidden">
        <div class="header">
          <div class="info relative ">
            <img aria-hidden="true" class="head-img pointer-events-none absolute select-none" src="@/assets/images/main-header.png" />
            <div class="relative">
              <div class="flex flex-col flex-nowrap items-start justify-center">
                <MainHeader
                  bg-color="primary"
                  class="text-nowrap !leading-[0.85] max-xl:!text-[70px] max-md:!text-4xl max-md:font-bold max-sm:text-wrap"
                  :class="[$i18n.locale === AppLangs.KZ && 'max-w-fit text-[80px]', $i18n.locale === AppLangs.RU && '!text-[100px] max-sm:!text-3xl min-[350px]:!text-nowrap', $i18n.locale === AppLangs.EN && '!text-[90px] max-[430px]:max-w-[270px]']"
                >
                  {{ $t("pages.main.head.title_1") }}
                </MainHeader>
                <MainHeader
                  bg-color="secondary"
                  class="!leading-[0.9] max-xl:!text-[70px] max-md:!text-4xl max-md:font-bold"
                  :class="[$i18n.locale === AppLangs.KZ && 'max-w-[740px] text-[80px] max-[660px]:max-w-[500px]', $i18n.locale === AppLangs.RU && '!text-[100px] max-[675px]:!w-min max-sm:!text-3xl md:!w-min', $i18n.locale === AppLangs.EN && '!text-[90px] max-[905px]:max-w-[570px] max-[500px]:max-w-[320px] xl:text-nowrap']"
                >
                  {{ $t("pages.main.head.title_2") }}
                </MainHeader>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-32 max-md:pt-16">
          <p class="relative text-center font-NeueMachina text-3xl font-medium text-black max-md:text-xl">
            {{ $t('pages.main.partners') }}
          </p>
          <div class="mt-8">
            <InfiniteCarousel />
          </div>
        </div>
        <div class="manager relative pt-24 text-center max-md:pt-16">
          <I18nT keypath="pages.main.manage.title" scope="global" tag="h3">
            <template #newline>
              <br />
            </template>
          </I18nT>
          <p class="mt-5 font-inter text-sm font-light text-gray-600 sm:text-2xl">
            {{ $t("pages.main.manage.note") }}
          </p>
          <LocalizatedLink to="/methodology">
            <Button
              icon="pi pi-arrow-right"
              icon-pos="right"
              :label="$t('actions.moreButton')"
              :pt="{ root: 'px-6 py-4 rounded-[55px] mt-5', label: 'font-inter font-normal mr-4' }"
              severity="contrast"
            />
          </LocalizatedLink>
          <img class="pointer-events-none mt-16 w-full select-none pl-3 pr-2 sm:p-0" loading="lazy" :src="`/images/main/mockup_${$i18n.locale}.png`" />
        </div>
      </div>
    </div>
    <div class="society relative overflow-hidden">
      <div class="z-1 relative mx-auto block max-w-[930px] bg-violet-600 md:flex md:bg-transparent">
        <div class="relative z-[1] w-1/2 p-4 pb-8 pr-10 pt-7 max-md:w-full md:p-0 md:pt-28">
          <h3 class="text-white">
            {{ $t("pages.main.citizens.title") }}
          </h3>
          <p class="mt-5 text-sm font-light text-white sm:text-2xl">
            {{ $t("pages.main.citizens.note") }}
          </p>
          <LocalizatedLink
            class="relative mt-5 flex h-12 w-min items-center justify-center rounded-full border-0 bg-lime-200 px-6 font-bold text-gray-950"
            to="/awareness"
          >
            {{ $t("actions.moreButton") }}
            <i class="pi pi-arrow-right ml-4"></i>
          </LocalizatedLink>
        </div>
        <div class="bg-lime-200 md:w-2/5 md:pt-16">
          <img class="pointer-events-none select-none" loading="lazy" :src="`/images/main/content_${$i18n.locale}.png`" />
        </div>
      </div>
    </div>
    <FeedsSlider />
  </div>
</template>

<script setup lang="ts">
import InfiniteCarousel from "~/shared/components/InfiniteCarousel.vue";
import MainHeader from "~/shared/components/headers/MainHeader.vue";
import { MainSeo } from "~/shared/seo/index";
import { FeedsSlider } from "~/features/feeds/feeds-slider";
import { AppLangs } from "~/shared/enums";
import { LocalizatedLink } from "~/shared/ui";

useSeoMeta(MainSeo);
</script>

<style scoped lang="scss">
.header {
  padding-top: 165px;
  .head-img {
    width: 810px;
    top: -150px;
    left: -15%;
    z-index: 0;
  }
  .info {
    position: relative;
    margin: auto;

    h1,
    h2 {
      font-family: 'Neue Machina', sans-serif;
    }

    // h1 {
    //   padding: 0 15px;
    //   height: 125px;
    //   font-size: 100px;
    //   background: linear-gradient(
    //     90deg,
    //     var(--purple-600) 0%,
    //     var(--purple-400) 100%
    //   );
    // }

    // h2 {
    //   padding: 0 15px;
    //   line-height: 110px;
    //   font-size: 100px;
    //   background: linear-gradient(
    //     90deg,
    //     var(--purple-400) 0%,
    //     var(--purple-600) 100%
    //   );
    // }
  }
}

.manager {
  h3 {
    font-size: 64px;
    font-family: 'Neue Machina', sans-serif;
    color: var(--purple-600);
    line-height: 64px;
  }
}

.society {
  h3 {
    font-size: 64px;
    font-family: 'Neue Machina', sans-serif;
    line-height: 64px;
  }

  img {
    width: 565px;
    max-width: none;
  }

  .btn {
    background: var(--lime-200);
    color: black;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 55%;
    height: 100%;
    background: linear-gradient(
      120deg,
      var(--purple-400) 0%,
      var(--purple-600) 100%
    );
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 45%;
    height: 100%;
    background: var(--lime-200);
  }
}

.course {
  .head {
    h4,
    h4 span {
      font-size: 64px;
      font-family: 'Neue Machina', sans-serif;
    }
  }
}

@media only screen and (max-width: 770px) {
  .header {
    padding-top: 80px;
    .head-img {
      width: 100%;
      left: 0;
    }

    // .info {
    //   h2,
    //   h1 {

    //     margin-right: auto;
    //     margin-left: 16px;
    //     padding: 20px 18px;
    //     height: auto;
    //     font-size: 32px;
    //     line-height: 33px;
    //     font-weight: normal;
    //   }
    // }
  }

  .manager {
    h3 {
      font-size: 32px;
      font-weight: bold;
      line-height: normal;
    }
  }

  .society {
    &:after,
    &:before {
      display: none;
    }

    h3 {
      font-size: 32px;
      line-height: 40px;
      font-weight: bold;
    }

    img {
      width: 100%;
    }
  }
}
</style>
