import type { FetchOptions } from "ofetch";

export interface HttpDto {
  url: string;
  headers: FetchOptions;
  successMessage?: string;
  errorMessage?: string;
}
