<template>
  <Dialog
    v-model:visible="journalStore.testModal"
    class="m-4 bg-white sm:m-0"
    :header="$t('actions.check')"
    modal
    :style="{ width: 'min(95vw, 440px)' }"
  >
    <div
      v-for="t in journalStore.currentTest?.tests"
      :key="t.question_id"
      class="mb-5"
    >
      <label class="text-base font-medium" for="answer">{{ t.question }}</label>
      <InputText
        v-if="t.type === 1"
        id="answer"
        v-model="form[t.question_id].answer_str"
        autocomplete="off"
        class="mt-1 h-10 w-full font-light"
        name="answer"
      />
      <Dropdown
        v-if="t.type === 2"
        v-model="form[t.question_id].answer_str"
        class="mt-1 w-full"
        option-label="option"
        option-value="id"
        :options="t.options"
        :placeholder="$t('actions.placeholder.chooseAnswerOption')"
        :pt="{
          item: '!whitespace-normal',
        }"
      />
    </div>
    <Button class="w-full bg-violet-600" @click="send">
      {{ $t("actions.saveButton") }}
    </Button>
  </Dialog>
</template>

<script setup lang="ts">
import { useJournalStore } from "~/shared/store/journal.store";
import { JournalRepository } from "~/shared/repository/journal.repository";
import type { AnswerTestDto } from "~/shared/dto/test.dto";

interface FormTest extends Omit<AnswerTestDto, "answer_id"> {
  type: number
}

const emit = defineEmits(["finish"]);
const journalStore = useJournalStore();

const form = reactive(journalStore.currentTest
  ? journalStore.currentTest.tests.reduce<{ [key: string]: FormTest }>((acc, t) => {
    acc[t.question_id] = {
      type: t.type,
      question_id: t.question_id,
      answer_str: undefined,
    };
    return acc;
  }, {})
  : {});

function send() {
  if (!journalStore.currentTest) return;
  if (!Object.keys(form).length) return;

  const normalize: AnswerTestDto[] = Object.values(form).filter(e => e.answer_str).map((e) => {
    return {
      question_id: e.question_id,
      answer_id: e.type === 1 || !e.answer_str ? null : +e.answer_str,
      answer_str: e.type === 1 ? `${e.answer_str}` : "",
    };
  });

  if (!normalize.length) return;

  JournalRepository.sendTest({
    answers: normalize,
  }, journalStore.currentTest?.journalId, journalStore.currentTest?.testId).then(() => {
    emit("finish", true);
  });
}
</script>

<style scoped lang="scss"></style>
