import { useFetchApi } from "~/shared/composables/useHttp";
import { Parse } from "~/shared/parse";
import { HttpMethod } from "~/shared/enums/http.enum";
import { useCourseStore } from "~/shared/store/course.store";
import { Module } from "~/shared/models/module.model";
import { Lesson } from "~/shared/models/lesson.model";
import { UserRepository } from "~/shared/repository/user.repository";
import { JournalRepository } from "~/shared/repository/journal.repository";

export class CourseRepository {
  static async startCourse(course: number) {
    await useFetchApi({
      url: `course/journal/start-course/${course}`,
      headers: {
        method: HttpMethod.GET,
      },
    });
    await UserRepository.getUser();
    await JournalRepository.getByCourse(course);
  }

  static async getModule() {
    const courseStore = useCourseStore();
    const data = await useFetchApi({
      url: "course/module",
      headers: {
        method: HttpMethod.GET,
      },
    });

    courseStore.setModule(Parse.list(data.data, Module.fromJson));
  }

  static async getLesson(module: number) {
    const courseStore = useCourseStore();
    const data = await useFetchApi({
      url: "course/article",
      headers: {
        method: HttpMethod.GET,
        params: { module_id: module },
      },
    });

    courseStore.setLesson(Parse.list(data.data, Lesson.fromJson));
  }

  static async getMaterial() {
    const courseStore = useCourseStore();
    const data = await useFetchApi({
      url: "course/material",
      headers: {
        method: HttpMethod.GET,
      },
    });
    courseStore.setMaterial(data.data);
  }

  static async getAllMaterial(course: number) {
    return useFetchApi({
      url: `course/material/download-zip/${course}`,
      headers: {
        method: HttpMethod.GET,
      },
    });
  }
}
