<template>
  <div>
    <span v-if="isSuccess" class="text-main-purple">Отправлено</span>
    <Button v-else label="Отправить повторно" size="small" @click="handleClick" />
  </div>
</template>

<script setup lang="ts">
import { useParticipant } from "../model";

const props = defineProps<{
  participantId: number | string
}>();

const { sendMail } = useParticipant();

const isSuccess = ref(false);

async function handleClick() {
  const res = await sendMail({ participantId: props.participantId });

  if (res.data && res.ok) {
    isSuccess.value = true;
  };
};
</script>

<style scoped>

</style>
