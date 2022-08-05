import { OAuthAccessKey, testServicePrincipalKey } from '../../testHelper.js';
import { BeforeFetchResult } from './BeforeFetchResult.js';
import { OAuthClientCredentialsHandler } from './OAuthClientCredentialsHandler.js';
import { IAccessKey } from '../OAuth/AccessKey.js';
import "isomorphic-fetch";

describe('OAuthClientCredentialsHandler', () => {
  test('Empty service principal key throws exception', () => {
    expect(() => new OAuthClientCredentialsHandler('', {} as IAccessKey)).toThrow();
  });

  test('Malformed access key throws exception', () => {
    expect(() => new OAuthClientCredentialsHandler('blah', {} as IAccessKey)).toThrow();
  });

  test('Correct config returns handler', () => {
    let httpRequestHandler = new OAuthClientCredentialsHandler(testServicePrincipalKey, OAuthAccessKey);
    expect(httpRequestHandler).toBeTruthy();
  });

  test('Correct config beforeFetchRequestAsync returns regional domain', async () => {
    let httpRequestHandler = new OAuthClientCredentialsHandler(testServicePrincipalKey, OAuthAccessKey);
    const url = 'https://laserfiche.com/repository/';
    let request: RequestInit = {
      method: 'GET',
      headers: {},
    };
    let result: BeforeFetchResult = await httpRequestHandler.beforeFetchRequestAsync(url, request);
    expect(result?.regionalDomain).toBeTruthy();
  });
});
