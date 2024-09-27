<template>
  <div class="info pt-6">
    <div class="head">
      <p class="text-lg font-bold">{{ $t("actions.password") }}</p>
      <span class="text-sm font-light text-gray-500">{{
        $t("pages.profile.password.note")
      }}</span>
    </div>
    <Divider />

    <div class="w-full sm:grid grid-cols-[310px_1fr]">
      <label for="username" class="text-sm text-gray-700 font-medium">{{
        $t("actions.oldPassword")
      }}</label>
      <div>
        <InputText
          name="name"
          class="w-full h-10 mt-1 font-light bg-transparent"
          autocomplete="off"
          v-model="form.old_password.$value"
          :invalid="form.old_password.$error && submitting"
        />

        <span
          class="text-xs text-red-500"
          v-if="form.old_password.$error && submitting"
          >{{ form.old_password.$error.message }}</span
        >
      </div>
    </div>
    <Divider />

    <div class="w-full sm:grid grid-cols-[310px_1fr]">
      <label for="username" class="text-sm text-gray-700 font-medium">{{
        $t("actions.newPassword")
      }}</label>
      <div>
        <InputText
          name="lastname"
          class="w-full h-10 mt-1 font-light bg-transparent"
          autocomplete="off"
          v-model="form.password.$value"
          :invalid="form.password.$error && submitting"
        />

        <span
          class="text-xs text-red-500"
          v-if="form.password.$error && submitting"
          >{{ form.password.$error.message }}</span
        >
      </div>
    </div>
    <Divider />

    <div class="w-full sm:grid grid-cols-[310px_1fr]">
      <label for="username" class="text-sm text-gray-700 font-medium">{{
        $t("actions.confPassword")
      }}</label>
      <div>
        <InputText
          name="name"
          class="w-full h-10 mt-1 font-light bg-transparent"
          autocomplete="off"
          v-model="form.re_new_password.$value"
          :invalid="
            (form.re_new_password.$error && submitting) ||
            !!confirmPasswordError
          "
        />

        <span
          class="text-xs text-red-500"
          v-if="(form.password.$error && submitting) || confirmPasswordError"
          >{{ confirmPasswordError }}</span
        >
      </div>
    </div>

    <Divider />
    <div class="flex justify-end mt-6">
      <Button
        class="h-10 text-sm w-full sm:w-auto"
        :label="$t('actions.cancelButton')"
        outlined
        severity="secondary"
      />
      <Button
        @click="submit"
        severity="info"
        class="h-10 ml-3 text-sm w-full sm:w-auto"
        :label="$t('actions.saveButton')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineForm, field, isValidForm } from "vue-yup-form";
import { string } from "yup";
import { useAuthStore } from "~/shared/store/auth.store";
import { AuthRepository } from "~/shared/repository/auth.repository";
const { t } = useI18n();

const submitting = ref(false);
const confirmPasswordError = ref("");
const password = field(
  "",
  string()
    .label("password")
    .required(t("validation.requiredFieldError"))
    .min(6, t("validation.passwordLengthError")),
);

const form = defineForm({
  old_password: field(
    "",
    string().min(6).required(t("validation.requiredFieldError")),
  ),
  password,
  re_new_password: field(
    "",
    string()
      .required(t("validation.requiredFieldError"))
      .when("password", (pass, schema, value) => {
        confirmPasswordError.value =
          password.$value !== value.value ? "error confirm" : "";
      }),
  ),
});

const submit = () => {
  submitting.value = true;

  if (isValidForm(form) && !confirmPasswordError.value) {
    AuthRepository.changePassword({
      old_password: form.old_password.$value,
      password: form.password.$value,
      re_password: form.re_new_password.$value,
    });
  }
};
</script>
