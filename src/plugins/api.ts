import { $fetch, type FetchOptions } from "ofetch";
import ContentModule from "~/repository/modules/content.module";
import CourseModule from "~/repository/modules/course.module";
import FinanceModule from "~/repository/modules/finance.module";
import { AuthModalType } from "~/shared/enums/common.enum";
import { StatusCode } from "~/shared/enums/http.enum";

interface IApiInstance {
  // user: UserModule
  content: ContentModule
  // feedback: FeedbackModule
  course: CourseModule
  finance: FinanceModule
}

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const { $i18n: { t } } = useNuxtApp();
  const toast = nuxtApp.vueApp.config.globalProperties.$toast;

  const fetchOptions: FetchOptions = {
    baseURL: config.public.BaseAPIUrl ?? "https://admin.citizensec.kz/api/v1/",
    onRequest({ options }) {
      if (authStore.token) {
        // Add Authorization header
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
        };
      }
      options.params = {
        ...options.params,
        lang: authStore.localLang.code,
      };
    },
    // onResponse({ response }) {
    // },
    async onResponseError({ response }) {
      console.error("@onResponseError", response);
      switch (response.status) {
        case StatusCode.InternalServerError:
          toast.add({
            severity: "error",
            summary: `${StatusCode.InternalServerError}`,
            detail: t("message.500"),
            life: 3000,
          });
          return;
        case StatusCode.BadRequest:
          toast.add({
            severity: "error",
            detail: t("message.Failure"),
            life: 3000,
          });
          return;
        case StatusCode.Unauthorized:
          toast.add({
            severity: "error",
            summary: `${StatusCode.Unauthorized}`,
            detail: t("message.unauthorized"),
            life: 3000,
          });
          await nuxtApp.runWithContext(() => authStore.modal = AuthModalType.LOGIN);
          return;
        case StatusCode.NotFound:
          toast.add({
            severity: "info",
            detail: t("message.Failure"),
            life: 3000,
          });
          return;
        case StatusCode.ValidationError:
        {
          const data = Object.entries(response?._data?.errors as Record<string, string[]>);
          toast.add({
            severity: "error",
            detail: data.length > 0 ? t(data[0][1][0], { field: data[0][0] }) : t("message.Failure"),
            life: 5000,
          });
          return;
        }
      }
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => authStore.modal = AuthModalType.LOGIN);
      }
    },
  };

  const $api = $fetch.create(fetchOptions);

  const $modules: IApiInstance = {
    content: new ContentModule($api, nuxtApp.vueApp.$nuxt.$pinia),
    course: new CourseModule($api, nuxtApp.vueApp.$nuxt.$pinia),
    finance: new FinanceModule($api, nuxtApp.vueApp.$nuxt.$pinia),
  };

  return {
    provide: {
      api: $api,
      module: $modules,
    },
  };
});
