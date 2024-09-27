import type { ToastMessageOptions } from "primevue/toast";

export default defineNuxtPlugin((nuxtApp) => {
  const toast = nuxtApp.vueApp.config.globalProperties.$toast;

  const $toast = {
    success(props: ToastMessageOptions) {
      return toast.add({
        life: 3000,
        ...props,
        severity: "success",
      });
    },
    error(props: ToastMessageOptions) {
      return toast.add({
        life: 3000,
        ...props,
        severity: "error",
      });
    },
    info(props: ToastMessageOptions) {
      return toast.add({
        life: 3000,
        ...props,
        severity: "info",
      });
    },
  };

  return {
    provide: {
      toast: $toast,
    },
  };
});
