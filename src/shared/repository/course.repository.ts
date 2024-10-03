import { useFetchApi } from "~/shared/composables/useHttp";
import { HttpMethod } from "~/shared/enums/http.enum";
import { JournalRepository } from "~/shared/repository/journal.repository";
import { UserRepository } from "~/shared/repository/user.repository";
import { useCourseStore } from "~/shared/store/course.store";

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
