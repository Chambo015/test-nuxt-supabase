export function useParticipant() {
  const { $module, $toast } = useNuxtApp();

  const changeEmail = async ({ participantId, email }: { participantId: number, email: string }) => {
    try {
      if (!participantId) return { ok: false, data: null };
      const response = await $module.finance.changeParticipantEmail({ participantId, newEmail: email });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("@Fail set Participant Email", error);
      $toast.error({ summary: "Fail Participant Email", detail: `Не удалось задать email ${email}`, life: 3000 });
      return { ok: false, data: null };
    }
  };

  const sendMail = async ({ participantId }: { participantId: number | string }) => {
    try {
      if (!participantId) return { ok: false, data: null };
      const response = await $module.finance.sendMailToParticipant(participantId);
      if (response) {
        $toast.success({ summary: "Отправлено" });
        return { ok: true, data: response };
      } else {
        return { ok: false, data: null };
      }
    } catch (error) {
      console.error("@Fail sendMail to participant", error);
      $toast.error({ summary: "Fail Send Mail to participant", detail: "Не удалось отправить письмо" });
      return { ok: false, data: null };
    }
  };

  return {
    changeEmail,
    sendMail,
  };
}
