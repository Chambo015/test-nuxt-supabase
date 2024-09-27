<template>
  <Transition appear name="fade">
    <div v-if="show" class="fixed bottom-mobileTabsHeight left-1/2 z-10 w-[min(650px,95%)] -translate-x-1/2 max-md:pr-20">
      <div class=" bg-[#DCFF98] px-6 py-[14px] max-md:p-2">
        <div class="flex flex-col items-center justify-center bg-white/50 px-6 py-2 max-md:px-1">
          <p class="text-center font-inter font-semibold text-black max-md:text-sm">
            {{ $t("pages.course.uncompletedReg") }}
          </p>
          <Button
            class="mx-auto mt-3 max-md:text-sm"
            :label="$t('actions.completeRegis')"
            severity="contrast"
            @click="authStore.modal = AuthModalType.COMPLETE_REG"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { AuthModalType } from "~/shared/enums/common.enum";

const authStore = useAuthStore();
const show = ref(false);

onMounted(() => {
  show.value = true;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(100px) translateX(-50%);
}
</style>
