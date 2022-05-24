import 'dotenv/config';
import { BeforeFetchResult } from './BeforeFetchResult.js';
import { OAuthClientCredentialsHandler } from './OAuthClientCredentialsHandler.js';

describe('OAuthClientCredentialsHandler', () => {
  test('Empty service principal key throws exception', () => {
    expect(() => new OAuthClientCredentialsHandler('', '')).toThrow();
  })

  test('Malformed access key throws exception', () => {
    expect(() => new OAuthClientCredentialsHandler('blah', 'blah')).toThrow();
  })

  test('Correct config returns handler', () => {
    let httpRequestHandler = new OAuthClientCredentialsHandler(process.env.SERVICE_PRINCIPAL_KEY ?? '', process.env.ACCESS_KEY ?? '')
    expect(httpRequestHandler).toBeTruthy();
  })

  test('Correct config beforeFetchRequestAsync returns regional domain', async () => {
    let httpRequestHandler = new OAuthClientCredentialsHandler(process.env.SERVICE_PRINCIPAL_KEY ?? '', process.env.ACCESS_KEY ?? '')
    const url = 'https://laserfiche.com/repository/';
    let request: RequestInit = {
      method: 'GET',
      headers: {}
    };
    let result: BeforeFetchResult = await httpRequestHandler.beforeFetchRequestAsync(url, request);
    expect(result?.regionalDomain).toBeTruthy();
  })
})
