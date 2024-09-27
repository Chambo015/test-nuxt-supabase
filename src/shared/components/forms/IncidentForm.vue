<template>
  <form @submit.prevent="onSubmit">
    <p v-if="!isModal" class="font-NeueMachina text-2xl font-bold text-[#734CC9]">
      {{ $t('actions.noticeIncident') }}
    </p>
    <div class="space-y-5 font-inter">
      <div class="mt-6 flex gap-5 max-xl:flex-col">
        <div class="flex flex-col gap-2 xl:grow">
          <label :for="`firstName${isModal}`" class="font-medium text-[#344054] text-sm">{{ $t(form.firstName.$label) }}</label>
          <InputText
            :id="`firstName${isModal}`"
            class=""
            :pt="{
              root: {
                class: ptInputClass,
              },
            }"
            :placeholder="$t('actions.placeholder.name')"
            :pt-options="{ mergeProps: true, mergeSections: true }"
            v-model.trim="form.firstName.$value"
            aria-describedby="firstName-help" />
          <small id="firstName-help" v-if="form.firstName.$error && submitted">{{
            form.firstName.$error.message
          }}</small>
        </div>
        <div class="flex flex-col gap-2 xl:grow">
          <label :for="'lastName'+ isModal" class="font-medium text-[#344054] text-sm">{{ $t(form.lastName.$label) }}</label>
          <InputText
            :id="'lastName' + isModal"
            :pt="{
              root: {
                class: ptInputClass,
              },
            }"
            :placeholder="$t('actions.placeholder.lastName')"
            v-model.trim="form.lastName.$value"
            aria-describedby="lastName-help" />
          <small id="lastName-help" v-if="form.lastName.$error && submitted">{{ form.lastName.$error.message }}</small>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-[rgb(52,64,84)]" :for="`email${isModal}`">{{ $t(form.email.$label) }}</label>
        <InputText
          :id="`email${isModal}`"
          v-model.trim="form.email.$value"
          :placeholder="$t('actions.placeholder.email')"
          :pt="{
            root: {
              class: ptInputClass,
            },
          }"
          aria-describedby="email-help" />
        <small v-if="form.email.$error && submitted" id="email-help">{{ form.email.$error.message }}</small>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-[#344054]" :for="'description' + isModal">{{ $t(form.description.$label) }}</label>
        <Textarea
          :id="'description' + isModal"
          v-model.trim="form.description.$value"
          aria-describedby="description-help"
          auto-resize
          maxlength="356"
          :placeholder="$t('actions.placeholder.problem')"
          :pt="{
            root: {
              class: ptInputClass,
            },
          }"
          :rows="isFooter ? 1 : 4"
        />
        <small v-if="form.description.$error && submitted" id="description-help">{{
          form.description.$error.message
        }}</small>
      </div>
      <div>
        <div class="flex items-start">
          <Checkbox :binary="true" v-model="form.policy.$value" :inputId="'policy' + isModal" />
          <label :for="'policy' + isModal" class="ml-2 text-[#475467] text-sm">
            <I18nT keypath="actions.policy.text" scope="global">
              <template #link>
                <a class="text-main-purple" href="https://citizensec.kz/policy" target="_blank">{{ $t('actions.policy.link') }}</a>
              </template>
            </I18nT>
          </label>
        </div>
        <small v-if="form.policy.$error && submitted" id="description-help">{{ form.policy.$error.message }}</small>
      </div>
      <div>
        <Recaptcha v-model="form.recaptcha.$value" :invalid="form.recaptcha.$error && submitted" />
      </div>
      <Button
        :label="$t('actions.submitButton')"
        :loading="isLoading"
        :pt="{ root: { class: 'w-full' }, label: { class: 'font-semibold' } }"
        severity="info"
        type="submit"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import Textarea from "primevue/textarea";
import { defineForm, field, isValidForm } from "vue-yup-form";
import { boolean, string } from "yup";
import Recaptcha from "./_blocks/Recaptcha.vue";
import { FeedbackRepository } from "~/shared/repository/feedback.repository";

defineProps<{
  isFooter?: boolean
  isModal?: boolean
}>();

const emit = defineEmits(["closeModal"]);

const { t } = useI18n();

const submitted = ref(false);
const isSuccess = ref(false);
const isLoading = ref(false);

const generateForm = () => {
  return defineForm({
    email: field(
      "",
      string().required(t("validation.requiredFieldError")).email(t("validation.emailFormatError")).label("actions.email"),
    ),
    firstName: field("", string().required(t("validation.requiredFieldError")).label("actions.name")),
    lastName: field("", string().required(t("validation.requiredFieldError")).label("actions.lastName")),
    description: field(
      "",
      string()
        .required(t("validation.requiredFieldError"))
        .min(10, t("validation.fieldLengthError", {field: 'Описание' , min: 10}))
        .label("actions.description"),
    ),
    policy: field(false, boolean().oneOf([true], t("validation.requiredFieldPolicy"))),
    recaptcha: field(false, boolean().oneOf([true], "are you robot?")),
  });
};

const form = shallowRef(generateForm());

const onReset = () => {
  form.value = generateForm();
};

const onSubmit = () => {
  submitted.value = true;
  isLoading.value = true;

  if (isValidForm(form.value)) {
    FeedbackRepository.incident({
      email: form.value.email.$value,
      name: form.value.firstName.$value,
      last_name: form.value.lastName.$value,
      message: form.value.description.$value,
    })
      .then((data) => {
        isSuccess.value = true;
        submitted.value = false;
        isLoading.value = false;
        onReset();
        emit("closeModal");
      })
      .catch(err => console.error("@err", err))
      .finally(() => isLoading.value = false);
  } else {
    isLoading.value = false;
  }
};

const ptInputClass: string = "border-[#d4d4d4] bg-white !rounded-lg !border ";
</script>

<style scoped>
small {
  @apply text-xs text-red-500;
}
</style>
