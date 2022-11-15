import { accessKey, testServicePrincipalKey } from '../../testHelper.js';
import { GetAccessTokenResponse } from './GetAccessTokenResponse.js';
import { TokenClient } from './TokenClient.js';
import 'isomorphic-fetch';

describe('getAccessTokenFromServicePrincipal', () => {
  let inst: TokenClient;
  test('Wrong domain returns null', async () => {
    let domain = 'fake.laserfiche.com';
    inst = new TokenClient(domain);

    expect(
      async () => await inst.getAccessTokenFromServicePrincipal(testServicePrincipalKey, accessKey)
    ).rejects.toThrow();
  });

  test('Malformed domain returns null', async () => {
    let domain = 'blah';
    inst = new TokenClient(domain);

    expect(
      async () => await inst.getAccessTokenFromServicePrincipal(testServicePrincipalKey, accessKey)
    ).rejects.toThrow();
  });

  test('Correct config returns access token', async () => {
    let domain = accessKey.domain;
    inst = new TokenClient(domain);

    let result: GetAccessTokenResponse = await inst.getAccessTokenFromServicePrincipal(
      testServicePrincipalKey,
      accessKey
    );
    expect(result?.access_token).toBeTruthy();
  });

  test('Correct domain is case insensitive', async () => {
    let domain = accessKey.domain.toUpperCase();
    inst = new TokenClient(domain);

    let result: GetAccessTokenResponse = await inst.getAccessTokenFromServicePrincipal(
      testServicePrincipalKey,
      accessKey
    );
    expect(result?.access_token).toBeTruthy();
  });

  test('Empty domain throws exception', async () => {
    let domain = '';
    expect(() => new TokenClient(domain)).toThrow();
  });
});
