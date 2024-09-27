import type { Lesson, PublicLesson } from "~/types/lesson.type";

interface Props {
  onNotFoundPublicLesson: (lesson: Lesson) => void
}

export async function usePublicLesson(props: Props) {
  const { onNotFoundPublicLesson } = props;

  const { $module } = useNuxtApp();
  const authStore = useAuthStore();
  const courseStore = useCourseStore();

  const currentPublicLesson = ref<PublicLesson>();
  const visibleModalVideoLesson = ref(false);

  const { data: publicLessonsList, execute: fetchOpenLessons } = await $module.course.getPublicLesson({
    asyncDataOptions: {
      immediate: false,
      server: false,
    },
  });

  async function handleClickLesson(lesson: Lesson) {
    if (!authStore.isLoggedIn) {
      await fetchOpenLessons();

      let foundPublicLesson: PublicLesson | undefined;

      if (publicLessonsList.value?.data && publicLessonsList.value?.data.length) {
        foundPublicLesson = publicLessonsList.value?.data.find(v => v.lesson_id === lesson.id);
      }

      if (foundPublicLesson) {
        currentPublicLesson.value = foundPublicLesson;
        visibleModalVideoLesson.value = true;
        return;
      }
    }

    visibleModalVideoLesson.value = false;
    courseStore.setCurrentLesson(lesson);
    onNotFoundPublicLesson(lesson);
  }

  return {
    handleClickLesson,
    visibleModalVideoLesson,
    currentPublicLesson,
  };
}
