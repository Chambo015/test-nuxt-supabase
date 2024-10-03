// 3rd's
// locals
import FetchFactory from "../factory";
import type { Options } from "../options";
import type { ResponseWithMeta } from "~/types/response.type";
import { HttpMethod } from "~/shared/enums/http.enum";
import type { GroupIS, Invoice, ParticipantOfGroupIS } from "~/types/finance.type";

class FinanceModule extends FetchFactory {
  private RESOURCE = "course/journal/finance";

  /** Получаем Счет на оплату и Группу если мы ее включаем */
  async getInvoiceByCourse(
    params: { course_id: number | string, user_count?: number, is_group: boolean, enableCabinetIS: boolean },
    options?: Options<{ data: Invoice }>,
  ) {
    const { course_id, user_count, enableCabinetIS = false, is_group = false } = params;

    const fetchUrl = `${this.RESOURCE}/get-invoice/${course_id}?is_group=${
      is_group ? "true" : "false"}&is_ib=${
      enableCabinetIS ? "true" : "false"}${
      user_count ? `&user_count=${user_count}` : ""}`;

    return this.call<{ data: Invoice }>(
      fetchUrl,
      {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
      },
    );
  }

  async checkInvoice(invoice_id: string, options?: Options<{ data: Invoice }>) {
    return this.call<{ data: Invoice }>(
      `${this.RESOURCE}/check-invoice/${invoice_id}`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
      },
    );
  }

  async getParticipantsByGroupId(groupId: string | number, options?: Options<{ data: ParticipantOfGroupIS[] }>) {
    return this.call<{ data: ParticipantOfGroupIS[] }>(
      `${this.RESOURCE}/participants/get-group/${groupId}`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
      },
    );
  }

  async setParticipantsByGroupId(
    { groupId, participants }: { groupId: string | number, participants: { id: number, email: string }[] },
    options?: Options<{ data: ParticipantOfGroupIS[] }>,
  ) {
    return this.call<{ data: ParticipantOfGroupIS[] }>(
      `${this.RESOURCE}/participant/massive-change-email`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.PUT,
        body: {
          group_id: groupId,
          participants,
        },
      },
    );
  }

  async changeParticipantEmail(
    { newEmail, participantId }: { participantId: number, newEmail: string },
    options?: Options<{ data: ParticipantOfGroupIS }>,
  ) {
    return this.call<{ data: ParticipantOfGroupIS }>(
      `${this.RESOURCE}/participant/change-email`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.PUT,
        body: {
          participant_id: participantId,
          email: newEmail,
        },
      },
    );
  }

  async sendMailToParticipant(participantId: number | string, options?: Options<boolean>) {
    return this.call<boolean>(
      `${this.RESOURCE}/participant/send-mail/${participantId}`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.PUT,
      },
    );
  }

  async checkGroupIsFilled(groupId: string | number, options?: Options<unknown>) {
    return this.call<unknown>(
      `${this.RESOURCE}/participant/check-group-is-filled/${groupId}`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
      },
    );
  }

  async getAllGroups(options?: Options<ResponseWithMeta<GroupIS[]>>) {
    const { asyncDataOptions, fetchOptions } = options || {};

    return useAsyncData(
      "groupsIS",
      () => {
        return this.call<ResponseWithMeta<GroupIS[]>>(
        `${this.RESOURCE}/participants/groups`,
        {
          ...fetchOptions,
          method: HttpMethod.GET,
        },
        );
      },
      {
        ...asyncDataOptions,
        lazy: true,
        default() {
          return {
            data: [],
          };
        },
      },
    );
  }

  async getGroupById(groupId: number | string, options?: Options<{ data: GroupIS }>) {
    const { fetchOptions } = options || {};

    return this.call<{ data: GroupIS }>(
        `${this.RESOURCE}/participants/group/${groupId}`,
        {
          ...fetchOptions,
          method: HttpMethod.GET,
        },
    );
  }
}

export default FinanceModule;
