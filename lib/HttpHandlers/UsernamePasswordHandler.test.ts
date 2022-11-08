import { SelfHostedUsername, SelfHostedPassword, RepositoryId, baseUrl } from '../../testHelper.js';
import { BeforeFetchResult } from './BeforeFetchResult.js';
import { UsernamePasswordHandler } from './UsernamePasswordHandler.js';
import { AccessKey } from '../OAuth/AccessKey.js';
import 'isomorphic-fetch';

describe.skip('UsernamePasswordHandler', () => {
  test('Correct config returns handler', () => {
    let httpRequestHandler = new UsernamePasswordHandler(
      RepositoryId,
      SelfHostedUsername,
      SelfHostedPassword,
      baseUrl,
      null
    );
    expect(httpRequestHandler).toBeTruthy();
  });

  test('Correct config returns new token', async () => {
    let httpRequestHandler = new UsernamePasswordHandler(
      RepositoryId,
      SelfHostedUsername,
      SelfHostedPassword,
      baseUrl,
      null
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

  test('Correct config beforeFetchRequestAsync returns regional domain', async () => {
    let httpRequestHandler = new UsernamePasswordHandler(
      RepositoryId,
      SelfHostedUsername,
      SelfHostedPassword,
      baseUrl,
      null
    );
    const url = 'https://laserfiche.com/repository/';
    let request: RequestInit = {
      method: 'GET',
      headers: {},
    };
    let result: BeforeFetchResult = await httpRequestHandler.beforeFetchRequestAsync(url, request);
    expect(result?.regionalDomain).toBeTruthy();
  });
});
