import { MyCourseAdapter } from "~/features/courses/myCourses";

export function useMyCourses() {
  const authStore = useAuthStore();
  const myCourses = computed(() => authStore.user?.journals ? authStore.user?.journals.map(j => new MyCourseAdapter(j.course).adapt()) : []);

  return {
    data: myCourses,
  };
};
