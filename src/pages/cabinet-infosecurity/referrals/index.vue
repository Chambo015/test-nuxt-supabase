<template>
  <div>
    <NuxtLayout name="aside-container">
      <main class="overflow-x-hidden pt-[30px] max-2xl:pr-4 max-md:px-4">
        <div class="relative flex items-start justify-between">
          <h1 class="mb-5 font-NeueMachina text-2xl font-black text-[#3B3551]">
            Реферальные ссылки
          </h1>
          <div>
            <ButtonReferralLink />
          </div>
        </div>
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
            :value="data?.data"
          >
            <Column :field="ReferralsGroupDataFields.course" header="Курс">
              <template #body="slotProps">
                <NuxtLink class="text-[#734CC9]" :to="`/cabinet-infosecurity/referrals/${slotProps.data.course_id}`">
                  {{ slotProps.data[slotProps.field] }}
                </NuxtLink>
              </template>
            </Column>
            <Column :field="ReferralsGroupDataFields.allParticipants" header="Всего пользователей" />
            <Column :field="ReferralsGroupDataFields.finishedUserCount" header="Завершили курс" />
          </DataTable>
        </div>
      </main>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ButtonReferralLink } from "~/features/cabinetInfosecurity/referralLink";
import { Parse } from "~/shared/parse";

enum ReferralsGroupDataFields {
  course = "course_name",
  finishedUserCount = "finished_user_count",
  allParticipants = "all_participants",
}

const { $module } = useNuxtApp();

const { data, status } = useLazyAsyncData("referrals-groups", async () => await $module.user.getReferralGroups(), {
  server: false,
  transform(response) {
    return {
      ...response,
      data: response.data.map((group) => {
        return {
          ...group,
          [ReferralsGroupDataFields.course]: Parse.string(group.course_name),
          [ReferralsGroupDataFields.finishedUserCount]: Parse.number(group.finished),
          [ReferralsGroupDataFields.allParticipants]: Parse.number(group.total),
        };
      }),
    };
  },
});
</script>
