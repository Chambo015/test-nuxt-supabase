
declare namespace tiptop {
  interface WidgetOptions {
    language: string
  }

  export interface PayOptions {
    publicId: string // ID из личного кабинета
    description: string // Назначение платежа
    amount: number // Сумма
    currency: string // Валюта
    accountId?: string // Идентификатор плательщика (необязательно)
    invoiceId?: string // Номер заказа (необязательно)
    email?: string // email плательщика (необязательно)
    skin?: "classic" | "modern" | string // Дизайн виджета (необязательно)
    autoClose?: number // Автоматическое закрытие виджета через указанное количество секунд (необязательно)
  }

  interface PaymentResult {
    code: string
    email: string | null
    message: null | string
    success: boolean
  }

  interface CallbackOptions {
    onSuccess?: (options: PayOptions) => void // Действие при успешной оплате
    onFail?: (reason: string, options: PayOptions) => void // Действие при неуспешной оплате
    onComplete?: (paymentResult: PaymentResult, options: PayOptions) => void // Действие при завершении транзакции
  }

  class Widget {
    constructor(options: WidgetOptions);
    pay(type: "auth" | "charge", options: PayOptions, callbacks: CallbackOptions): void;
  }
}
