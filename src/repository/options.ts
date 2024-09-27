import type { AsyncDataOptions } from "nuxt/app";
import type { FetchOptions, ResponseType } from "ofetch";

type KeysOf<T> = Array<T extends T ? keyof T extends string ? keyof T : never : never>;

export interface Options<D = any, R extends ResponseType = "json"> {
  asyncDataOptions?: AsyncDataOptions<D, D, KeysOf<D>, D> | AsyncDataOptions<D, D, KeysOf<D>>
  fetchOptions?: FetchOptions<R>
  key?: string
};
