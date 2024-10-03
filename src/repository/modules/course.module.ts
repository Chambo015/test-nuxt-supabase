// 3rd's
import type { FetchOptions, ResponseType } from "ofetch";
// locals
import FetchFactory from "../factory";
import type { Options } from "../options";
import type { Lesson, PublicLesson } from "~/types/lesson.type";
import { HttpMethod } from "~/shared/enums/http.enum";
import type { Module } from "~/types/module.type";
import type { Journal } from "~/types/journal.type";
import type { Course } from "~/types/course.type";
import type { Invoice } from "~/types/finance.type";
// import { Parse } from "~/utils/parse";

class CourseModule extends FetchFactory {
  private RESOURCE = "course";

  /**
   * Начать курс (*Далее нужно обновить юзера и журнал)
   * @param courseId
   */
  async startCourse<T, R extends ResponseType>(courseId: number, options?: Options<unknown, R>) {
    return this.call<T, R>(
        `${this.RESOURCE}/journal/start-course/${courseId}`,
        { ...options?.fetchOptions, method: HttpMethod.GET },
    );
  }

  /**
   * Получаем все курсы
   */
  async getAllCourses(options?: Options<{ data: Course[] }>) {
    return this.call<{ data: Course[] }>(
      `${this.RESOURCE}/course`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
      },
    );
  }

  /**
   * Получаем курс по id
   */
  async getCourseById(id: number, options?: Options<{ data: Course }>) {
    return this.call<{ data: Course }>(
      `${this.RESOURCE}/course/${id}`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
      },
    );
  }

  /**
   * Получаем все модули
   */
  // async getModules(options?: Options<{ data: Module[] }>) {
  //   return useAsyncData(() => this.call<{ data: Module[] }>(
  //     `${this.RESOURCE}/module`,
  //     {
  //       ...options?.fetchOptions,
  //       method: HttpMethod.GET,
  //     },
  //   ), { ...options?.asyncDataOptions, lazy: true });
  // }

  /**
   * Получаем только модули определенного курса по его id
   * @param course_id {number}
   * @param options
   * @returns Module[]
   */
  async getModulesByCourseId(course_id: number, options?: Options<{ data: Module[] }>) {
    return this.call<{ data: Module[] }>(
      `${this.RESOURCE}/module`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
        params: { course_id },
      },
    );
  }

  /**
   * Получаем уроки модуля
   * @param module_id {number}
   * @param options
   * @returns Lesson[]
   */
  async getLessonsByModuleId(module_id: MaybeRefOrGetter<number | undefined>, options?: Options<{ data: Lesson[] }>) {
    if (!toValue(module_id)) return Promise.resolve({ data: [] });

    return this.call<{ data: Lesson[] }>(
        `${this.RESOURCE}/article`,
        {
          ...options?.fetchOptions,
          method: HttpMethod.GET,
          params: { module_id: toValue(module_id) },
        },
    );
  }

  async getCertificates(journal_id: number, options?: Options<{ data: Journal }>) {
    return this.call<{ data: Journal }>(
      `${this.RESOURCE}/journal/generate-certificates/${journal_id}`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
      },
    );
  }

  /**
   * Получаем Открытые(публичные) уроки
   */
  async getPublicLesson(options?: Options<{ data: PublicLesson[] }>) {
    return useAsyncData(() => {
      return this.call<{ data: PublicLesson[] }>(
        `${this.RESOURCE}/open-lesson`,
        {
          ...options?.fetchOptions,
          method: HttpMethod.GET,
        },
      );
    }, {
      ...options?.asyncDataOptions,
      lazy: true,
    });
  }

  /* Finance */
  async getInvoiceByCourse(course_id: string, options?: Options<{ data: Invoice }>) {
    return this.call<{ data: Invoice }>(
      `${this.RESOURCE}/journal/finance/get-invoice/${course_id}`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
      },
    );
  }

  async checkInvoice(invoice_id: string, options?: Options<{ data: Invoice }>) {
    return this.call<{ data: Invoice }>(
      `${this.RESOURCE}/journal/finance/check-invoice/${invoice_id}`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
      },
    );
  }

  /**
   *
   * @param asyncDataOptions
   * @returns CourseMaterial[]
   */
  // async getMaterial(asyncDataOptions?: AsyncDataOptions<{ data: CourseMaterial[] }>) {
  //   return useAsyncData(() => this.call<{ data: CourseMaterial[] }>(
  //     `${this.RESOURCE}/material`,
  //     { method: HttpMethod.GET },
  //   ), {
  //     ...asyncDataOptions,
  //     transform: data => ({
  //       ...data,
  //       data: Parse.list(data.data, CourseModule.materialParser),
  //     }),
  //   });
  // }

  /**
   * Все материалы в zip формате
   * @param course
   * @param fetchOptions
   * @returns Blob zip file
   */
  // async getAllMaterial(
  //   course: number,
  //   fetchOptions?: FetchOptions<"blob">,
  // ) {
  //   return this.call<unknown, "blob">(
  //     `${this.RESOURCE}/material/download-zip/${course}`,
  //     {
  //       ...fetchOptions,
  //       method: HttpMethod.GET,
  //       headers: {
  //         "Content-Type": "application/zip",
  //       },
  //     },
  //   );
  // };
}

export default CourseModule;
