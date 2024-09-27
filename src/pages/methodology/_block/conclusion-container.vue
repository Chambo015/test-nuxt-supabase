<template>
    <section>
        <div class="border-[5px] border-[#E1FFA8]">
            <slot />
        </div>
        <div class="px-9 py-[30px] bg-[#E1FFA8]">
            <h3 class="font-NeueMachina font-extrabold text-[30px] !leading-tight">{{ title }}</h3>
            <div class="mt-[10px]">
                <slot name="conclusion"></slot>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>

<style scoped>

</style>