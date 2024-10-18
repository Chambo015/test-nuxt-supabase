<template>
  <footer class="container relative z-0 mx-auto px-sidebarWidth pt-[70px] max-lg:px-4 max-md:pt-12" :class="[$device.isMobile && 'mb-mobileTabsHeight']">
    <div class="grid grid-cols-[475px_1fr] gap-6 max-2xl:grid-cols-[370px_1fr] max-xl:grid-cols-1">
      <div class="social-links-block relative overflow-hidden rounded-3xl">
        <WaveImage class="absolute inset-x-0 top-0 max-xl:w-full" />
        <CircleImageFooter class="absolute bottom-0 right-0 max-2xl:opacity-75 max-md:hidden" />
        <div class="relative z-10 flex h-full flex-col justify-between gap-10 px-10 pb-9 pt-[50px] max-2xl:px-5 max-2xl:py-8">
          <BaseIcon color="white" name="logo-title" />
          <ul class="space-y-6 font-inter text-white max-xl:space-y-4">
            <li>
              <LocalizatedLink class="hover-link-effect" to="/">
                {{ $t('actions.sideBar.home') }}
              </LocalizatedLink>
            </li>
            <li>
              <LocalizatedLink class="hover-link-effect" to="/about">
                {{ $t('actions.sideBar.aboutCompany') }}
              </LocalizatedLink>
            </li>
            <li>
              <LocalizatedLink class="hover-link-effect" to="/methodology">
                {{ $t('actions.sideBar.methodology') }}
              </LocalizatedLink>
            </li>
            <li>
              <LocalizatedLink class="hover-link-effect" to="/feed">
                {{ $t('actions.sideBar.news') }}
              </LocalizatedLink>
            </li>
          </ul>
          <ul class="space-y-1 font-inter text-[10px] leading-tight text-white">
            <li v-for="item in helpfulLinks" :key="item.link">
              <LocalizatedLink class="hover:opacity-70" :to="item.link">
                {{ item.label }}
              </LocalizatedLink>
            </li>
          </ul>
          <div>
            <ContainerSocialIcons />
          </div>
          <div class="xl:hidden">
            <Button
              :label="$t('actions.noticeIncident')"
              rounded
              severity="warning"
              size="small"
              @click="visibleIncidentModal = true"
            />
          </div>
        </div>
      </div>
      <div class=" rounded-3xl bg-white px-[50px] py-[52px] max-2xl:px-5 max-2xl:py-8 max-xl:hidden">
        <IncidentForm :key="$route.fullPath" is-footer />
      </div>
    </div>
    <a class="mx-auto block pt-6 text-center font-manrope font-semibold text-[#734CC9]" href="https://mssp.global" target="_blank">
      Powered By MSSP.GLOBAL
    </a>
    <p class="py-6 text-center font-inter text-xs text-black">
      Copyright © 2024 CitizenSec. All Rights Reseved.
    </p>
  </footer>
  <IncidentModal v-if="visibleIncidentModal" v-model="visibleIncidentModal" />
</template>

<script setup lang="ts">
import ContainerSocialIcons from "./_ui/ContainerSocialIcons.vue";
import WaveImage from "./_ui/WaveImage.vue";
import CircleImageFooter from "./_ui/CircleImageFooter.vue";
import IncidentForm from "~/shared/components/forms/IncidentForm.vue";
import BaseIcon from "~/shared/components/BaseIcon.vue";
import IncidentModal from "~/shared/components/modals/IncidentModal.vue";
import { LocalizatedLink } from "~/shared/ui";

const visibleIncidentModal = ref(false);

const helpfulLinks = [
  {
    label: "Платежи. Оплата банковской картой онлайн",
    link: "/payments",
  },
  {
    label: "Договор оферты",
    link: "/offer",
  },
  {
    label: "Политика Конфиденциальности",
    link: "/policy",
  },
  {
    label: "Условия предоставления услуг",
    link: "/service",
  },
  {
    label: "Q&A",
    link: "/faq",
  },

];
</script>

<style scoped>
.social-links-block {
  background: linear-gradient(90deg, #ae89ff 0%, #734cc9 100%);
}
</style>
