// 3rd's
import type { $Fetch, FetchOptions, MappedResponseType, ResponseType } from "ofetch";
import type { Pinia } from "pinia";

/*
 The HttpFactory acts as a wrapper around an HTTP client.
 It encapsulates the functionality for making API requests asynchronously
 through the call function, utilizing the provided HTTP client.
*/
class FetchFactory {
  private $fetch: $Fetch;
  private $pinia?: Pinia;
  private defaultOptions?: FetchOptions;

  constructor(fetcher: $Fetch, pinia?: Pinia) {
    this.$fetch = fetcher;
    this.$pinia = pinia;
  }

  /**
   * The HTTP client is utilized to control the process of making API requests.
   * @param url the endpoint url
   * @param fetchOptions fetch options {body, method, ...}
   * @returns Promise<T>
   */
  protected async call<T, R extends ResponseType = "json" >(
    url: string,
    fetchOptions?: FetchOptions<R>,
  ): Promise<MappedResponseType<R, T>> {
    return this.$fetch<T, R>(
      url,
      fetchOptions,
    );
  }
}

export default FetchFactory;
