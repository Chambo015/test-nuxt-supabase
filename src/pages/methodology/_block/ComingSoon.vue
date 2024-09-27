<template>
  <div class="flex min-h-[50vh] flex-col items-center justify-center gap-6 p-6">
    <h2 class="font-NeueMachina text-4xl font-bold">
      {{ t("title") }}
    </h2>
    <p class="max-w-[600px] text-center font-NeueMachina text-lg">
      {{ t("note") }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n({
  useScope: "local",
});
</script>

<i18n lang="json">
  {
    "kz": {
      "title": "Хабарландыру!",
      "note": "Жақын арада біз бұл бөлімді жаңартамыз. Бізбен бірге болыңыз - алда әлі көп қызықты дүниелер күтіп тұр!"
    },
    "en": {
      "title": "Announcement!",
      "note": "We will be updating this section soon. Stay with us — exciting things are on the way!"
    }
  }
</i18n>
