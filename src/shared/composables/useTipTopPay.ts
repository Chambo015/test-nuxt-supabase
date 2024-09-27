interface PayProps {
  courseId: string | number
  description: string
}

export function useTipTopPay() {
  const config = useRuntimeConfig();
  const { $module } = useNuxtApp();
  const toast = useToast();

  const { locale } = useI18n();
  const languageMap: Record<string, string> = {
    kz: "kk-KZ",
    en: "en-US",
    ru: "kk",
  };

  const isLoading = ref(false);

  useHead({
    script: [
      {
        src: "https://widget.tiptoppay.kz/bundles/widget.js",
      },
    ],
  }, { mode: "client" });

  async function pay({ courseId, description }: PayProps) {
    console.log("@pay start");
    const invoice = await getInvoiceId(courseId.toString());
    if (!invoice) return;

    const widget = new tiptop.Widget({
      language: languageMap[locale.value],
    });

    widget.pay("charge", {
      publicId: config.public.TipTopPublicId, // id из личного кабинета
      description, // назначение
      amount: +invoice.price, // сумма
      currency: "KZT", // валюта
      accountId: invoice.user_id, // идентификатор плательщика (необязательно)
      invoiceId: invoice.id, // номер заказа  (необязательно)
      skin: "classic", // дизайн виджета (необязательно)
      autoClose: 3,
    }, {
      onSuccess(options) { // success
        // действие при успешной оплате
        console.log("@onSuccess", options);
      },
      onFail(reason, options) { // fail
        // действие при неуспешной оплате
        console.log("@onFail reason", reason);
        console.log("@onFail options", options);
      },
      async onComplete(paymentResult, options) { // Вызывается как только виджет получает от api.tiptoppay ответ с результатом транзакции.
        // например вызов вашей аналитики Facebook Pixel
        console.log("@paymentResult", paymentResult);
        console.log("@onComplete options", options);
        if (paymentResult.success && options.invoiceId) {
          const res = await checkInvoice(options.invoiceId);
          console.log('@res', res);
          return;
        }
        toast.add({ severity: "error", summary: "Fail payment result", detail: "Оплата не прошла", life: 3000 });
      },
    });
  }

  async function getInvoiceId(courseId: string) {
    try {
      isLoading.value = true;
      const response = await $module.course.getInvoiceByCourse(courseId);
      return response.data;
    } catch (error) {
      console.error(error);
      toast.add({ severity: "error", summary: "Fail getInvoiceId", detail: "Оплата не прошла", life: 3000 });
    } finally {
      isLoading.value = false;
    }
  }

  async function checkInvoice(invoiceId: string) {
    try {
      isLoading.value = true;
      const response = await $module.course.checkInvoice(invoiceId);
      return response.data;
    } catch (error) {
      console.error(error);
      toast.add({ severity: "error", summary: "Fail checkInvoice", detail: "Оплата не прошла", life: 3000 });
    } finally {
      isLoading.value = false;
    }
  }

  return {
    pay,
    isLoading,
  };
};
