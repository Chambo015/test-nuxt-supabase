<template>
  <div class="p-6 bg-white shadow-sm rounded-[10px] font-inter">
    <h4 class="text-[#3B3551] font-bold text-base">{{ $t("pages.course.lessonMaterials") }}</h4>
    <div class="grid bg-[#F9FAFB] rounded-3xl py-[26px] px-6 mt-6 divide-y *:py-5">
      <a
        v-for="m in courseStore.material"
        download
        :href="m.file"
        target="_blank"
        :key="m.id"
        class="flex items-center gap-2 first:!pt-0 last:!pb-0">
        <BaseIcon :name="`material${typesMaterial.includes(m.type.name) ? m.type.name : 'other'}`" />
        <p class="text-[#737373] hover:brightness-125">{{ m.name }}</p>
      </a>
    </div>
    <div class="mt-6 flex flex-col">
      <Button @click="dowlandAll" :label="$t('actions.dowlandAll')" severity="info" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "~/shared/components/BaseIcon.vue";
import { CourseRepository } from "~/shared/repository/course.repository";

const typesMaterial = [".docx", ".pdf", ".zip", ".png", ".xlsx", ".pptx"];

const courseStore = useCourseStore();

const route = useRoute();
CourseRepository.getMaterial()

async function dowlandAll() {
  const blob = await CourseRepository.getAllMaterial(+route.params.id);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "all.zip";
  link.click();
  link.remove();
}
</script>
