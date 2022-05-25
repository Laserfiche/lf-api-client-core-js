import { BeforeFetchResult } from "./BeforeFetchResult.js";

export interface HttpRequestHandler {
    /**
     * Called to prepare the request to the API service
     * Returns the Laserfiche Cloud regional domain
     */
    beforeFetchRequestAsync: (
        url: string,
        request: RequestInit
    ) => Promise<BeforeFetchResult>;

    /**
     * Called to handle the response from the API service
     * Returns true if the request should be retried
     */
    afterFetchResponseAsync: (
        url: string,
        response: Response,
        request: RequestInit
    ) => Promise<boolean>;
}
