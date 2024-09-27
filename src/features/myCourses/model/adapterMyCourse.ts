import type { JournalDetail } from "~/types/journal.type";
import type { Course as CourseDTO } from "~/types/course.type";

// export function getStatusMyCourse(JournalDetail: JournalDetail) {
//   const { $i18n } = useNuxtApp();

//   if (JournalDetail.journal?.is_done) {
//     return $i18n.t("message.courseDone");
//   }
//   if (JournalDetail.module?.name) {
//     return JournalDetail.module?.name;
//   }
// }

export class MyCourseAdapter {
  private target: CourseDTO;
  protected i18n = useNuxtApp().$i18n.t;

  constructor(target: CourseDTO) {
    this.target = target;
  }

  get status() {
    if (this.target.current_journal_detail) {
      const journalDetail = this.target.current_journal_detail;

      if (journalDetail.journal?.is_done) {
        return this.i18n("message.courseDone");
      }
      if (journalDetail.module?.name) {
        return journalDetail.module?.name;
      }
    }
    return "Not Status";
  }

  adapt() {
    return {
      ...this.target,
      status: this.status,
    };
  }
};
