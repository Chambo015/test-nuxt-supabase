import { thousandSeparator } from "~/shared/utils";
import type { Course as CourseDTO } from "~/types/course.type";

export class MyCourseAdapter {
  private target: CourseDTO;
  protected i18n = useNuxtApp().$i18n.t;

  constructor(target: CourseDTO) {
    this.target = target;
  }

  get status() {
    if (this.target.journal?.is_done) {
      return this.i18n("message.courseDone");
    }
    if (this.target.current_journal_detail) {
      const journalDetail = this.target.current_journal_detail;

      if (journalDetail.journal?.is_done) {
        return this.i18n("message.courseDone");
      }
      if (journalDetail.module?.name) {
        return journalDetail.module?.name;
      }
    }
    return this.i18n("message.notStarted");
  }

  protected get adaptedPrice() {
    return thousandSeparator(this.target.price);
  }

  adapt() {
    return {
      ...this.target,
      status: this.status,
      adaptedPrice: this.adaptedPrice,
    };
  }
};
