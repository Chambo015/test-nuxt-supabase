import { $fetch } from "ofetch";
import { useAuthStore } from "~/shared/store/auth.store";
import { useCToast } from "~/shared/composables/useCToast";
import type { HttpDto } from "~/shared/dto/http.dto";
import { StatusCode } from "~/shared/enums/http.enum";
import { useCi18n } from "~/shared/composables/useCi18n";

export const useFetchApi = (http: HttpDto): Promise<any> => {
  const authStore = useAuthStore();
  const toast = useCToast();
  return $fetch(http.url, {
    baseURL: useRuntimeConfig().public.BaseAPIUrl,
    ...http.headers,
    async onRequest({ request, options }) {
      if (!!authStore.token) {
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
    async onRequestError({ request, options, error }) {},
    async onResponse({ request, response, options }) {
      if (!!http.successMessage && (response.status === StatusCode.Success || response.status === StatusCode.Created)) {
        toast.success({
          detail: http.successMessage,
        });
      }
    },
    async onResponseError({ request, response, options }) {
      switch (response.status) {
        case StatusCode.InternalServerError:
          toast.error({
            summary: `${StatusCode.InternalServerError}`,
            detail: useCi18n("message.500"),
          });
          return;
        case StatusCode.BadRequest:
          toast.error({
            severity: "error",
            detail: http.errorMessage ?? useCi18n("message.Failure"),
            life: 3000,
          });
          break;
        case StatusCode.NotFound:
          console.log(http);
          toast.info({
            detail: http.errorMessage ?? useCi18n("message.Failure"),
          });
          break;
        case StatusCode.ValidationError:
          const data = Object.entries(response?._data?.errors as Record<string, string[]>)
          toast.error({
            detail: data.length > 0 ? useCi18n(data[0][1][0], { field: data[0][0] }) : http.errorMessage,
            life: 5000,
          });
          break;
      }
    },
  });
};
