<template>
  <div>
    <NuxtLayout name="aside-container">
      <main class="overflow-x-hidden pt-[30px] max-2xl:pr-4 max-md:px-4">
        <h1 class="mb-5 font-NeueMachina text-2xl font-black text-[#3B3551]">
          Прогресс прохождения по платным курсам
        </h1>
        <div class="broder-[#E5E7EB] rounded-3xl border bg-white px-7 py-[26px] max-md:p-0">
          <DataTable
            :loading="status !== 'success'"
            :pt="{
              column: {
                headercell: 'text-sm font-inter !font-medium !bg-[#FAFAFA] first:rounded-tl-[10px] last:rounded-tr-[10px]',
                bodycell: 'group-last/bodyrow:first:rounded-bl-[10px] group-last/bodyrow:last:rounded-br-[10px] text-sm',
              },
              bodyrow: 'bg-black group/bodyrow',
            }"
            show-gridlines
            :table-style="{ 'min-width': '50rem' }"
            :value="data.data"
          >
            <Column :field="GroupISDataFields.course" header="Курс">
              <template #body="slotProps">
                <NuxtLink class="text-[#734CC9]" :to="`/cabinet-infosecurity/progress/${slotProps.data.id}`">
                  {{ slotProps.data[slotProps.field] }}
                </NuxtLink>
              </template>
            </Column>
            <Column :field="GroupISDataFields.date" header="Дата покупки" />
            <Column :field="GroupISDataFields.price" header="Стоимость">
              <template #body="slotProps">
                {{ slotProps.data[slotProps.field] }}
                <Tag v-if="!slotProps.data.is_payed" class="ml-2" severity="danger" value="Не оплачен" />
              </template>
            </Column>
            <Column :field="GroupISDataFields.allParticipants" header="Всего пользователей" />
            <Column :field="GroupISDataFields.finishedUserCount" header="Завершили курс" />
          </DataTable>
        </div>
      </main>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Parse } from "~/shared/parse";

enum GroupISDataFields {
  course = "course_name",
  date = "created_at",
  price = "price",
  finishedUserCount = "finished_user_count",
  allParticipants = "all_participants",
}

const { $module } = useNuxtApp();

const { data, status } = await $module.finance.getAllGroups({
  asyncDataOptions: {
    transform(res) {
      return {
        ...res,
        data: res.data.map((group) => {
          return {
            ...group,
            created_at: Parse.date(group.created_at),
            finished_user_count: Parse.number(group.finished_user_count),
            all_participants: `${Parse.number(group.accepted_user_count)} / ${Parse.number(group.total_user_count)}`,
            price: `${Parse.number(group.price)} тг`,
          };
        }),
      };
    },
    lazy: true,
    server: false,
  },
});
</script>
