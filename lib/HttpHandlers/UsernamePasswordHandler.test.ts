import { ApiServer_Username, ApiServer_Password, ApiServer_RepositoryId, ApiServer_baseUrl } from '../../testHelper.js';
import { BeforeFetchResult } from './BeforeFetchResult.js';
import { UsernamePasswordHandler } from './UsernamePasswordHandler.js';
import 'isomorphic-fetch';

describe('UsernamePasswordHandler', () => {
  test('Correct config returns handler', () => {
    let httpRequestHandler = new UsernamePasswordHandler(
      ApiServer_RepositoryId,
      ApiServer_Username,
      ApiServer_Password,
      ApiServer_baseUrl
    );
    expect(httpRequestHandler).toBeTruthy();
  });

  test('Correct config returns new token', async () => {
    let httpRequestHandler = new UsernamePasswordHandler(
      ApiServer_RepositoryId,
      ApiServer_Username,
      ApiServer_Password,
      ApiServer_baseUrl
    );
    const url = 'https://laserfiche.com/repository/';
    let request: RequestInit = {
      method: 'GET',
      headers: {},
    };
    let result: BeforeFetchResult = await httpRequestHandler.beforeFetchRequestAsync(url, request);
    expect(result).not.toBeNull;
    expect(result?.regionalDomain).not.toBeNull;
    expect((<any>request.headers)['Authorization'].toString().substring(0, 6)).toBe('Bearer');
    expect(
      (<any>request.headers)['Authorization']
        .toString()
        .substring(6, (<any>request.headers)['Authorization'].toString().length - 1)
    ).not.toBeNull;
  });

  test('Correct config returns existing token', async () => {
    let httpRequestHandler = new UsernamePasswordHandler(
      ApiServer_RepositoryId,
      ApiServer_Username,
      ApiServer_Password,
      ApiServer_baseUrl
    );
    const url = 'https://laserfiche.com/repository/';
    let request: RequestInit = {
      method: 'GET',
      headers: {},
    };
    let request2: RequestInit = {
      method: 'GET',
      headers: {},
    };
    let result: BeforeFetchResult = await httpRequestHandler.beforeFetchRequestAsync(url, request);
    let result2: BeforeFetchResult = await httpRequestHandler.beforeFetchRequestAsync(url, request2);
    let bearerTokenParameter: string = (<any>request.headers)['Authorization']
      .toString()
      .substring(6, (<any>request.headers)['Authorization'].toString().length - 1);
    let bearerTokenParameter2: string = (<any>request2.headers)['Authorization']
      .toString()
      .substring(6, (<any>request2.headers)['Authorization'].toString().length - 1);
    expect(result2).not.toBeNull;
    expect(result2.regionalDomain).not.toBeNull;
    expect((<any>request.headers)['Authorization'].toString().substring(0, 6)).toBe('Bearer');
    expect(bearerTokenParameter).toBe(bearerTokenParameter2);
  });

  test('Correct config beforeFetchRequestAsync returns regional domain', async () => {
    let httpRequestHandler = new UsernamePasswordHandler(
      ApiServer_RepositoryId,
      ApiServer_Username,
      ApiServer_Password,
      ApiServer_baseUrl
    );
    const url = 'https://laserfiche.com/repository/';
    let request: RequestInit = {
      method: 'GET',
      headers: {},
    };
    let result: BeforeFetchResult = await httpRequestHandler.beforeFetchRequestAsync(url, request);
    expect(result?.regionalDomain).toBeTruthy();
  });

  test('After Send Async Token Removed When Unauthorized', async () => {
    let httpRequestHandler = new UsernamePasswordHandler(
      ApiServer_RepositoryId,
      ApiServer_Username,
      ApiServer_Password,
      ApiServer_baseUrl
    );
    const url = 'https://laserfiche.com/repository/';
    let request: RequestInit = {
      method: 'GET',
      headers: {},
    };
    const myResponse: ResponseInit = {
      headers: undefined,
      status: 401,
      statusText: 'UNAUTHORIZED',
    };
    let response2: Response = new Response(null, myResponse);
    let result: BeforeFetchResult = await httpRequestHandler.beforeFetchRequestAsync(url, request);
    let retry: boolean = await httpRequestHandler.afterFetchResponseAsync(url, response2, request);
    expect(retry).toBe(true);
    let request2: RequestInit = {
      method: 'GET',
      headers: {},
    };
    let result2: BeforeFetchResult = await httpRequestHandler.beforeFetchRequestAsync(url, request2);
    let bearerTokenParameter: string = (<any>request.headers)['Authorization']
      .toString()
      .substring(6, (<any>request.headers)['Authorization'].toString().length - 1);
    let bearerTokenParameter2: string = (<any>request2.headers)['Authorization']
      .toString()
      .substring(6, (<any>request2.headers)['Authorization'].toString().length - 1);
    expect(result2).not.toBeNull;
    expect(result2.regionalDomain).not.toBeNull;
    expect((<any>request.headers)['Authorization'].toString().substring(0, 6)).toBe('Bearer');
    expect(bearerTokenParameter2).not.toBeNull;
    expect(bearerTokenParameter).not.toBe(bearerTokenParameter2);
  });
});
