import type { Invoice } from "~/types/finance.type";

const languageMap: Record<string, string> = {
  kz: "kk-KZ",
  en: "en-US",
  ru: "kk",
};

interface PayProps extends Pick<tiptop.PayOptions, "description" | "accountId" | "amount" | "invoiceId" | "publicId"> {
  onSuccessPay?: () => Promise<void> | void
}

export function useTipTopPay() {
  const { $module, $toast } = useNuxtApp();
  const { locale } = useI18n({ useScope: "global" });

  const isLoading = ref(false);

  useHead({
    script: [
      {
        src: "https://widget.tiptoppay.kz/bundles/widget.js",
      },
    ],
  }, { mode: "client" });

  async function pay(payload: PayProps) {
    return new Promise((resolve, reject) => {
      try {
        console.log("@pay start");

        const { amount, description, accountId, onSuccessPay, invoiceId, publicId } = payload;

        console.log("@invoiceId", invoiceId);
        if (!invoiceId) return reject(new Error("Not found invoice ID"));

        console.log('@publicId', publicId);

        const widget = new tiptop.Widget({
          language: languageMap[locale.value],
        });

        widget.pay("charge", {
          publicId, // id из личного кабинета
          description, // назначение
          amount, // сумма
          currency: "KZT", // валюта
          accountId, // идентификатор плательщика (необязательно)
          invoiceId, // номер заказа  (необязательно)
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
            reject(new Error("onFail pay"));
          },
          async onComplete(paymentResult, options) { // Вызывается как только виджет получает от api.tiptoppay ответ с результатом транзакции.
            // например вызов вашей аналитики Facebook Pixel
            console.log("@paymentResult", paymentResult);
            console.log("@onComplete options", options);

            if (paymentResult.success && options.invoiceId) {
              const resCheck = await checkInvoice(options.invoiceId);
              console.log("@res", resCheck);
              if (resCheck?.is_purchased && onSuccessPay) {
                onSuccessPay();
                resolve(resCheck);
              };
            } else {
              $toast.error({ summary: "Fail payment result", detail: "Оплата не прошла" });
              reject(new Error("Fail payment result"));
            }
          },
        });
      } catch (error) {
        console.error(error);
        $toast.error({ summary: "Fail tiptop app" });
        reject(error);
      }
    });
  }

  async function checkInvoice(invoiceId: string): Promise<Invoice | undefined> {
    try {
      isLoading.value = true;
      // TODO: Проверить срабатывает ли try/catch если сделать фатальный checkInvoice, если нет, то перейти на события onError и onSuccess
      const response = await $module.course.checkInvoice(invoiceId);
      return response.data;
    } catch (error) {
      console.error(error);
      $toast.error({ summary: "Fail checkInvoice", detail: "Не удалось проверить оплату" });
    } finally {
      isLoading.value = false;
    }
  }

  return {
    pay,
    isLoading,
  };
};
