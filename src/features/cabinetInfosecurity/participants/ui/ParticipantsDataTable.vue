<template>
  <div>
    <h1 class="mb-5 font-NeueMachina text-2xl font-black text-[#3B3551]">
      Прогресс прохождения по курсу “{{ titleCourse }}”
    </h1>
    <div class="broder-[#E5E7EB] rounded-3xl border bg-white px-7 py-[26px] max-md:p-0">
      <DataTable
        edit-mode="cell"
        :loading="isPending"
        :pt="{
          column: {
            headercell: 'text-sm font-inter !font-medium !bg-[#FAFAFA] first:rounded-tl-[10px] last:rounded-tr-[10px]',
            bodycell: 'group-last/bodyrow:first:rounded-bl-[10px] group-last/bodyrow:last:rounded-br-[10px] text-sm',
          },
          bodyrow: 'bg-black group/bodyrow',
        }"
        show-gridlines
        :table-style="{ 'min-width': '50rem' }"
        :value="sortedData"
        @cell-edit-complete="onCellEditComplete"
      >
        <Column header="#">
          <template #body="slotProps">
            <span>{{ slotProps.index + 1 }}</span>
          </template>
        </Column>
        <Column
          :field="PARTICIPANTS_DATA_FIELDS.fullName"
          header="ФИО"
          :pt="{ bodyCell: ['max-w-[150px]'] }"
        >
          <template #body="{ data: item, field }">
            {{ item[field] || "Не указано" }}
          </template>
        </Column>
        <Column
          :field="PARTICIPANTS_DATA_FIELDS.email"
          header="E-mail"
          :row-editor="true"
        >
          <template #body="{ data: item, field }">
            <span>{{ item[field] || "Не указано" }}</span>
            <i v-if="!item[PARTICIPANTS_DATA_FIELDS.is_accepted]" class="pi pi-pencil" style="margin-left: 1rem;"></i>
          </template>
          <template #editor="{ data: item, field, editorCancelCallback, editorSaveCallback }">
            <template
              v-if="!item[PARTICIPANTS_DATA_FIELDS.is_accepted]"
            >
              <ParticipantChangeEmail :id="item.id" :email="item[field]" @cancel="editorCancelCallback" @save="editorSaveCallback" />
            </template>
            <span v-else class="px-2">{{ item[field] || "Не указано" }}</span>
          </template>
        </Column>
        <Column :field="PARTICIPANTS_DATA_FIELDS.is_accepted" header="Принял приглашение">
          <template #body="slotProps">
            {{ slotProps.data[slotProps.field] ? "Да" : "Нет" }}
          </template>
        </Column>
        <Column header="Статус прохождения">
          <template #body="slotProps">
            <template v-if="slotProps.data[PARTICIPANTS_DATA_FIELDS.is_finished]">
              Прошел
            </template>
            <template v-else-if="slotProps.data[PARTICIPANTS_DATA_FIELDS.is_accepted]">
              Не прошел
            </template>
            <template v-else>
              <ButtonSendEmailParticipant :participant-id="slotProps.data.id" />
            </template>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type AdapterParticipantsReturnType, PARTICIPANTS_DATA_FIELDS } from "../model";
import { ButtonSendEmailParticipant, ParticipantChangeEmail } from ".";

const props = defineProps<{
  titleCourse: string
  data: AdapterParticipantsReturnType[]
  isPending: boolean
}>();

const sortedData = computed(() => [...props.data].sort((a, b) => a.id - b.id));

function onCellEditComplete(e: { data: AdapterParticipantsReturnType }) {
  refreshNuxtData(`participants-group-${e.data.ib_group_id}`);
}
</script>

<style scoped>

</style>
