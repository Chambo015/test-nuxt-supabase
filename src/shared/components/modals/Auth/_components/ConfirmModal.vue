<template>
  <form @submit.prevent="submit">
    <div class="font-inter border bg-[#F9FAFB] border-[#F2F4F7] p-5 rounded-3xl text-center">
      <p class="text-violet-600 text-sm font-bold mb-8">{{ $t("pages.auth.tweFactorAuth") }}</p>
      <p class="text-lg font-semibold">{{ $t("pages.auth.smsSend") }}</p>
      <div class="flex justify-center py-3">
        <InputOtp
          v-model="form.code.$value"
          class="h-16 text-[48px]"
          :disabled="loaderBtn"
          :invalid="!!form.code.$error && submitting"
          integer-only
          :pt="{
            input: {
              root: {
                class: 'h-16 w-16 !rounded-full justify-center pl-4 pr-4',
              },
            },
          }"
          @change="handleChange"
        />
      </div>
      <p class="text-sm font-light text-gray-600 mb-1">
        {{ $t("pages.auth.emailAddress") }}
        <span class="text-violet-600 font-bold">{{ authStore.user?.email }}</span>
        {{ $t("pages.auth.passwordCode") }}
      </p>
      <p class="text-sm mb-6 text-gray-600 font-light">{{ $t("pages.auth.spamEmail") }}</p>
      <Button
        :disabled="form.code.$value.length < 4"
        type="submit"
        :label="$t('actions.continueButton')"
        class="h-11 w-full bg-violet-600 mb-7">
        <i v-if="loaderBtn" class="pi pi-spin pi-spinner text-white" style="font-size: 16px" />
        <template v-else>{{ $t("actions.continueButton") }}</template>
      </Button>
      <p @click="timer" v-if="resend" class="text-sm text-gray-600 text-center hover:text-primary-600 cursor-pointer">
        {{ $t("actions.resend") }}
      </p>
      <p v-else class="text-sm text-gray-600 text-center">
        {{ $t("pages.auth.sendTimer") }} {{ time[0] === 0 ? "00" : time[0] }}:{{ time[1] < 10 ? "0" : "" }}{{ time[1] }}
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineForm, field } from "vue-yup-form";
import { string } from "yup";
import { AuthRepository } from "~/shared/repository/auth.repository";

const { t } = useI18n();
const authStore = useAuthStore();

const submitting = ref(false);
const loaderBtn = ref(false);
const time = ref([0, 0]);
const resend = ref(false);

const form = defineForm({
  code: field("", string().required(t("validation.requiredFieldError"))),
});

async function submit() {
  submitting.value = true;
  loaderBtn.value = true;

  try {
    if (!form.code.$error) {
      await AuthRepository.confirm(form.code.$value);
    }
  } catch (error) {
    console.error("@error login", error);
  } finally {
    loaderBtn.value = false;
    form.code.$value = "";
  }
}

function timer(isInit?: boolean) {
  time.value = [1, 59];
  resend.value = false;

  if (!isInit)
    AuthRepository.sendVerifyCode();

  const interval = setInterval(() => {
    time.value[1]--;
    if (time.value[1] === 0) {
      time.value[0]--;
      time.value[1] = 60;
    }

    if (time.value[0] < 0 && time.value[0] < 0) {
      resend.value = true;
      clearInterval(interval);
    }
  }, 1000);
}

function handleChange() {
  if (form.code.$value.length >= 4) {
    submit();
  }
}

onMounted(() => {
  timer(true);
});
</script>

<style scoped lang="scss"></style>
