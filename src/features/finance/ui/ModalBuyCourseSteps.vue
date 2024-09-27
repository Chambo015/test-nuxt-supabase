<template>
  <ClientOnly>
    <Dialog
      v-model:visible="visibleModal"
      class="bg-white"
      header="Покупка курса"
      modal
      :pt="{
        content: 'max-md:px-4',
      }"
      :style="{ width: 'min(95vw, 550px)' }"
      @hide="paymentsStore.closeModal"
    >
      <div>
        <form @submit.prevent="onSubmit">
          <Stepper
            v-model:activeStep="currentStepIdx"
            :orientation="$device.isMobileOrTablet ? 'vertical' : 'horizontal'"
            :pt="{ panelContainer: '!px-0 pb-0' }"
          >
            <!-- 1 Ступень -->
            <StepperPanel>
              <template #header="{ index }">
                <HeaderStepForm :current-step-idx="currentStepIdx" :index="index" label="Конфигурация" />
              </template>
              <template #content>
                <div class="space-y-5 rounded-3xl bg-[#F9FAFB] p-5 font-inter">
                  <!-- IsGift -->
                  <div class="flex items-start">
                    <Checkbox v-model="steps[0].isGift.$value" :binary="true" input-id="Gift" />
                    <label class="ml-2 text-sm font-medium text-[#344054]" for="Gift">
                      Хочу купить доступ к курсу для других
                    </label>
                  </div>
                  <!-- Invite Count -->
                  <Transition
                    enter-active-class="transition-all duration-500"
                    enter-from-class="translate-y-5 opacity-0"
                    leave-active-class="transition-all"
                    leave-to-class="translate-y-5 opacity-0"
                  >
                    <div v-if="steps[0].isGift.$value" class="flex flex-col gap-2">
                      <label class="text-sm font-medium text-[#344054]" :for="form.countInvite.$label">{{
                        $t(form.countInvite.$label)
                      }}</label>
                      <InputNumber
                        v-model="steps[0].countInvite.$value"
                        :aria-describedby="`${form.countInvite.$label}-help`"
                        :input-id="form.countInvite.$label"
                        :max="50"
                        :min="0"
                        mode="decimal"
                        placeholder="Количество пользователей"
                        :pt="{
                          root: 'h-[50px]',
                        }"
                        show-buttons
                      />
                      <small v-if="steps[0].countInvite.$error && submitted" :id="`${form.countInvite.$label}-help`">{{
                        steps[0].countInvite.$error.message
                      }}</small>
                    </div>
                  </Transition>

                  <!-- cabinetIS -->
                  <div class="flex items-start">
                    <Checkbox v-model="steps[0].cabinetIS.$value" :binary="true" input-id="cabinetIS" />
                    <label class="ml-2 text-sm font-medium text-[#344054]" for="cabinetIS">
                      Подключить кабинет ИБ
                    </label>
                  </div>
                </div>
                <div class="flex items-end justify-between pt-4">
                  <div class="font-inter text-sm font-semibold text-[#344054]">
                    СУММА К ОПЛАТЕ: <span class="text-primary-hover">{{ totalPrice }} тг</span>
                  </div>
                  <Button
                    icon="pi pi-arrow-right"
                    icon-pos="right"
                    :label="$t('actions.nextButton')"
                    :loading="isLoading"
                    type="submit"
                  />
                </div>
              </template>
            </StepperPanel>
            <!-- 2 Ступень (опциональная) Приглашения -->
            <StepperPanel v-if="steps[0].isGift.$value">
              <template #header="{ index }">
                <HeaderStepForm :current-step-idx="currentStepIdx" :index="index" label="Приглашения" />
              </template>
              <template #content>
                <div class="grid grid-cols-2 gap-3 rounded-3xl bg-[#F9FAFB] p-5 font-inter">
                  <!-- users invite list -->
                  <div v-for="(user, i) in form.inviteUsers.$forms" :key="user.$key" class="flex flex-col gap-2">
                    <label class="text-sm font-medium text-[#344054]" :for="`invite_${user.$key}`">{{
                      `Пользователь ${i + 1}`
                    }}</label>
                    <InputText
                      :id="`invite_${user.$key}`"
                      v-model.trim="user.email.$value"
                      :aria-describedby="`${user.$key}_invite-help`"
                      :disabled="i === 0"
                      placeholder="Введите e-mail"
                    />
                    <small v-if="user.email.$error && submitted" :id="`${user.$key}_invite-help`">{{
                      user.email.$error.message
                    }}</small>
                  </div>
                </div>
                <div class="flex items-end justify-between pt-4">
                  <div class="font-inter text-sm font-semibold text-[#344054]">
                    СУММА К ОПЛАТЕ: <span class="text-primary-hover">{{ totalPrice }} тг</span>
                  </div>
                  <div class="flex gap-4">
                    <Button
                      icon="pi pi-arrow-left"
                      :label="$t('actions.backButton')"
                      :loading="isLoading"
                      severity="secondary"
                      type="button"
                      @click="goToPrev"
                    />
                    <Button
                      icon="pi pi-arrow-right"
                      icon-pos="right"
                      :label="$t('actions.nextButton')"
                      :loading="isLoading"
                      type="submit"
                    />
                  </div>
                </div>
              </template>
            </StepperPanel>
            <!-- Pay Step -->
            <StepperPanel>
              <template #header="{ index }">
                <HeaderStepForm :current-step-idx="currentStepIdx" :index="index" label="Оплата" />
              </template>
              <template #content>
                <div class="min-w-[500px] space-y-4 rounded-3xl bg-[#F9FAFB] p-4 font-inter">
                  <div class="flex items-center justify-center">
                    <img height="208" src="/images/payments/card.jpg" width="398" />
                  </div>
                </div>
                <div class="flex justify-end gap-4 pt-4">
                  <Button
                    icon="pi pi-arrow-left"
                    :label="$t('actions.backButton')"
                    :loading="isLoading"
                    severity="secondary"
                    type="button"
                    @click="goToPrev"
                  />
                  <Button :disabled="isLoading" type="submit">
                    <i v-if="isLoading" class="pi pi-spin pi-spinner text-white" style="font-size: 16px"></i>
                    <template v-else>
                      {{ "Оплатить" }}
                    </template>
                  </Button>
                </div>
              </template>
            </StepperPanel>
          </Stepper>
        </form>
      </div>
    </Dialog>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ReturnTypeStep } from "../config";
import { useFormBuyCourse, useTipTopPay } from "~/features/finance";
import HeaderStepForm from "~/shared/components/forms/_blocks/HeaderStepForm.vue";
import { Parse } from "~/shared/parse";
import { usePaymentsStore } from "~/shared/store/payments.store";

const FAILED = ReturnTypeStep.FAILED;
const SUCCESS = ReturnTypeStep.SUCCESS;

const paymentsStore = usePaymentsStore();
const config = useRuntimeConfig();

const { pay } = useTipTopPay();

const visibleModal = ref<boolean>(false);
watch(() => paymentsStore.displayModal, (show) => {
  if (show && !!paymentsStore.currentBuyCourse) {
    visibleModal.value = true;
  } else {
    visibleModal.value = false;
  }
}, { immediate: true });

const { steps, goToPrev, isLoading, onSubmit, submitted, form, currentStepIdx } = useFormBuyCourse({
  async onCreateInvoice({ enableCabinetIS, isGift, inviteCount, participants }) {
    if (!paymentsStore.currentBuyCourse) return FAILED;
    if (paymentsStore.currentBuyCourse?.is_purchased) return FAILED;

    const result = await paymentsStore.getInvoice({ enableCabinetIS, isGift, inviteCount, courseId: paymentsStore.currentBuyCourse?.id });

    if (!result) return FAILED;

    if (isGift && result.group) {
      const resGet = await paymentsStore.getParticipantsList({ groupId: result.group.id });
      if (!resGet) return FAILED;
      const resSet = await paymentsStore.setParticipantsList({ participants });
      if (!resSet) return FAILED;
    }

    return SUCCESS;
  },
  async onPay() {
    /** Неизвестная счет фактура */
    if (!paymentsStore.currentInvoice?.id) return FAILED;
    /** Курс уже приобретен TODO: add toast "Course already purchased" */
    if (paymentsStore.currentInvoice?.is_purchased) return FAILED;

    const amount = Parse.number(paymentsStore.currentInvoice.total_sum);

    if (!amount) return FAILED;

    try {
      await pay({
        amount,
        description: paymentsStore.currentBuyCourse?.name || "",
        invoiceId: `${paymentsStore.currentInvoice.id}`,
        accountId: `${paymentsStore.currentInvoice.user_id}`,
        onSuccessPay: paymentsStore.callbackSuccessPay || undefined,
        publicId: config.public.TipTopPublicId,
      });
      return SUCCESS;
    } catch (error) {
      return FAILED;
    }
  },
  onCloseForm() {
    paymentsStore.closeModal();
  },
});

const totalPrice = computed(() => (paymentsStore.currentBuyCourse?.price || 0) * (form.countInvite.$value || 1));
</script>

<style scoped>
small {
  @apply text-xs text-red-500;
}
</style>
