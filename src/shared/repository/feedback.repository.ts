import type { IncidentDTO } from "../dto/feedback.dto";
import { useFetchApi } from "~/shared/composables/useHttp";
import { HttpMethod } from "~/shared/enums/http.enum";

const useCi18n = (msg: string) => useNuxtApp().$i18n.t(msg);

export class FeedbackRepository {
  static async incident(body: IncidentDTO) {
    return useFetchApi({
      url: "feedback/incident",
      headers: {
        method: HttpMethod.POST,
        body,
      },
      successMessage: useCi18n("message.feedbackSuccess"),
    });
  }
}
