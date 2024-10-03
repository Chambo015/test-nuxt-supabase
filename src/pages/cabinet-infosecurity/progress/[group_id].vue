<template>
  <div>
    <NuxtLayout name="aside-container">
      <main class="pt-[30px]">
        <ParticipantsDataTable
          :data="adapteeData"
          :is-pending="pending"
          title-course="-"
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
});

const adapteeData = computed(() => data.value.data ? data.value.data.map(p => new AdapterParticipants(p).adapt()) : []);
</script>
