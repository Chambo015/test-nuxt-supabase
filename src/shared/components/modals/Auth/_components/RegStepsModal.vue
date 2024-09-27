<template>
  <div>
    <form @submit.prevent="onSubmit">
      <Stepper
        v-model:activeStep="currentStepIdx"
        :orientation="$device.isMobileOrTablet ? 'vertical' : 'horizontal'"
        :pt="{ panelContainer: '!px-0 pb-0' }"
      >
        <StepperPanel>
          <template #header="{ index }">
            <HeaderStepForm :current-step-idx="currentStepIdx" :index="index" :label="$t('actions.personalData')" />
          </template>
          <template #content>
            <div class="space-y-4 rounded-3xl bg-[#F9FAFB] p-4 font-inter">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-[#344054]" :for="form.name.$label">{{
                  $t(form.name.$label)
                }}</label>
                <InputText
                  :id="form.name.$label"
                  v-model.trim="steps[0].name.$value"
                  :aria-describedby="`${form.name.$label}-help`"
                  :placeholder="$t('actions.placeholder.name')"
                />
                <small v-if="steps[0].name.$error && submitted" :id="`${form.name.$label}-help`">{{
                  steps[0].name.$error.message
                }}</small>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-[#344054]" :for="form.email.$label">{{
                  $t(form.email.$label)
                }}</label>
                <InputText
                  :id="form.email.$label"
                  v-model.trim="steps[0].email.$value"
                  :aria-describedby="`${form.email.$label}-help`"
                  :placeholder="$t('actions.placeholder.email')"
                />
                <small v-if="steps[0].email.$error && submitted" :id="`${form.email.$label}-help`">{{
                  steps[0].email.$error.message
                }}</small>
              </div>
            </div>
            <div class="flex justify-end pt-4">
              <Button icon="pi pi-arrow-right" icon-pos="right" :label="$t('actions.nextButton')" type="submit" />
            </div>
          </template>
        </StepperPanel>
        <StepperPanel>
          <template #header="{ index }">
            <HeaderStepForm :current-step-idx="currentStepIdx" :index="index" :label="$t('actions.password')" />
          </template>
          <template #content>
            <div class="space-y-4 rounded-3xl bg-[#F9FAFB] p-4 font-inter">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-[#344054]" :for="form.password.$label">{{
                  $t(form.password.$label)
                }}</label>
                <Password
                  :id="form.password.$label"
                  v-model.trim="steps[1].password.$value"
                  aria-describedby="password-help"
                  autocomplete="off"
                  name="ccc"
                  :placeholder="$t('actions.enterPassword')"
                  prompt-label="Введите пароль"
                  :strong-regex="RegExpPassword"
                  v-bind="strengthLevelPassword"
                />
                <small v-if="steps[1].password.$error && submitted" id="password-help">{{
                  steps[1].password.$error.message
                }}</small>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-[#344054]" :for="form.re_password.$label">{{
                  $t(form.re_password.$label)
                }}</label>
                <Password
                  :id="form.re_password.$label"
                  v-model.trim="steps[1].re_password.$value"
                  aria-describedby="re_password-help"
                  autocomplete="off"
                  :feedback="false"
                  name="rrrccc"
                  :placeholder="$t('actions.confPassword')"
                />
                <small v-if="steps[1].re_password.$error && submitted" id="re_password-help">{{
                  steps[1].re_password.$error.message
                }}</small>
              </div>
            </div>
            <div class="flex justify-end gap-4 pt-4">
              <Button
                icon="pi pi-arrow-left"
                :label="$t('actions.backButton')"
                severity="secondary"
                type="button"
                @click="goToPrev"
              />
              <!-- <Button icon="pi pi-arrow-right" icon-pos="right" :label="$t('actions.nextButton')" type="submit" /> -->
              <Button type="submit">
                <i v-if="isLoading" class="pi pi-spin pi-spinner text-white" style="font-size: 16px"></i>
                <template v-else>
                  {{ $t("actions.regis") }}
                </template>
              </Button>
            </div>
          </template>
        </StepperPanel>
      </Stepper>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineForm, field, isValidForm } from "vue-yup-form";
import { string } from "yup";
import { RegExpPassword } from "~/shared/utils/regexp";
import { AuthRepository } from "~/shared/repository/auth.repository";
import HeaderStepForm from "~/shared/components/forms/_blocks/HeaderStepForm.vue";

const { t } = useI18n();

const strengthLevelPassword = {
  "weak-label": "Не надежный пароль",
  "medium-label": "Средней надежности",
  "strong-label": "Надежный пароль 👍",
};

const submitted = ref(false);
const isLoading = ref(false);
const form = generateForm();
const { steps, currentStepIdx, hasPrevious, isLastStep, getCurrentStep } = form.useFormSteps();

async function onSubmit() {
  submitted.value = true;

  if (!isValidForm(getCurrentStep())) {
    return;
  }

  if (!isLastStep.value) {
    submitted.value = false;
    currentStepIdx.value++;
    return;
  }

  try {
    isLoading.value = true;
    if (isValidForm(form)) {
      await AuthRepository.regis({
        name: form.name.$value,
        last_name: "",
        login: form.email.$value,
        email: form.email.$value,
        password: form.password.$value,
        re_password: form.password.$value,
      });
    }
  } catch (error) {
    console.error("@regis", error);
  } finally {
    isLoading.value = false;
  }
}

function goToPrev() {
  if (!hasPrevious.value) {
    return;
  }

  submitted.value = false;
  currentStepIdx.value--;
}

function generateForm() {
  const name = field("", string().label("actions.name").required(t("validation.requiredFieldError")));
  const email = field(
    "",
    string()
      .label("actions.email")
      .required(t("validation.requiredFieldError"))
      .email(t("validation.emailFormatError")),
  );
  const password = field(
    "",
    string()
      .matches(
        new RegExp(RegExpPassword),
        "Пароль должен содержать  не менее 8 символов, не менее одной заглавной буквы, цифры и специальный символ(#?!@$%^&*-)",
      )
      .label("actions.enterPassword")
      .required(t("validation.requiredFieldError"))
      .min(8, t("validation.passwordLengthError")),
  );
  const re_password = field("", () =>
    string()
      .label("actions.confPassword")
      .required(t("validation.requiredFieldError"))
      .oneOf([password.$value], () => t("validation.passwordDoesNotMatch")));

  return defineForm({
    name,
    email,
    password,
    re_password,
    // industry,
    // position,
    // interesting,
    // policy,

    useFormSteps() {
      const steps = [
        {
          name,
          email,
        },
        {
          password,
          re_password,
        },
        // {
        //   industry,
        //   position,
        //   interesting,
        //   policy,
        // },
      ] as const;

      const currentStepIdx = ref(0);
      const hasPrevious = computed(() => currentStepIdx.value > 0);
      const isLastStep = computed(() => currentStepIdx.value === steps.length - 1);
      const getCurrentStep = () => steps[currentStepIdx.value];

      return {
        steps,
        currentStepIdx,
        hasPrevious,
        isLastStep,
        getCurrentStep,
      };
    },
  });
}
</script>

<style scoped>
small {
  @apply text-xs text-red-500;
}
</style>
