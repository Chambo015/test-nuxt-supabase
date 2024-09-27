import type { JournalDetail } from "~/shared/models/journal.model";
import type { Test } from "~/shared/models/test.model";

interface JournalStateType {
  list: JournalDetail[]
  detail?: JournalDetail // this current lesson when open course page
  currentTest: {
    journalId: number
    testId: number
    tests: Test[]
  } | null
  testModal: boolean
}

export const useJournalStore = defineStore("journal", {
  state: (): JournalStateType => ({
    list: [],
    detail: undefined,
    currentTest: null,
    testModal: false,
  }),
  getters: {
    byModules: (store) => {
      return store.list.reduce<{ moduleId: number, moduleName: string, journalList: JournalDetail[], is_done?: boolean }[]>((acc, journal) => {
        if (!journal.module) return acc;
        const _idModule = journal.module.id;
        const module = acc.find(m => m.moduleId === _idModule);
        if (module) {
          module.journalList.push(journal);
        } else {
          acc.push({ moduleId: _idModule, moduleName: journal.module?.name, journalList: [journal] });
        }
        return acc;
      }, []);
    },
  },
  actions: {
    setList(payload: JournalDetail[]) {
      const route = useRoute();
      const _article_id = route.query.article ? +route.query.article : null;

      if (_article_id) {
        const _filter = payload.filter((e) => {
          return e.article?.id === _article_id && (e.is_done || e.is_started);
        });
        if (_filter.length) {
          this.setJournalDetail(_filter[0]);
        } else {
          this.setJournalDetail(
            payload.filter(e => e.is_started && !e.is_done)[0],
          );
        }
      } else {
        const _find = payload.filter(
          (e: JournalDetail) => e.is_started && !e.is_done,
        )[0];

        _find
          ? this.setJournalDetail(_find)
          : this.setJournalDetail(payload[0]);
      }
      this.list = payload;
    },
    async setJournalDetail(payload: JournalDetail) {
      this.detail = undefined;
      this.detail = payload;
    },
    setTest(payload: Test[], journalId: number, testId: number) {
      this.currentTest = {
        journalId,
        testId,
        tests: payload,
      };
      this.testModal = true;
    },
  },
});
