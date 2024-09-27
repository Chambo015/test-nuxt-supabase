import type { AnswerTestDto } from "../dto/test.dto";
import { useFetchApi } from "~/shared/composables/useHttp";
import { Parse } from "~/shared/parse";
import { HttpMethod } from "~/shared/enums/http.enum";
import { useJournalStore } from "~/shared/store/journal.store";
import { JournalDetail } from "~/shared/models/journal.model";
import { Test } from "~/shared/models/test.model";
import { useCi18n } from "~/shared/composables/useCi18n";

export class JournalRepository {
  static async getByCourse(course: number) {
    const data = await useFetchApi({
      url: `course/journal/get-by-course/${course}`,
      headers: {
        method: HttpMethod.GET,
      },
    });
    await this.getDetails(data.journal.id);
  }

  static async getDetails(journal: number) {
    const data = await useFetchApi({
      url: `course/journal/get-details/${journal}`,
      headers: {
        method: HttpMethod.GET,
      },
    });

    useJournalStore().setList(
      Parse.list<JournalDetail>(data.data, JournalDetail.fromJson),
    );
  }

  static async getTestById(journal: number, test: number) {
    const data = await useFetchApi({
      url: `course/journal/get-test/${journal}/${test}`,
      headers: {
        method: HttpMethod.GET,
      },
      errorMessage: useCi18n("message.testPassed"),
    });

    useJournalStore().setTest(Parse.list(data.data, Test.fromJson), journal, test);
  }

  static async nextJournal(journal: number) {
    // Response is next journal(lesson)
    await useFetchApi({
      url: `course/journal/go-next/${journal}`,
      headers: {
        method: HttpMethod.GET,
      },
      successMessage: useCi18n("message.lessonPassed"),
      errorMessage: useCi18n("message.testFailed"),
    });
  }

  static async sendTest(form: { answers: AnswerTestDto[] }, journalId: number, testId: number) {
    await useFetchApi({
      url: `course/journal/done-test/${journalId}/${testId}`,
      headers: {
        method: HttpMethod.POST,
        body: form,
      },
    });
  }
}
