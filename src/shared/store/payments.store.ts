import type { Course } from "~/types/course.type";
import type { Invoice, ParticipantOfGroupIS } from "~/types/finance.type";

interface PaymentsStateType {
  displayModal: boolean
  currentBuyCourse: Course | null
  callbackSuccessPay: (() => void) | null
  currentInvoice: Invoice | null
  currentParticipantsList: ParticipantOfGroupIS[] | null
};

export const usePaymentsStore = defineStore("payments", {
  state: (): PaymentsStateType => ({
    displayModal: false,
    currentBuyCourse: null,
    callbackSuccessPay: null,
    currentInvoice: null,
    currentParticipantsList: null,
  }),
  actions: {
    showModal(payload: { currentBuyCourse: Course, onSuccessPay?: () => void }) {
      if (!payload.currentBuyCourse) return;

      this.displayModal = true;
      this.currentBuyCourse = payload.currentBuyCourse;
      this.callbackSuccessPay = payload.onSuccessPay || null;
    },
    closeModal() {
      this.$reset();
    },
    onSuccessPay() {
      const callback = this.callbackSuccessPay;
      if (callback) {
        callback();
        this.closeModal();
      }
    },
    async getInvoice(payload: { isGift: boolean, enableCabinetIS: boolean, courseId?: number | string, inviteCount?: number }) {
      const { $module, $toast } = useNuxtApp();
      const { courseId, enableCabinetIS, isGift, inviteCount } = payload;
      try {
        if (!courseId) return;
        const response = await $module.finance.getInvoiceByCourse({
          course_id: courseId,
          enableCabinetIS,
          is_group: isGift,
          user_count: inviteCount,
        });
        this.currentInvoice = response.data;
        return response.data;
      } catch (error) {
        console.error("@getInvoice", error);
        $toast.error({ summary: "Fail getInvoiceId", detail: "Не удалось загрузить счет", life: 3000 });
      }
    },
    async getParticipantsList(payload: { groupId?: number | string }) {
      const { $module, $toast } = useNuxtApp();
      const { groupId } = payload;
      try {
        if (!groupId) return;
        const response = await $module.finance.getParticipantsByGroupId(groupId);
        this.currentParticipantsList = response.data;
        return response.data;
      } catch (error) {
        console.error("@ParticipantsList", error);
        $toast.error({ summary: "Fail ParticipantsList", detail: "Не удалось получить список участников группы", life: 3000 });
      }
    },
    async setParticipantsList(payload: { participants: { email: string }[] }) {
      if (!this.currentParticipantsList || !this.currentInvoice?.group?.id) return null;
      const { $module, $toast } = useNuxtApp();
      const { participants } = payload;
      const groupId = this.currentInvoice?.group?.id;
      const participantsWithId = this.currentParticipantsList?.map((p, idx) => {
        return { id: p.id, email: participants[idx].email };
      });
      try {
        const response = await $module.finance.setParticipantsByGroupId({ groupId, participants: participantsWithId });
        this.currentParticipantsList = response.data;
        return response.data;
      } catch (error) {
        console.error("@setParticipantsList", error);
        $toast.error({ summary: "Fail Set ParticipantsList", detail: "Не удалось записать участников группы", life: 3000 });
      }
    },
  },
});
