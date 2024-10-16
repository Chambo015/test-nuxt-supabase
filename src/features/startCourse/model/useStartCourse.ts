import type { LocationQueryRaw, RouteLocationRaw } from "vue-router";
import { AuthModalType, StatusCode } from "~/shared/enums";
import type { Course } from "~/types/course.type";

interface optProps {
  /** Вызывается для оплаты курса */
  callPayCourse?: (onSuccess: () => Promise<void> | void | Promise<ReturnType<typeof navigateTo>>) => void
}

interface startCourseProps {
  queryCourseLink?: LocationQueryRaw
}

export function useStartCourse(course: MaybeRefOrGetter<Course | null>, options?: optProps) {
  const { callPayCourse } = options || {};

  const { $module, $i18n } = useNuxtApp();
  const localeRoute = useLocaleRoute();
  const tost = useToast();
  const authStore = useAuthStore();

  const courseId = computed<number | null>(() => toValue(course)?.id || null);
  const isPurchased = computed<boolean>(() => toValue(course)?.is_purchased || false);
  const isFree = computed<boolean>(() => toValue(course)?.is_free || false);

  async function startCourse(props?: startCourseProps) {
    if (!authStore.isLoggedIn) return (authStore.modal = AuthModalType.LOGIN);
    if (!courseId.value) return;

    const { queryCourseLink } = props || {};
    const navigateToCourse = () => navigateTo(localeRoute({ path: `/course/${courseId.value}`, query: queryCourseLink })?.fullPath);

    /** Если курс бесплатный и он есть в Моих Курсах, переходим к курсу */
    if (isFree && authStore.courseIds.includes(courseId.value)) return navigateToCourse();
    /** Если курс Платный и не был приобретен, то вызываем ПокупкуКурса(callPayCourse) и при успешной оплате переходим к курсу */
    if (!isPurchased.value && !isFree.value && callPayCourse) return callPayCourse(async () => await navigateToCourse());
    /** Если курс Приобретен или Бесплатный, но его нету в Моих Курсах то мы стартуем данный курс */
    if (!authStore.courseIds.includes(courseId.value)) {
      await $module.course.startCourse(courseId.value, {
        fetchOptions: {
          onResponse({ response }) {
            if (response.status === StatusCode.Success) {
              navigateToCourse();
              tost.add({
                severity: "success",
                summary: "Отлично",
                detail: "Курс начался",
                life: 3000,
              });
            };
          },
          onResponseError({ response }) {
            if (response.status === StatusCode.NotFound) {
              tost.add({
                severity: "error",
                summary: $i18n.t("message.fail"),
                detail: $i18n.t("message.not_payed_access_to_course"),
                life: 3000,
              });
            }
          },
        },
      });
    }
    // await navigateToCourse();
  };

  return {
    startCourse,
  };
}
