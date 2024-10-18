import { defineForm, field, formsField, isValidForm, toObject } from "vue-yup-form";
import { boolean, number, string } from "yup";
import { ReturnTypeStep } from "../config";

interface FormBuyCourseProps {
  onPay: () => Promise<ReturnTypeStep> | ReturnTypeStep
  onCreateInvoice: (props: { isGift: boolean, enableCabinetIS: boolean, inviteCount?: number, participants: { email: string }[] }) => Promise<ReturnTypeStep> | ReturnTypeStep
  onCloseForm: () => void
}

export function useFormBuyCourse({ onPay, onCreateInvoice, onCloseForm }: FormBuyCourseProps) {
  const authStore = useAuthStore();
  const { t } = useI18n({ useScope: "global" });

  const submitted = ref(false);
  const isLoading = ref(false);

  const form = generateForm();
  const { steps, currentStepIdx, hasPrevious, isLastStep, getCurrentStep } = form.useFormSteps();

  function resetStep() {
    isLoading.value = false;
    currentStepIdx.value = 0;
  }

  async function onSubmit() {
    submitted.value = true;

    /** Validate current Step */
    if (!isValidForm(getCurrentStep())) return;

    /** First Step is valid */
    if ((form.isGift.$value && currentStepIdx.value === 1) || (currentStepIdx.value === 0 && !form.isGift.$value)) {
      // alert(JSON.stringify(toObject(form), null, 2));
      try {
        isLoading.value = true;

        const result = await onCreateInvoice({
          enableCabinetIS: form.isGift.$value && form.cabinetIS.$value,
          isGift: form.isGift.$value,
          inviteCount: form.isGift.$value && form.countInvite.$value ? form.countInvite.$value : undefined,
          participants: toObject(form).inviteUsers,
        });

        if (result === ReturnTypeStep.FAILED) return resetStep();
      } catch (error) {
        resetStep();
        return;
      } finally {
        isLoading.value = false;
      }
    }

    /** Next step */
    if (!isLastStep.value) {
      submitted.value = false;
      currentStepIdx.value++;
      return;
    }

    try {
      isLoading.value = true;
      if (isValidForm(form)) {
        // alert(JSON.stringify(toObject(form), null, 2));
        const result = await onPay();
        if (result === ReturnTypeStep.FAILED) {
          isLoading.value = false;
          return console.error('Fail Last Step');
        }
        if (result === ReturnTypeStep.SUCCESS) onCloseForm();
      }
    } catch (error) {
      resetStep();
      return;
    } finally {
      isLoading.value = false;
    }
  }

  /** Navigation Back */
  function goToPrev() {
    if (!hasPrevious.value) {
      return;
    }

    submitted.value = false;
    currentStepIdx.value--;
  }

  /** Устанавливаем количество input для приглашения */
  function setCountInviteUsers(count: number) {
    form.inviteUsers.$initialize([
      { email: authStore.user?.email },
      ...Array.from({ length: count - 1 }).map(() => ({ email: "" })),
    ]);
  }
  watch(() => form.countInvite.$value, (newCount) => {
    if (newCount && form.isGift.$value) {
      setCountInviteUsers(newCount);
    }
  });
  /* ******************************************** */

  /** Generate form */
  function generateForm() {
    const isGift = field(false, boolean());
    const countInvite = field(undefined, number().label("Укажите количество пользователей").when(() => {
      if (isGift.$value) {
        return number().required(t("validation.requiredFieldError")).min(2, "Минимально 2 пользователя");
      } else {
        return number();
      }
    }));
    const cabinetIS = field(false, boolean());

    const generateInviteForm = ({ email = "" }) => defineForm({
      email: field(email, string().email(t("validation.emailFormatError")).required(t("validation.requiredFieldError")).label(t("actions.email"))),
    });

    const inviteUsers = formsField(generateInviteForm, [{ email: authStore.user?.email }]);

    return defineForm({
      isGift,
      countInvite,
      cabinetIS,
      inviteUsers,
      useFormSteps() {
        const steps = computed(() => [
          {
            isGift,
            countInvite,
            cabinetIS,
          },
          ...(isGift.$value ? [{ inviteUsers }] : []), // Switch step 2
          {}, // Empty object for 3 steps Pay
        ] as const);

        const currentStepIdx = ref(0);
        const hasPrevious = computed(() => currentStepIdx.value > 0);
        const isLastStep = computed(() => currentStepIdx.value === steps.value.length - 1);
        const getCurrentStep = () => steps.value[currentStepIdx.value];

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
  return {
    onSubmit,
    goToPrev,
    steps,
    submitted,
    isLoading,
    form,
    currentStepIdx,
  };
}
