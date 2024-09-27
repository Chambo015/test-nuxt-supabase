<template>
    <Dialog dismissableMask mask modal v-model:visible="model" :header="$t('actions.noticeIncident')" :pt="{root: {class: 'w-[590px] max-sm:w-[95vw]'}}">
        <IncidentForm is-modal @close-modal="model = false"  />
    </Dialog>
</template>

<script setup lang="ts">
import IncidentForm from '~/shared/components/forms/IncidentForm.vue'
const model = defineModel({ required: true, default: false })
</script>

<style scoped>

</style>