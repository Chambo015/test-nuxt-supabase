<template>
  <div>
    <NuxtLayout name="aside-container">
      <main class="pt-[30px]">
        <div class="relative">
          <h1 class="mb-5 font-NeueMachina text-2xl font-black text-[#3B3551]">
            Прогресс прохождения по курсу “Кибергигиена”
          </h1>
        </div>
        <div class="broder-[#E5E7EB] rounded-3xl border bg-white px-7 py-[26px] max-md:p-0">
          <DataTable
            edit-mode="cell"
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
            :value="data?.data"
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
              </template>
            </Column>
            <Column header="Статус прохождения">
              <template #body="slotProps">
                <template v-if="slotProps.data[PARTICIPANTS_DATA_FIELDS.is_finished]">
                  Прошел
                </template>
                <template v-else>
                  Не прошел
                </template>
              </template>
            </Column>
          </DataTable>
        </div>
      </main>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Parse } from "~/shared/parse";

enum PARTICIPANTS_DATA_FIELDS {
  fullName = "fullName",
  email = "email",
  is_finished = "is_finished",
}

const route = useRoute();
const courseId = computed(() => Parse.number(route.params.course_id));

const { $module } = useNuxtApp();
const { data, status } = useLazyAsyncData(`referrals-groups-${courseId.value}`, async () => await $module.user.getReferralGroupByCourseId(courseId.value), {
  server: false,
  transform(response) {
    return {
      ...response,
      data: response.data.map((referral) => {
        return {
          ...referral,
          [PARTICIPANTS_DATA_FIELDS.fullName]: `${Parse.string(referral.last_name)} ${Parse.string(referral.name)}`,
          [PARTICIPANTS_DATA_FIELDS.email]: Parse.string(referral.email),
          [PARTICIPANTS_DATA_FIELDS.is_finished]: Parse.boolean(referral.is_done),
        };
      }),
    };
  },
});
</script>

<style scoped>

</style>
