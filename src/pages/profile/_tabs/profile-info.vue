<template>
  <div class="pt-6">
    <ProfileInfoSkeleton v-if="authStore.isPendingProfile" />
    <div v-else>
      <div>
        <p class="text-lg font-bold">
          {{ $t("pages.profile.all.title") }}
        </p>
        <span class="text-sm font-light text-gray-500">{{ $t("pages.profile.all.note") }}</span>
      </div>
      <Divider />

      <div class="justify-between gap-6 sm:flex">
        <div class="w-full">
          <label class="text-sm font-medium text-gray-700" for="name">
            {{ $t("actions.name") }}
          </label>
          <InputText
            id="name"
            v-model="form.name.$value"
            autocomplete="off"
            class="mt-1 h-10 w-full bg-transparent font-light"
            :disabled="authStore.user?.is_registration_complete"
            :invalid="form.name.$error && submitting"
            name="name"
          />
        </div>
        <div class="mt-6 w-full sm:mt-0">
          <label class="text-sm font-medium text-gray-700" for="lastName">
            {{ $t("actions.lastName") }}
          </label>
          <InputText
            id="lastName"
            v-model="form.lastName.$value"
            autocomplete="off"
            class="mt-1 h-10 w-full bg-transparent font-light"
            :disabled="authStore.user?.is_registration_complete"
            :invalid="form.lastName.$error && submitting"
            name="lastName"
          />
        </div>
      </div>

      <div class="mt-6 w-full">
        <label class="text-sm font-medium text-gray-700" for="email">Email</label>
        <IconField icon-position="left">
          <InputIcon>
            <i class="pi pi-envelope mt-0.5 font-bold"></i>
          </InputIcon>
          <InputText
            id="email"
            v-model="form.email.$value"
            autocomplete="off"
            class="mt-1 h-10 w-full bg-transparent font-light"
            :disabled="authStore.user?.is_registration_complete"
            :invalid="form.email.$error && submitting"
            name="name"
          />
        </IconField>
      </div>

      <div class="mt-6 sm:flex">
        <Avatar
          v-if="!!authStore.user?.photo"
          class="min-w-16"
          :image="authStore.user.photo"
          shape="circle"
          size="xlarge"
        />
        <Avatar
          v-else
          class="min-w-16"
          icon="pi pi-user"
          shape="circle"
          size="xlarge"
        />
        <label
          class="upload mt-3 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border p-4 hover:bg-surface-300/20 sm:ml-6 sm:mt-0"
          for="file"
        >
          <div class="flex size-12 items-center justify-center rounded-full bg-gray-100">
            <div class="flex size-9 items-center justify-center rounded-full bg-gray-200">
              <i class="pi pi-cloud-upload text-lg text-gray-700"></i>
            </div>
          </div>
          <p class="mt-2 text-center text-sm font-normal leading-6 text-gray-500">
            <span class="cursor-pointer font-bold text-violet-600">{{ $t("actions.upload") }}</span>
            <input
              id="file"
              accept="image/png, image/jpeg, image/jpg"
              hidden="hidden"
              name="file"
              type="file"
              @change="handlerAvatar"
            />
            {{ $t("actions.upload_note") }} <br />
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </label>
      </div>

      <Divider />
      <div class="mt-6 flex justify-end">
        <Button
          class="h-10 w-full text-sm sm:w-auto"
          :label="$t('actions.cancelButton')"
          outlined
          severity="secondary"
          @click="onReset"
        />
        <Button
          class="ml-3 h-10 w-full text-sm sm:w-auto"
          :disabled="authStore.isPendingProfile"
          :label="$t('actions.saveButton')"
          :loading="authStore.isPendingProfile"
          severity="info"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineForm, field, isValidForm } from "vue-yup-form";
import { string } from "yup";
import ProfileInfoSkeleton from "./ProfileInfoSkeleton.vue";
import { AuthRepository } from "~/shared/repository/auth.repository";
import { UserRepository } from "~/shared/repository/user.repository";

const { t } = useI18n({ useScope: "global" });
const authStore = useAuthStore();

const submitting = ref(false);

function generateForm() {
  return defineForm({
    name: field(
      authStore.user?.name,
      string().required(t("validation.requiredFieldError")),
    ),
    email: field(
      authStore.user?.email,
      string()
        .required(t("validation.requiredFieldError"))
        .email(t("validation.emailFormatError")),
    ),
    lastName: field(
      authStore.user?.last_name,
      string().required(t("validation.requiredFieldError")),
    ),
  });
}
const form = shallowRef(generateForm());
watch(() => authStore.isPendingProfile, () => {
  form.value = generateForm();
});

async function submit() {
  submitting.value = true;

  if (!authStore.user) return;

  if (isValidForm(form.value)) {
    await AuthRepository.update({
      email: form.value.email.$value || authStore.user.email,
      last_name: form.value.lastName.$value || authStore.user.last_name,
      name: form.value.name.$value || authStore.user.name,
      login: authStore.user.login || form.value.email.$value || authStore.user.email,
    });
  }
}

function handlerAvatar(val: any) {
  UserRepository.saveUserAvatar(val.target.files[0]);
}

function onReset() {
  form.value = generateForm();
}
</script>
