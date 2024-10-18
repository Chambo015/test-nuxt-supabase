// 3rd's
// locals
import FetchFactory from "../factory";
import type { Options } from "../options";
import { Parse } from "~/shared/parse";
import type { Content, ContentType, Short } from "~/types/content.type";
import { HttpMethod } from "~/shared/enums/http.enum";
import type { ResponseWithMeta } from "~/types/response.type";

class ContentModule extends FetchFactory {
  private RESOURCE = "content";
  private _controller?: AbortController;

  /**
   * @param options {Options}
   * @description Все новости
   */
  async getFeeds(options?: Options<ResponseWithMeta<Content[]>>) {
    // TODO: Create Custom useAsyncData with AbortController
    // https://github.com/nuxt/nuxt/blob/9845467421687e5d2a588284388675fc86af63b2/packages/nuxt/src/app/composables/fetch.ts#L102-L116
    this._controller?.abort?.();
    this._controller = typeof AbortController !== "undefined" ? new AbortController() : {} as AbortController;

    return this.call<ResponseWithMeta<Content[]>>(
      `${this.RESOURCE}/content`,
      {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
        timeout: 5000,
        signal: this._controller?.signal,
      },
    );
  }

  /**
   *
   * @param id {number} Id контента
   * @param options {Options}
   * @returns Content модель
   */
  async contentById(id: number, options?: Options<Content>) {
    const { asyncDataOptions, fetchOptions } = options || {};
    return useAsyncData(`feed-${id}`, () => {
      return this.call<{ data: Content }>(
        `${this.RESOURCE}/content/${id}`,
        {
          ...fetchOptions,
          method: HttpMethod.GET,
        },
      );
    }, {
      ...asyncDataOptions,
      lazy: true,
      transform: data => ({ ...data.data, created_at: Parse.date(data.data.created_at) }),
    });
  }

  async getFeedFilters(options?: Options<{ types: ContentType[], tags: ContentType[] }>) {
    const [types, tags] = await Promise.all([
      this.call<{ data: ContentType[] }>("catalog/content-type", {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
      }),
      this.call<{ data: ContentType[] }>("catalog/tag", {
        ...options?.fetchOptions,
        method: HttpMethod.GET,
      }),
    ]);

    return {
      types: types.data,
      tags: tags.data,
    };
  }

  /**
   *
   * @param options
   * @returns Short[]
   */
  async getShorts(options?: Options<{ data: Short[] }>) {
    return this.call<{ data: Short[] }>(
        `${this.RESOURCE}/shorts`,
        {
          ...options?.fetchOptions,
          method: HttpMethod.GET,
        },
    );
  }

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

export default ContentModule;
