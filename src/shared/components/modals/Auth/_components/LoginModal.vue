<template>
  <div>
    <form @keydown.enter.prevent="submit" @submit.prevent="submit">
      <div class="mb-5">
        <label class="text-sm font-medium text-gray-700" for="username">E-mail</label>
        <InputText
          v-model.trim="form.login.$value"
          autocomplete="off"
          class="mt-1 h-10 w-full"
          :invalid="form.login.$error && submitting"
          name="login"
          :placeholder="$t('pages.auth.enterEmail')"
        />
        <span v-if="form.login.$error && submitting" class="text-xs text-red-500">{{ form.login.$error.message }}</span>
      </div>
      <div class="mb-5">
        <label class="text-sm font-medium text-gray-700" for="username">{{ $t("actions.password") }}</label>
        <Password
          v-model.trim="form.password.$value"
          autocomplete="off"
          class="mt-1 h-10 w-full"
          :feedback="false"
          :invalid="form.password.$error && submitting"
          name="password"
          :placeholder="$t('actions.enterPassword')"
          toggle-mask
        />
        <span v-if="form.password.$error && submitting" class="text-xs text-red-500">{{
          form.password.$error.message
        }}</span>
      </div>

      <div class="mb-5 flex items-center justify-between">
        <div class="flex items-center">
          <Checkbox
            v-model="save"
            binar
            input-id="save"
            value="save"
          />
          <label class="ml-2 text-sm font-medium" for="save">
            {{ $t("pages.auth.saveDays") }}
          </label>
        </div>
        <button
          class="text-sm font-bold text-violet-600"
          type="button"
          @click="authStore.modal = AuthModalType.RESET"
        >
          {{ $t("pages.auth.resetPassword") }}
        </button>
      </div>

      <Transition
        enter-active-class="transition-all duration-500"
        enter-from-class="translate-y-5 opacity-0"
        leave-active-class="transition-all"
        leave-to-class="translate-y-5 opacity-0"
      >
        <div v-if="form.login.$value && form.password.$value" class="mb-5 flex justify-center  ">
          <Recaptcha v-model="form.recaptcha.$value" :invalid="form.recaptcha.$error && submitting" />
        </div>
      </Transition>

      <Button class="h-11 w-full" type="submit">
        <i
          v-if="loaderBtn"
          class="pi pi-spin pi-spinner text-white"
          style="font-size: 16px"
        ></i>
        <template v-else>
          {{ $t("actions.login") }}
        </template>
      </Button>
    </form>
    <!-- TODO: Enable when google auth verified -->
    <!-- <p class="my-6 text-center font-inter text-sm font-medium text-[#344054]">
      или зайдите через
    </p>
    <div class="flex justify-center">
      <GoogleButton />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { defineForm, field } from "vue-yup-form";
import { boolean, string } from "yup";
import GoogleButton from "./_social-buttons/GoogleButton.vue";
import { AuthRepository } from "~/shared/repository/auth.repository";
import { useAuthStore } from "~/shared/store/auth.store";
import { AuthModalType } from "~/shared/enums/common.enum";
import Recaptcha from "~/shared/components/forms/_blocks/Recaptcha.vue";

const authStore = useAuthStore();
const { t } = useI18n();
const save = ref(false);
const loaderBtn = ref(false);
const config = useRuntimeConfig();

const submitting = ref(false);
const form = defineForm({
  login: field(
    "",
    string().trim().required(t("validation.requiredFieldError")).email(t("validation.emailFormatError")),
  ),
  password: field(
    "",
    string().trim().required(t("validation.requiredFieldError")).min(6, t("validation.passwordLengthError")),
  ),
  recaptcha: field(config.public.SiteMode === "development" /* false */, boolean().oneOf([true], "are you robot?")),
});

async function submit() {
  submitting.value = true;
  loaderBtn.value = true;

  try {
    if (!form.login.$error && !form.password.$error && !form.recaptcha.$error) {
      await AuthRepository.login({
        email: form.login.$value,
        password: form.password.$value,
      });
    }
  } catch (error) {
    console.error("@error login", error);
  } finally {
    loaderBtn.value = false;
  }
}
</script>

<style scoped lang="scss"></style>
