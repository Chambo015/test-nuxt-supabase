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

  return {
    changeEmail,
  };
}
