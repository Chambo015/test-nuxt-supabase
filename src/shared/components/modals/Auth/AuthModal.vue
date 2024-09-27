<template>
  <Dialog
    v-model:visible="visibleModal"
    class="bg-white"
    :header="authStore.modal ? $t(`pages.auth.${authStore.modal}`) : ''"
    modal
    :pt="{
      content: 'max-md:px-4',
    }"
    :style="{ width: authStore.modal === AuthModalType.REGIS ? 'min(95vw, 440px)' : 'min(95vw, 440px)' }"
    @hide="authStore.closeAuthModal()"
  >
    <div
      v-if="authStore.modal === AuthModalType.LOGIN || authStore.modal === AuthModalType.REGIS"
      class="mb-5 flex w-full rounded-full bg-gray-100 p-2"
    >
      <button
        v-for="i in authTypeOption"
        :key="i"
        class="h-10 w-full rounded-full text-sm"
        :class="{ 'bg-white text-violet-600 shadow': authStore.modal === i }"
        @click="authStore.modal = i"
      >
        {{ $t(`pages.auth.${i}`) }}
      </button>
    </div>

    <template v-if="authStore.modal === AuthModalType.LOGIN">
      <LoginModal />
    </template>

    <template v-if="authStore.modal === AuthModalType.REGIS">
      <RegStepsModal />
    </template>

    <template v-if="authStore.modal === AuthModalType.RESET">
      <ResetPasswordModal />
    </template>

    <template v-if="authStore.modal === AuthModalType.CONFIRM">
      <ConfirmModal />
    </template>

    <template v-if="authStore.modal === AuthModalType.COMPLETE_REG">
      <RegCompleteStepForm />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import RegStepsModal from "./_components/RegStepsModal.vue";
import RegCompleteStepForm from "./_components/RegCompleteStepForm.vue";
import { useAuthStore } from "~/shared/store/auth.store";
import LoginModal from "~/shared/components/modals/Auth/_components/LoginModal.vue";
import ResetPasswordModal from "~/shared/components/modals/Auth/_components/ResetPasswordModal.vue";
import { AuthModalType } from "~/shared/enums/common.enum";
import ConfirmModal from "~/shared/components/modals/Auth/_components/ConfirmModal.vue";

const authStore = useAuthStore();
const authTypeOption = ref([AuthModalType.LOGIN, AuthModalType.REGIS]);

const visibleModal = ref<boolean>(false);

watch(() => authStore.modal, () => {
  visibleModal.value = !!authStore.modal;
}, { immediate: true });
</script>

<style scoped lang="scss"></style>
