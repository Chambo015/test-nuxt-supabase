<template>
  <div class="flex ">
    <div class="relative flex items-center">
      <InputText
        v-model="email"
        autofocus
        :pt="{
          root: '!py-2 pr-[70px]',
        }"
      />
      <!-- <InputIcon class="pi pi-spin pi-spinner" /> -->
      <div class="absolute right-2 top-1/2 z-10 flex -translate-y-1/2 items-center gap-2">
        <button class="flex size-4 items-center justify-center" @click.prevent.stop="onSave">
          <InputIcon class="pi pi-check" />
        </button>
        <button class="flex size-4 items-center justify-center" @click.prevent.stop="$emit('cancel', $event)">
          <InputIcon class="pi pi-times" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useParticipant } from "../model";
import { Parse } from "~/shared/parse";

export interface Props {
  email: string
  id: string | number
}

const props = withDefaults(defineProps<Props>(), {
  email: "",
});

const emits = defineEmits<{
  save: [event: Event]
  cancel: [event: Event]
}>();

const email = ref<string>(props.email);
const isLoading = ref(false);

const { changeEmail } = useParticipant();

async function onSave() {
  const emailValue = email.value.trim();
  const participantId = Parse.number(props.id);
  if (!emailValue || !participantId) return;

  isLoading.value = true;
  const result = await changeEmail({ email: emailValue, participantId });
  if (result?.ok) {
    emits("save", new Event(""));
  }
  isLoading.value = false;
}
</script>

<style scoped>

</style>
