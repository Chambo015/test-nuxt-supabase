<template>
  <div>
    <div class="flex h-dvh flex-col items-center justify-center max-md:px-4">
      <BaseIcon name="logo-title-main" />
      <div class="mt-14 w-[440px] rounded-xl bg-white px-10 py-8 shadow-lg max-md:w-full">
        <p class="font-inter text-lg font-medium text-black">
          Сбросить пароль
        </p>
        <form class="mt-6 space-y-5 font-inter" @submit.prevent="submit">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-[#344054]" for="email">{{ $t(form.email.$label) }}</label>
            <InputText
              id="email"
              v-model="form.email.$value"
              aria-describedby="email-help"
              disabled
              :placeholder="$t('actions.placeholder.email')"
              :pt="{
                root: {
                  class: 'border-[#d4d4d4] bg-white !rounded-lg !border',
                },
              }"
            />
            <small v-if="form.email.$error && submitted" id="email-help">{{ form.email.$error.message }}</small>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-[#344054]" for="password">{{ $t(form.password.$label) }}</label>
            <Password
              id="password"
              v-model="form.password.$value"
              aria-describedby="password-help"
              autocomplete="off"
              name="ccc"
              :placeholder="$t('actions.placeholder.newPassword')"
              prompt-label="Введите пароль"
              :pt="{
                root: {
                  class: 'border-[#d4d4d4] bg-white !rounded-lg !border',
                },
              }"
              :strong-regex="RegExpPassword"
              v-bind="strengthLevelPassword"
            />
            <small v-if="form.password.$error && submitted" id="password-help">{{ form.password.$error.message }}</small>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-[#344054]" for="re_password">{{ $t(form.re_password.$label) }}</label>
            <Password
              id="re_password"
              v-model="form.re_password.$value"
              aria-describedby="re_password-help"
              autocomplete="off"
              :feedback="false"
              name="rrrccc"
              :placeholder="$t('actions.placeholder.newPassword')"
              :pt="{
                root: {
                  class: 'border-[#d4d4d4] bg-white !rounded-lg !border',
                },
              }"
            />
            <small v-if="form.re_password.$error && submitted" id="re_password-help">{{ form.re_password.$error.message }}</small>
          </div>
          <Button class="w-full" label="Сбросить пароль" :loading="isLoading" type="submit" />
        </form>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { defineForm, field, isValidForm } from "vue-yup-form";
import { string } from "yup";
import BaseIcon from "~/shared/components/BaseIcon.vue";
import { AuthRepository } from "~/shared/repository/auth.repository";
import { RegExpPassword } from "~/shared/utils/regexp";

definePageMeta({
  layout: false,
  hideAuth: true,
});

const route = useRoute();
const { t } = useI18n();
const toast = useToast();

const regExpPass = new RegExp(RegExpPassword);

const submitted = ref(false);
const isSuccess = ref(false);
const isLoading = ref(false);

const strengthLevelPassword = {
  "weak-label": "Не надежный пароль",
  "medium-label": "Средней надежности",
  "strong-label": "Надежный пароль 👍",
};

function generateForm() {
  const emailUser = Array.isArray(route.query.email) ? route.query.email[0] : route.query.email;
  const email = field(
    emailUser || "",
    string().label("actions.email").required(t("validation.requiredFieldError")).email(t("validation.emailFormatError")),
  );
  const password = field(
    "",
    string().matches(regExpPass, "Пароль должен содержать  не менее 8 символов, не менее одной заглавной буквы, цифры и специальный символ(#?!@$%^&*-)").label("actions.newPassword").required(t("validation.requiredFieldError")).min(8, t("validation.passwordLengthError")),
  );
  const re_password = field("", () =>
    string()
      .label("actions.confPassword")
      .required(t("validation.requiredFieldError"))
      .oneOf([password.$value], () => t("validation.passwordDoesNotMatch")));
  return defineForm({
    email,
    password,
    re_password,
  });
}

const form = shallowRef(generateForm());

async function submit() {
  submitted.value = true;
  isLoading.value = true;

  try {
    const token = Array.isArray(route.query.token) ? route.query.token[0] : route.query.token;
    if (!token) {
      toast.add({ severity: "error", detail: "Не обнаружен токен сброса пароля", life: 3000 });
      return;
    }
    if (isValidForm(form.value)) {
      await AuthRepository.resetPasswordWithToken({
        email_or_login: form.value.email.$value,
        password: form.value.password.$value,
        re_password: form.value.re_password.$value,
        token,
      });
      isSuccess.value = true;
      navigateTo({ replace: true, path: "/" });
    }
  } catch (error) {
    console.error("@reset password", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
small {
  @apply text-xs text-red-500;
}
</style>
