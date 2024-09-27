<template>
  <section class="relative grid grid-cols-[1fr_min(95%,670px)_1fr] gap-x-4 pt-[30px] max-xl:grid-cols-[minmax(90,1fr)_min(95%,650px)_minmax(320px,1fr)] max-lg:grid-cols-1">
    <!-- Left -->
    <div></div>
    <!-- Center -->
    <div class="pb-24 max-lg:pb-5">
      <div class="max-lg:px-4">
        <CourseBreadcrumb />
      </div>
      <template v-if="journalStore.detail">
        <div :key="journalStore.detail?.article?.name" class="mb-4 mt-8 rounded-xl bg-white p-6">
          <div class="head flex items-center gap-5">
            <Avatar
              v-if="journalStore.detail.course?.poster"
              class="size-12"
              :image="journalStore.detail.course?.poster"
              shape="circle"
            />
            <Skeleton v-else shape="circle" size="3rem" />
            <h1 class="m-0 font-manrope text-base font-semibold">
              {{ journalStore.detail?.article?.name }}
            </h1>
          </div>
          <Divider class="mb-4 mt-6" />
          <ClientOnly v-if="!!journalStore.detail.article?.kinescope">
            <div class="flex w-full flex-col items-center">
              <div class="inline-block w-[300px] shrink-0 max-md:mx-auto">
                <div style="position: relative; padding-top: 177.78%; width: 100%">
                  <iframe
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
                    allowfullscreen
                    frameborder="0"
                    :src="journalStore.detail.article?.kinescope"
                    style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"
                  ></iframe>
                </div>
              </div>
            </div>
          </ClientOnly>
          <ClientOnly v-else-if="!!journalStore.detail.article?.video">
            <VideoPlayer :poster="journalStore.detail.article?.photo" :video="journalStore.detail.article?.video" />
          </ClientOnly>
          <iframe
            v-if="journalStore.detail.article?.youtube_link"
            allowfullscreen
            class="youtube mt-6 w-full rounded-3xl"
            frameborder="0"
            :src="`https://www.youtube.com/embed/S7ncYak1ZiM?si=${journalStore.detail.article?.youtube_link.split('=')[1]}e12e12e?showinfo=0&controls=0`"
          ></iframe>
          <p class="mt-4 text-base text-gray-600" v-html="journalStore.detail.article?.note"></p>
          <template v-if="journalStore.detail.article_test_id && !journalStore.detail.is_done">
            <Button
              class="mt-5 w-full"
              severity="info"
              @click="test(journalStore.detail.id, journalStore.detail.article_test_id)"
            >
              {{ $t("actions.takeTest") }}
            </Button>
          </template>
          <template v-else-if="!journalStore.detail.is_done">
            <Button
              v-if="journalStore.list[journalStore.list.length - 1].id === journalStore.detail.id"
              class="mt-5 w-full"
              severity="info"
              @click="nextJournal(journalStore.detail.id)"
            >
              {{ $t("actions.completeLesson") }}
            </Button>
            <Button
              v-else-if="!journalStore.detail.is_done"
              class="mt-5 w-full"
              severity="info"
              @click="nextJournal(journalStore.detail.id)"
            >
              {{ $t("actions.nextLesson") }}
            </Button>
          </template>
        </div>
        <CourseModuleList />
      </template>
      <template v-else>
        <CourseSkeleton />
      </template>
    </div>
    <!-- Right -->
    <div class="pr-4 max-md:pr-0">
      <div
        v-if="journalStore.detail?.journal?.is_done"
        class="mb-4 ml-auto max-w-[400px] rounded-xl bg-white p-6 shadow-sm max-lg:max-w-full max-md:p-4"
      >
        <BlockGetCertificate />
      </div>
      <CourseLessonsList v-if="$device.isDesktop" />
      <template v-else>
        <Sidebar
          v-model:visible="visibleSidebarLesson"
          block-scroll
          :header="$t('actions.listLessons')"
          position="right"
          :pt="{
            root: 'h-[94%] rounded-l-3xl overflow-hidden',
          }"
        >
          <CourseLessonsList inside-sidebar @on-close="() => visibleSidebarLesson = false" />
        </Sidebar>
        <button
          class="fixed top-16 size-12 rounded-l-xl border bg-white shadow-md transition-[right] duration-300 will-change-[right]"
          :class="[visibleSidebarLesson ? 'right-80 z-[1102]' : 'right-0 z-10']"
          @click="visibleSidebarLesson = !visibleSidebarLesson"
        >
          |||
        </button>
      </template>
    <!--   <div class="max-w-[400px] ml-auto">
        <CourseMaterialList />
      </div> -->
    </div>
    <TestModal
      v-if="journalStore.currentTest && journalStore.testModal"
      @finish="
        () => {
          nextJournal(journalStore.currentTest?.journalId ?? 0);
          journalStore.testModal = false;
        }
      "
    />
    <ModalGetCertificate v-model="modalCertificateVisible" />
    <AlertCompleteReg v-if="!authStore.user?.is_registration_complete" />
  </section>
</template>

<script setup lang="ts">
import BlockGetCertificate from "./_block/BlockGetCertificate.vue";
import CourseBreadcrumb from "./_block/CourseBreadcrumb.vue";
import CourseLessonsList from "./_block/CourseLessonsList.vue";
import CourseSkeleton from "./_block/CourseSkeleton.vue";
import CourseModuleList from "./_block/CourseModuleList.vue";
import ModalGetCertificate from "./_block/ModalGetCertificate.vue";
import AlertCompleteReg from "~/shared/components/alerts/AlertCompleteReg.vue";
import TestModal from "~/shared/components/modals/TestModal.vue";
import VideoPlayer from "~/shared/components/VideoPlayer.vue";
import { CourseRepository } from "~/shared/repository/course.repository";
import { JournalRepository } from "~/shared/repository/journal.repository";
import { useAuthStore } from "~/shared/store/auth.store";
import { useJournalStore } from "~/shared/store/journal.store";
// import CourseMaterialList from "./_block/CourseMaterialList.vue";

definePageMeta({
  auth: true,
});

const route = useRoute();
const router = useRouter();
const journalStore = useJournalStore();
const authStore = useAuthStore();

const modalCertificateVisible = ref(false);
const visibleSidebarLesson = ref(false);

async function init() {
  await authStore.fetchUser();
  await nextTick();
  if (authStore.courseIds?.includes(+route.params.id)) {
    JournalRepository.getByCourse(+route.params.id);
  } else {
    CourseRepository.startCourse(+route.params.id);
  }
}

onMounted(() => {
  init();
  watch([() => journalStore.detail?.journal?.is_done, () => authStore.user?.is_registration_complete], ([isDoneTest, isRegDone]) => {
    if (!isDoneTest || !isRegDone) return;
    modalCertificateVisible.value = true;
  }, { immediate: true });
});

async function nextJournal(id: number) {
  await router.replace({ query: {} });
  await JournalRepository.nextJournal(id);
  await JournalRepository.getByCourse(+route.params.id);
  window.scrollTo({
    behavior: "smooth",
    top: 0,
  });
}

function test(journal: number, test_id: number) {
  JournalRepository.getTestById(journal, test_id);
}
</script>

<style scoped lang="scss">
.youtube {
  height: 410px;
}

@media only screen and (max-width: 600px) {
  .youtube {
    height: 250px;
  }
}
</style>
