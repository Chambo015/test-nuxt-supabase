<template>
  <div class="max-md:px-4">
    <Accordion>
      <AccordionTab
        v-for="m in journalStore.byModules"
        :key="m.moduleId"
        :pt="{
          root: 'mb-4 bg-white rounded-xl',
          headeraction: 'p-6 hover:bg-[#f1f5f9] !rounded-xl',
          content: '!p-2',
        }"
      >
        <template #header>
          <span class="w-full items-center">
            <div class="flex items-center justify-between text-xl font-normal text-violet-600 max-md:flex-col max-md:items-start max-md:gap-1 max-md:text-base">
              <p class="shrink-1 w-fit grow font-NeueMachina">{{ m.moduleName }}</p>
              <span class="mx-3 shrink-0 text-nowrap rounded-2xl bg-gray-200 p-1 px-3 text-sm font-light text-gray-500 max-md:mx-0 ">
                {{ m.journalList.length }} {{ $t("pages.course.lessons") }}
              </span>
            </div>
          </span>
        </template>
        <template #default>
          <div
            v-for="(art, idx) in m.journalList"
            :key="art.id"
            class="mb-1 items-center justify-between rounded-lg p-4 font-inter last:mb-0"
            :class="[art.is_done ? 'flex bg-green-500/15' : 'hover:bg-[#f1f5f9] sm:flex']"
          >
            <div class="cursor-pointer" @click="art.is_started || art.is_done ? selectJournal(art) : null">
              <p class="text-gray-950">
                {{ $t("pages.course.lesson") }} {{ idx + 1 }}
              </p>
              <p class="text-sm font-light text-gray-500">
                {{ art.article?.name }}
              </p>
            </div>

            <div v-if="art.is_done" class="flex size-9 shrink-0 items-center justify-center  rounded-full bg-[#219653]">
              <ICheck class="mb-0 text-lg text-white" filled />
            </div>
            <button
              v-if="art.article_test_id && !art.is_done_article_test"
              class="cursor-pointer text-nowrap text-base text-violet-600"
              @click="(art.can_go_next || art.is_started) ? test(art.id, art.article_test_id) : toastCantNextTest()"
            >
              {{ $t("pages.course.startExecution") }}
              <i class="pi pi-arrow-right ml-2 mt-2 sm:mt-0"></i>
            </button>
          </div>
        </template>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import { JournalRepository } from "~/shared/repository/journal.repository";
import type { JournalDetail } from "~/shared/models/journal.model";
import ICheck from "~/assets/images/icons/check.svg";
import { useLocalizatedRouter } from "~/shared/composables/useLocalizatedRouter";

const toast = useToast();
const { t } = useI18n();

const { localeRouter } = useLocalizatedRouter();
const journalStore = useJournalStore();

function selectJournal(journal: JournalDetail) {
  localeRouter.replace({ query: { article: journal.article?.id } });
  journalStore.detail = journal;
}

function test(journal: number, test_id: number) {
  JournalRepository.getTestById(journal, test_id);
}

function toastCantNextTest() {
  toast.add({
    severity: "error",
    detail: t("message.testCantNext"),
    life: 3000,
  });
}
</script>
