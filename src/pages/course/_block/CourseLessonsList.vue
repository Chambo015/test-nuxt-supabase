<template>
  <div :class="{ 'mb-4 ml-auto max-w-[400px] rounded-xl bg-white p-6 shadow-sm max-lg:max-w-full': !insideSidebar }">
    <p v-if="!insideSidebar" class="m-0 text-base font-bold">
      {{ $t("actions.listLessons") }}
    </p>
    <ul class="pt-6">
      <li
        v-for="journal in journalStore.list"
        :key="journal.id"
        class="mb-4 flex gap-3 rounded-xl px-4 pb-6 pt-7 ring-gray-300 transition-all hover:shadow-md"
        :class="[journal.id === journalStore.detail?.id ? 'ring-2 ring-violet-600' : 'ring-1', journal.is_started ? 'cursor-pointer' : 'cursor-default']"
        @click="journal.is_started || journal.is_done ? selectJournal(journal) : null"
      >
        <div
          class="flex size-9 shrink-0 items-center justify-center  rounded-full border"
          :class="{
            'border-[#734CC9]': journal.is_started && !journal.is_done,
            'border-transparent bg-[#219653]': journal.is_done,
            'border-black/30': !journal.is_started,
          }"
        >
          <i
            v-if="journal.is_done"
            class="pi pi-check"
            style="color: white"
          ></i>
          <svg
            v-else-if="journal.is_started"
            class="relative translate-x-0.5"
            fill="none"
            height="15"
            viewBox="0 0 9 15"
            width="9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M0 14.451c0 .252.297.387.487.222l7.679-6.698a.294.294 0 0 0 0-.443L.489.792A.294.294 0 0 0 0 1.013v13.438Z"
              fill="#734CC9"
              fill-rule="evenodd"
            />
          </svg>
          <i
            v-else
            class="pi pi-lock"
            style="color: gray"
          ></i>
        </div>
        <div>
          <p class="select-none text-sm text-violet-500">
            {{ journal.article?.name }}
          </p>
          <span class="select-none text-gray-600">{{ journal.course?.name }}</span>
        </div>
      </li>
    </ul>
    <!--  <Button class="w-full bg-violet-600">
      {{ $t("pages.course.allLessons") }}
    </Button> -->
  </div>
</template>

<script setup lang="ts">
import type { JournalDetail } from "~/shared/models/journal.model";

defineProps<{
  insideSidebar?: boolean
}>();
const emit = defineEmits(["onClose"]);
const journalStore = useJournalStore();
const router = useRouter();

function selectJournal(journal: JournalDetail) {
  router.replace({ query: { article: journal.article?.id } });
  journalStore.detail = journal;
  emit("onClose");
  window.scrollTo({
    behavior: "smooth",
    top: 0,
  });
}
</script>

<style scoped>

</style>
