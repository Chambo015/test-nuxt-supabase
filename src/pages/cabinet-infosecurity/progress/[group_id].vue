<template>
  <div>
    <NuxtLayout name="aside-container">
      <main class="pt-[30px] max-2xl:pr-4 max-md:px-4">
        <h1 class="mb-5 w-full overflow-hidden text-clip font-NeueMachina text-2xl font-black text-[#3B3551]">
          Прогресс прохождения по курсу “{{ currentGroup?.data?.course_name }}”
        </h1>
        <ParticipantsDataTable
          :data="adapteeData"
          :is-pending="pending"
        />
      </main>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { AdapterParticipants, ParticipantsDataTable } from "~/features/cabinetInfosecurity/participants";
import { Parse } from "~/shared/parse";

const route = useRoute();
const groupId = computed(() => Parse.string(route.params.group_id));

const { $module } = useNuxtApp();
const { data, pending } = useLazyAsyncData(`participants-group-${groupId.value}`, () => $module.finance.getParticipantsByGroupId(groupId.value), {
  default() {
    return {
      data: [],
    };
  },
  server: false,
});

const adapteeData = computed(() => data.value.data ? data.value.data.map(p => new AdapterParticipants(p).adapt()) : []);

const { data: currentGroup } = useLazyAsyncData(`groupIS-${groupId.value}`, async () => await $module.finance.getGroupById(groupId.value), {
  server: false,
});
</script>
