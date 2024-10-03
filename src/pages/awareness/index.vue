<template>
  <div class="main">
    <div class="header">
      <div class="info">
        <p class="h-14 w-min bg-black text-3xl font-bold text-white">
          {{ $t("pages.awareness.course") }}
        </p>
        <h1 class="w-min font-bold text-white">
          {{ $t("pages.awareness.title") }}
        </h1>
        <div class="sm:flex" :class="[$i18n.locale === 'kz' && 'flex-wrap']">
          <h2 class="w-min whitespace-nowrap font-bold text-white">
            {{ $t("pages.awareness.for_all") }}
          </h2>
          <span class="bg-black font-normal text-white">{{
            $t("pages.awareness.note")
          }}</span>
        </div>
        <div class="sm:flex sm:pt-10">
          <NuxtLink
            class="green btn mt-6 h-10 rounded-full text-4xl font-normal text-black sm:mr-5 sm:mt-0"
            @click="startCourse"
          >
            {{ $t("pages.awareness.start") }}
            <i class="pi pi-arrow-right ml-5 text-xl font-light"></i>
          </NuxtLink>
          <a
            class="btn mt-6 h-10 text-4xl font-normal text-white sm:mt-0"
            href="https://t.me/citizensecbot"
            target="_blank"
          >
            <Button class="size-full" rounded severity="contrast">Telegram</Button>
          </a>
        </div>
      </div>
    </div>
    <PromoLesson />
    <BasicsCyberHygiene />
    <div class="local-container">
      <CourseCurriculum :course-id="1" @click-lesson="(lessonId) => startCourse({ queryCourseLink: { [QueryCoursePage.LESSON_ID]: lessonId } })" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CourseCurriculum } from "~/features/courses/courseCurriculum";
import { useStartCourse } from "~/features/startCourse";
import { QueryCoursePage } from "~/shared/config";
import { AwarenessSeo } from "~/shared/seo";
import BasicsCyberHygiene from "./_block/BasicsCyberHygiene.vue";
import PromoLesson from "./_block/PromoLesson.vue";

useSeoMeta(AwarenessSeo);

const COURSE_ID = 1;

const { $module } = useNuxtApp();
const { data: course } = useLazyAsyncData(`course-${COURSE_ID}`, () => $module.course.getCourseById(COURSE_ID));
const { startCourse } = useStartCourse(() => course.value ? course?.value?.data : null);
</script>

<style scoped lang="scss">
.local-container {
  max-width: 990px;
  margin: auto;
}

.header {
  background-size: cover;
  background: url('assets/images/awareness-header.png') no-repeat center -100px;
  padding-bottom: 240px;
  padding-top: 140px;

  .info {
    max-width: 990px;
    margin: auto;

    h1,
    h2,
    p {
      font-family: 'Neue Machina', sans-serif;
    }

    p {
      display: flex;
      align-items: center;
      padding: 0 25px;
    }

    h1 {
      padding: 0 15px;
      line-height: 1.25;
      font-size: 100px;
      background: linear-gradient(
        90deg,
        var(--purple-600) 0%,
        var(--purple-400) 100%
      );
    }

    h2 {
      padding: 0 15px;
      height: 110px;
      line-height: 110px;
      font-size: 100px;
      background: linear-gradient(
        90deg,
        var(--purple-400) 0%,
        var(--purple-600) 100%
      );
    }

    span {
      height: 110px;
      font-family: 'Inter', sans-serif;
      font-size: 18px;
      width: 500px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      line-height: 150%;
    }

    .btn {
      width: 405px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 75px;
      font-family: 'Inter', sans-serif;
      cursor: pointer;

      &.green {
        background: linear-gradient(
          90deg,
          #e1ffa8 0%,
          #f3ffdb 60%,
          #cbff67 100%
        );
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .header {
    padding: 60px 15px 46px;
    background-size: cover;

    .info {
      h1,
      h2 {
        font-size: 32px;
        height: auto;
        line-height: 70px;
        align-items: center;
      }

      p {
        font-size: 24px;
        height: 40px;
      }

      .btn {
        height: 52px;
        font-size: 24px;
      }

      span {
        font-size: 14px;
        padding: 20px;
        height: auto;
        width: 100%;
      }

      .btn {
        width: 100%;
      }
    }
  }

  .tabs {
    display: block;

    ul {
      display: flex;
      overflow: hidden;
      overflow-x: scroll;
      height: auto;
      padding-bottom: 15px;

      li {
        gap: 15px;
        margin-right: 15px;
        font-size: 24px;
        margin-bottom: 0;
      }
    }

    .block {
      padding: 25px 15px;

      img {
        margin-top: 0;
      }

      p {
        font-size: 14px;
      }
    }
  }
}
</style>
