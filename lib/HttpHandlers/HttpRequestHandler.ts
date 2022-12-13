import { BeforeFetchResult } from './BeforeFetchResult.js';

export interface HttpRequestHandler {
  /**
   * Called to prepare the request to the API service.
   * @param url The HTTP url
   * @param request The HTTP request
   */
  beforeFetchRequestAsync: (url: string, request: RequestInit) => Promise<BeforeFetchResult>;

  /**
   * Called to handle the response from the API service.
   * @param url The HTTP url
   * @param response The HTTP response
   * @param request The HTTP request
   * @returns true if the request should be retried.
   */
  afterFetchResponseAsync: (url: string, response: Response, request: RequestInit) => Promise<boolean>;
}
