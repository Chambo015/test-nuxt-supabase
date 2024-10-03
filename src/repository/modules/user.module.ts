// 3rd's
// locals
import FetchFactory from "../factory";
import type { Options } from "../options";
import type { LoginDto } from "~/shared/dto/auth.dto";
import { HttpMethod } from "~/shared/enums/http.enum";
import type { ReferralGroup, ReferralGroupUser, User } from "~/types/user.type";

class UserModule extends FetchFactory {
  private RESOURCE = "user" as const;

  /**
   * @param form {LoginDto}
   * @param options {Options}
   * @description Логин
   */
  async login(form: LoginDto, options?: Options) {
    const { fetchOptions } = options || {};
    return this.call<{ data: User, token: string }>(
        `${this.RESOURCE}/auth`,
        {
          ...fetchOptions,
          method: HttpMethod.POST,
          body: form,
        },
    );
  }

  async getReferralGroups(options?: Options<{ data: ReferralGroup[] }>) {
    return this.call<{ data: ReferralGroup[] }>(
        `${this.RESOURCE}/get-referral-groups`,
        {
          ...options?.fetchOptions,
          method: HttpMethod.GET,
        },
    );
  }

  async getReferralGroupByCourseId(course_id: number, options?: Options<{ data: ReferralGroupUser[] }>) {
    if (!course_id) return { data: [] };
    return this.call<{ data: ReferralGroupUser[] }>(
        `${this.RESOURCE}/get-referral-group/${course_id}`,
        {
          ...options?.fetchOptions,
          method: HttpMethod.GET,
        },
    );
  }

  async getIBToken(options?: Options<{ token: string }>) {
    return this.call<{ token: string }>(
        `${this.RESOURCE}/get-ib-token`,
        {
          ...options?.fetchOptions,
          method: HttpMethod.GET,
        },
    );
  }
  /**
   *
   * @param id {number} Id контента
   * @param options {Options}
   * @returns Content модель
   */
  // async contentById(id: number, options?: Options<Content>) {
  //   const { asyncDataOptions, fetchOptions } = options || {};
  //   return useAsyncData(`feed-${id}`, () => {
  //     return this.call<{ data: Content }>(
  //       `${this.RESOURCE}/content/${id}`,
  //       {
  //         ...fetchOptions,
  //         method: HttpMethod.GET,
  //       },
  //     );
  //   }, {
  //     ...asyncDataOptions,
  //     lazy: true,
  //     transform: data => ({ ...data.data, created_at: Parse.date(data.data.created_at) }),
  //   });
  // }

  // async getFeedFilters(options?: Options<{ types: ContentType[], tags: ContentType[] }>) {
  //   const { asyncDataOptions, fetchOptions } = options || {};
  //   return useAsyncData("feeds-filters", async () => {
  //     const [types, tags] = await Promise.all([
  //       this.call<{ data: ContentType[] }>("catalog/content-type", {
  //         ...fetchOptions,
  //         method: HttpMethod.GET,
  //       }),
  //       this.call<{ data: ContentType[] }>("catalog/tag", {
  //         ...fetchOptions,
  //         method: HttpMethod.GET,
  //       }),
  //     ]);

  //     return {
  //       types: types.data,
  //       tags: tags.data,
  //     };
  //   }, {
  //     ...asyncDataOptions,
  //     lazy: true,
  //   });
  // }

  /**
   *
   * @param asyncDataOptions
   * @param fetchOptions
   * @returns Short[]
   */
  // async getShorts(
  //   asyncDataOptions?: AsyncDataOptions<{ data: Short[] }>,
  //   fetchOptions?: FetchOptions<"json">,
  // ) {
  //   return useAsyncData(() => {
  //     return this.call<{ data: Short[] }>(
  //       `${this.RESOURCE}/shorts`,
  //       {
  //         ...fetchOptions,
  //         method: HttpMethod.GET,
  //       },
  //     );
  //   }, {
  //     ...asyncDataOptions,
  //     transform: data => ({
  //       ...data,
  //       data: Parse.list(data.data, ContentModule.shortParser),
  //     }),
  //   });
  // }

  /**
   *
   * @param asyncDataOptions
   * @returns Banner[]
   */
  // async getBanners(asyncDataOptions?: AsyncDataOptions<{ data: Banner[] }>) {
  //   return useAsyncData(() => this.call<{ data: Banner[] }>(`${this.RESOURCE}/banner`, { method: HttpMethod.GET }), {
  //     ...asyncDataOptions,
  //     transform: data => ({
  //       ...data,
  //       data: Parse.list(data.data, ContentModule.bannerParser),
  //     }),
  //   });
  // }

  /**
   *
   * @param asyncDataOptions
   * @returns ContentType[]
   */
  // async getContentType(
  //   asyncDataOptions?: AsyncDataOptions<{ data: ContentType[] }>,
  // ) {
  //   return useAsyncData(() => {
  //     return this.call<{ data: ContentType[] }>(
  //       "catalog/content-type",
  //       {
  //         method: HttpMethod.GET,
  //       },
  //     );
  //   }, {
  //     ...asyncDataOptions,
  //     transform: data => ({
  //       ...data,
  //       data: Parse.list(data.data, ContentModule.contentTypeParser),
  //     }),
  //   });
  // }

  /**
   *
   * @param asyncDataOptions
   * @returns ContentType[]
   */
  // async getContentTag(
  //   asyncDataOptions?: AsyncDataOptions<{ data: ContentType[] }>,
  // ) {
  //   return useAsyncData(() => {
  //     return this.call<{ data: ContentType[] }>(
  //       "catalog/tag",
  //       {
  //         method: HttpMethod.GET,
  //       },
  //     );
  //   }, {
  //     ...asyncDataOptions,
  //     transform: data => ({
  //       ...data,
  //       data: Parse.list(data.data, ContentModule.contentTypeParser),
  //     }),
  //   });
  // }
}

export default UserModule;
