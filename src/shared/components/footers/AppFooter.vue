<template>
  <footer class="container relative z-0 px-sidebarWidth max-lg:px-4 mx-auto pt-[70px] max-md:pt-12" :class="[$device.isMobile && 'mb-mobileTabsHeight']">
    <div class="grid grid-cols-[475px_1fr] max-2xl:grid-cols-[370px_1fr] max-xl:grid-cols-1 gap-6">
      <div class="social-links-block rounded-3xl relative overflow-hidden">
        <WaveImage class="absolute top-0 left-0 right-0 max-xl:w-full" />
        <CircleImageFooter class="absolute bottom-0 right-0 max-2xl:opacity-75 max-md:hidden" />
        <div class="pt-[50px] px-10 max-2xl:px-5 max-2xl:pt-8 pb-9 max-2xl:pb-8 flex flex-col gap-10 justify-between h-full relative z-10">
          <BaseIcon color="white" name="logo-title" />
          <ul class="font-inter text-white space-y-6 max-xl:space-y-4">
            <li>
              <NuxtLink class="hover-link-effect" to="/">
                {{ $t('actions.sideBar.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover-link-effect" to="/about">
                {{ $t('actions.sideBar.aboutCompany') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover-link-effect" to="/methodology">
                {{ $t('actions.sideBar.methodology') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover-link-effect" to="/feed">
                {{ $t('actions.sideBar.news') }}
              </NuxtLink>
            </li>
            <!-- <li>
              <NuxtLink class="hover-link-effect">
                {{ $t('actions.sideBar.contacts') }}
              </NuxtLink>
            </li> -->
          </ul>
          <ul class="space-y-1 font-inter text-[10px] leading-tight text-white">
            <li>
              <NuxtLink class="hover:opacity-70" to="/payments">
                Платежи. Оплата банковской картой онлайн
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:opacity-70" to="/offer">
                Договор оферты
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:opacity-70" to="/policy">
                Политика Конфиденциальности
              </NuxtLink>
            </li>
            <li><NuxtLink class="hover:opacity-70" to="/service">Условия предоставления услуг</NuxtLink></li>
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
      <div class=" bg-white rounded-3xl px-[50px] max-2xl:px-5 py-[52px] max-2xl:py-8 max-xl:hidden">
        <IncidentForm :key="$route.fullPath" is-footer />
      </div>
    </div>
    <a href="https://mssp.global" target="_blank" class="text-[#734CC9] block mx-auto font-semibold font-manrope text-center pt-6">
      Powered By MSSP.GLOBAL
    </a>
    <p class="text-center text-black text-xs font-inter py-6">
      Copyright © 2024 CitizenSec. All Rights Reseved.
    </p>
  </footer>
  <IncidentModal v-if="visibleIncidentModal" v-model="visibleIncidentModal" />
</template>

<script setup lang="ts">
import IncidentForm from "../forms/IncidentForm.vue";
import ContainerSocialIcons from "./_ui/ContainerSocialIcons.vue";
import WaveImage from "./_ui/WaveImage.vue";
import CircleImageFooter from "./_ui/CircleImageFooter.vue";
import BaseIcon from "~/shared/components/BaseIcon.vue";
import IncidentModal from "~/shared/components/modals/IncidentModal.vue";

const visibleIncidentModal = ref(false);
</script>

<style scoped>
.social-links-block {
  background: linear-gradient(90deg, #ae89ff 0%, #734cc9 100%);
}
</style>
