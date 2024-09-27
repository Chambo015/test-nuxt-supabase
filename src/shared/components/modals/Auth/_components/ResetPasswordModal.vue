<template>
  <form @submit.prevent="submit">
    <div class="mb-5">
      <label class="text-sm font-medium text-gray-700" for="username">E-mail</label>
      <InputText
        v-model="form.login.$value"
        autocomplete="off"
        class="mt-1 h-10 w-full font-light"
        :invalid="form.login.$error && submitting"
        name="login"
        :placeholder="$t('pages.auth.enterEmail')"
      />
      <span
        v-if="form.login.$error && submitting"
        class="text-xs text-red-500"
      >
        {{ form.login.$error.message }}
      </span>
    </div>
    <Button
      class="w-full"
      :label="$t('actions.resetButton')"
      :loading="isLoading"
      type="submit"
    />
  </form>
</template>

<script setup lang="ts">
import { defineForm, field } from "vue-yup-form";
import { string } from "yup";
import { AuthRepository } from "~/shared/repository/auth.repository";

const { t } = useI18n();

const submitting = ref(false);
const isLoading = ref(false);

const form = defineForm({
  login: field(
    "",
    string()
      .email(t("validation.emailFormatError"))
      .required(t("validation.requiredFieldError")),
  ),
});

async function submit() {
  submitting.value = true;
  isLoading.value = true;

  try {
    if (!form.login.$error) {
      await AuthRepository.resetPassword({
        email_or_login: form.login.$value,
      });
    }
  } catch (error) {
    console.error("@error reset password", error);
  } finally {
    isLoading.value = false;
  };
}
</script>

<style scoped lang="scss"></style>
