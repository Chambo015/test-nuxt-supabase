<template>
  <div class="border border-white/50 px-6 py-[15px] max-md:px-4 max-md:py-3" :style="{backgroundColor: bgColor ? bgColor : bg[type]}">
    <div class="flex items-center gap-[10px] [&>svg]:shrink-0">
      <template v-if="type === 'warn' || type === 'info'"><WarningIcon :class="[ type === 'info' ? 'text-black' : 'text-white']" /></template>
      <template v-if="type === 'success'"><DoneCircle /></template>
      <template v-if="type === 'question'"><QuestionIcon /></template>
      <h5 v-if="title" :class="['text-xl !leading-tight font-semibold font-inter' , type === 'info' ? 'text-black' : 'text-white']">{{ title }}</h5>
      <template v-else>
        <slot name="title" />
      </template>
    </div>
    <div v-if="$slots.default || text" class="mt-1">
      <p v-if="!$slots.default && text">{{ text }}</p>
      <template v-else>
        <slot />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import DoneCircle from "~/shared/components/icons/done-circle.vue";
import WarningIcon from "~/shared/components/icons/warning-icon.vue";
import QuestionIcon from "~/shared/components/icons/question-icon.vue";

type AlertType = 'warn' | 'info' | 'success' | 'question'

interface Props {
  title?: string;
  type: AlertType;
  text?: string;
  bgColor?: string
}
defineProps<Props>();

const bg: Record<AlertType, string> = {
  warn: '#FF6363',
  info: '#D8D8D8',
  success: '#2ECE2B',
  question: '#FC67FA'
};
</script>

<style scoped></style>
