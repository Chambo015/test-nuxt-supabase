<template>
  <template v-if="variant === 'buy'">
    <UIButtonBuyCourse v-if="!course.is_free && !course.is_purchased" @click="e => handleBuyCourse(e, course)" />
  </template>
  <template v-if="variant === 'start'">
    <UIButtonStartCorse @click="e => handleBuyCourse(e, course)" />
  </template>
</template>

<script setup lang="ts">
import UIButtonBuyCourse from "./UIButtonBuyCourse.vue";
import UIButtonStartCorse from "./UIButtonStartCorse.vue";
import { useStartCourse } from "~/features/startCourse";
import { useLocalizatedRouter } from "~/shared/composables/useLocalizatedRouter";
import { usePaymentsStore } from "~/shared/store/payments.store";
import type { Course } from "~/types/course.type";

const props = defineProps<{
  course: Course
  variant: "buy" | "start"
}>();

const { localeNavigateTo } = useLocalizatedRouter();
const paymentsStore = usePaymentsStore();
const { startCourse } = useStartCourse(() => props.course, {
  callPayCourse(onSuccess) {
    paymentsStore.showModal({ currentBuyCourse: props.course, onSuccessPay: onSuccess });
  },
});

function handleBuyCourse(e: MouseEvent, course: Course) {
  e.preventDefault();
  e.stopPropagation();

  if (course.id === 1) {
    return localeNavigateTo("/awareness");
  } else {
    // if (course.is_purchased) return toast.add({ severity: "warn", summary: "Оплачено", detail: "Курс уже приобретен", life: 3000 });
    startCourse();
  }
}
</script>
