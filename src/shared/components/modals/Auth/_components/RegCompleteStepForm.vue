<template>
  <div>
    <p class="mb-2 font-inter text-sm font-light text-slate-500">
      <I18nT keypath="pages.auth.attentionChangeName.note" scope="global">
        <template #once>
          <strong class="font-semibold">{{ $t("pages.auth.attentionChangeName.once") }}</strong>
        </template>
      </I18nT>
    </p>
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
                <label class="text-sm font-medium text-[#344054]" :for="form.name.$label">{{ $t(form.name.$label) }}</label>
                <InputText
                  :id="form.name.$label"
                  v-model.trim="steps[0].name.$value"
                  :aria-describedby="`${form.name.$label}-help`"
                  :placeholder="$t('actions.placeholder.name')"
                />
                <small v-if="steps[0].name.$error && submitted" :id="`${form.name.$label}-help`">{{ steps[0].name.$error.message }}</small>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-[#344054]" :for="form.lastName.$label">{{ $t(form.lastName.$label) }}</label>
                <InputText
                  :id="form.lastName.$label"
                  v-model.trim="steps[0].lastName.$value"
                  :aria-describedby="`${form.lastName.$label}-help`"
                  :placeholder="$t('actions.placeholder.lastName')"
                />
                <small v-if="steps[0].lastName.$error && submitted" :id="`${form.lastName.$label}-help`">{{ steps[0].lastName.$error.message }}</small>
              </div>
            </div>
            <div class="flex justify-end pt-4">
              <Button icon="pi pi-arrow-right" icon-pos="right" :label="$t('actions.nextButton')" type="submit" />
            </div>
          </template>
        </StepperPanel>
        <StepperPanel>
          <template #header="{ index }">
            <HeaderStepForm :current-step-idx="currentStepIdx" :index="index" :label="$t('actions.additional')" />
          </template>
          <template #content="{ prevCallback }">
            <div class="space-y-4 rounded-3xl bg-[#F9FAFB] p-4 font-inter">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-[#344054]" :for="form.industry.$label">{{ $t(`actions.${form.industry.$label}`) }}</label>
                <Dropdown
                  :id="form.industry.$label"
                  v-model="steps[1].industry.$value"
                  class="h-10 w-full"
                  :invalid="!!steps[1].industry.$error && submitted"
                  option-label="name"
                  option-value="id"
                  :options="sectionsData.industry"
                  :pt="{
                    item: '!whitespace-normal',
                    wrapper: 'md:!max-h-[300px]',
                  }"
                />
                <small v-if="steps[1].industry.$error && submitted">{{ steps[1].industry.$error.message }}</small>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-[#344054]" :for="form.position.$label">{{ $t(`actions.${form.position.$label}`) }}</label>
                <Dropdown
                  :id="form.position.$label"
                  v-model="steps[1].position.$value"
                  class="h-10 w-full"
                  :invalid="!!steps[1].position.$error && submitted"
                  option-label="name"
                  option-value="id"
                  :options="sectionsData.position"
                  :pt="{
                    item: '!whitespace-normal',
                    wrapper: 'md:!max-h-[300px]',
                  }"
                />
                <small v-if="steps[1].position.$error && submitted">{{ steps[1].position.$error.message }}</small>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-[#344054]" :for="form.interesting.$label">{{ $t(`actions.${form.interesting.$label}`) }}</label>
                <Dropdown
                  :id="form.interesting.$label"
                  v-model="steps[1].interesting.$value"
                  class="h-10 w-full"
                  :invalid="!!steps[1].interesting.$error && submitted"
                  option-label="name"
                  option-value="id"
                  :options="sectionsData.interesting"
                  :pt="{
                    item: '!whitespace-normal',
                    wrapper: 'md:!max-h-[300px]',
                  }"
                />
                <small v-if="steps[1].interesting.$error && submitted">{{ steps[1].interesting.$error.message }}</small>
              </div>
            </div>
            <div class="flex justify-end gap-4 pt-4">
              <Button
                icon="pi pi-arrow-left"
                :label="$t('actions.backButton')"
                severity="secondary"
                type="button"
                @click="prevCallback"
              />
              <Button type="submit">
                <i v-if="isLoading" class="pi pi-spin pi-spinner text-white" style="font-size: 16px"></i>
                <template v-else>
                  {{ $t("actions.completeRegis") }}
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
import { number, string } from "yup";
import { useSectionsRegData } from "~/shared/composables/useSectionsRegData";
import { AuthRepository } from "~/shared/repository/auth.repository";
import HeaderStepForm from "~/shared/components/forms/_blocks/HeaderStepForm.vue";

const { t } = useI18n();
const { sectionsData } = useSectionsRegData();
const authStore = useAuthStore();

const submitted = ref(false);
const isLoading = ref(false);
const form = generateForm();
const { steps, currentStepIdx, isLastStep, getCurrentStep } = form.useFormSteps();

async function onSubmit() {
  submitted.value = true;

  if (!authStore.user) return;

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
      await AuthRepository.update({
        name: form.name.$value,
        last_name: form.lastName.$value,
        login: authStore.user.login || authStore.user.email,
        email: authStore.user.email,
        job_direction_id: +form.industry.$value,
        hobby_direction_id: +form.interesting.$value,
        job_position_id: +form.position.$value,
      });

      authStore.closeAuthModal();
    }
  } catch (error) {
    console.error("@completeRegis", error);
  } finally {
    isLoading.value = false;
  }
}

function generateForm() {
  const name = field(authStore.user?.name || "", string().label("actions.name").required(t("validation.requiredFieldError")));
  const lastName = field("", string().label("actions.lastName").required(t("validation.requiredFieldError")));
  const industry = field("", number().label("industry").required(t("validation.requiredFieldError")));
  const position = field("", number().label("position").required(t("validation.requiredFieldError")));
  const interesting = field("", number().label("interesting").required(t("validation.requiredFieldError")));

  return defineForm({
    name,
    lastName,
    industry,
    position,
    interesting,

    useFormSteps() {
      const steps = [
        {
          name,
          lastName,
        },
        {
          industry,
          position,
          interesting,
        },
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
