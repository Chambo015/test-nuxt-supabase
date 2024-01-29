<script setup lang="ts">
import {ServerType, type Server} from '@prisma/client';
import {debounce} from '~/utils/debounce';

const {data, pending, refresh} = await useFetch<Server[]>('/api/servers');

const isLoading = ref(false)
const activeServerId = ref<number>();
const selectedServer = computed(() => data.value?.find(({id}) => id === activeServerId.value));

const inputName = ref('');
const selectedServerType = ref<ServerType>();

watch(selectedServer, () => {
  if (selectedServer.value) {
    inputName.value = selectedServer.value?.serverName;
    selectedServerType.value = selectedServer.value.serverType;
  }
});

const handleChangeServer = async ({filed, value}: {filed: string; value: string}) => {
  try {
    isLoading.value = true
    const res = await $fetch(`/api/${selectedServer.value?.id}`, {
      method: 'PATCH',
      body: {
        [filed]: value
      },
    });
    if(res.id) {
      await refresh()
    }
  } catch (error) {
    console.error('error update-address', error);
  } finally {
    isLoading.value = false
  }
};

const debounceHandle = debounce<{filed: string; value: string}>(handleChangeServer, 1000);

watch(inputName, () => {
  if (inputName.value.trim() && inputName.value !== selectedServer.value?.serverName) {
    debounceHandle({filed: 'serverName', value: inputName.value});
  }
});
watch(selectedServerType, () => {
  if (selectedServerType.value && selectedServerType.value !== selectedServer.value?.serverType) {
    debounceHandle({filed: 'serverType', value: selectedServerType.value});
  }
});
</script>

<template>
  <div class="container flex">
    <div class="w-[200px] max-w-[200px] mt-10 mr-5 border-r border-white/15">
      <ul v-show="!pending">
        <li
          v-for="server of data"
          :key="server.id"
          :class="[
            'text-xl font-medium  hover:bg-white/5 cursor-pointer flex',
            activeServerId === server.id ? 'bg-blue-300/10' : '',
          ]">
          <button :disabled="isLoading" class="py-2 px-3 flex-1" @click="activeServerId = server.id">{{ server.customerId }}</button>
        </li>
      </ul>
      <div class="text-center" v-show="pending">Loading...</div>
    </div>
    <div v-show="selectedServer" class="px-5 py-8">
      <h3 class="text-2xl font-bold">{{ selectedServer?.customerId }}</h3>
      <p class="mt-5 text-sm text-white/70">Name:</p>
      <div>
        <input :disabled="isLoading" class="bg-transparent px-4 py-2 ring-1 ring-white/20 mt-1 rounded-sm" type="text" v-model="inputName" />
      </div>
      <p class="mt-5 text-sm text-white/70">Server type:</p>
      <div>
        <select :disabled="isLoading" class="bg-black p-1" v-model="selectedServerType">
          <option class="bg-transparent" v-for="(value, key) in ServerType" :key="value" :value="value">
            {{ value }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
