<template>
  <div class="rounded-[10px] bg-white p-6 font-inter shadow-sm">
    <h4 class="text-base font-bold text-[#3B3551]">
      {{ $t("pages.course.lessonMaterials") }}
    </h4>
    <div class="mt-6 grid divide-y rounded-3xl bg-[#F9FAFB] px-6 py-[26px] *:py-5">
      <a
        v-for="m in courseStore.material"
        :key="m.id"
        class="flex items-center gap-2 first:!pt-0 last:!pb-0"
        download
        :href="m.file"
        target="_blank"
      >
        <BaseIcon :name="`material${typesMaterial.includes(m.type.name) ? m.type.name : 'other'}`" />
        <p class="text-[#737373] hover:brightness-125">{{ m.name }}</p>
      </a>
    </div>
    <div class="mt-6 flex flex-col">
      <Button :label="$t('actions.dowlandAll')" severity="info" @click="dowlandAll" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "~/shared/components/BaseIcon.vue";
import { CourseRepository } from "~/shared/repository/course.repository";

const typesMaterial = [".docx", ".pdf", ".zip", ".png", ".xlsx", ".pptx"];

const courseStore = useCourseStore();

const route = useRoute();
CourseRepository.getMaterial();

async function dowlandAll() {
  const blob = await CourseRepository.getAllMaterial(+route.params.id);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "all.zip";
  link.click();
  link.remove();
}
</script>
