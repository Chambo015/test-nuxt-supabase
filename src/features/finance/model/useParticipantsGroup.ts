import { number } from "yup";

export function useParticipantsGroup() {
  const { $module, $toast } = useNuxtApp();

  const getParticipantsList = async ({ groupId }: { groupId?: number | string }) => {
    try {
      if (!groupId) return;
      const response = await $module.finance.getParticipantsByGroupId(groupId);
      console.log('@response getParticipantsByGroupId', response);
      return response.data;
    } catch (error) {
      console.error("@Fail ParticipantsList", error);
      $toast.error({ summary: "Fail ParticipantsList", detail: "Не удалось получить список участников группы", life: 3000 });
    }
  };

  const setParticipantEmail = async ({ participantId, email }: { participantId: number, email: string }) => {
    try {
      if (!participantId) return;
      const response = await $module.finance.changeParticipantEmail({ participantId, newEmail: email });
      console.log('@response changeParticipantEmail', response);
      return response.data;
    } catch (error) {
      console.error("@Fail set Participant Email", error);
      $toast.error({ summary: "Fail Participant Email", detail: `Не удалось задать email ${email}`, life: 3000 });
    }
  };

  const checkGroupIsFilled = async ({ groupId }: { groupId?: number | string }) => {
    try {
      if (!groupId) return;
      const response = await $module.finance.checkGroupIsFilled(groupId);
      console.log('@response checkGroupIsFilled', response);
      return response;
    } catch (error) {
      console.error("@Fail Check Group filled", error);
      $toast.error({ summary: "Fail Group filled", detail: "Группа участников не заполнена полностью", life: 3000 });
    }
  };

  return {
    getParticipantsList,
    setParticipantEmail,
    checkGroupIsFilled,
  };
}
