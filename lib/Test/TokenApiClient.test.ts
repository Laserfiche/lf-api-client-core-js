import { OAuthAccessKey, testServicePrincipalKey } from '../../testHelper.js';
import { GetAccessTokenResponse } from '../OAuth/GetAccessTokenResponse.js';
import { TokenApiClient } from '../OAuth/TokenApiClient.js';

describe('getAccessToken', () => {
  let inst: TokenApiClient;
  test('Wrong domain returns null', async () => {
    let domain = 'fake.laserfiche.com';
    inst = new TokenApiClient(domain);

    expect(async () => await inst.getAccessToken(testServicePrincipalKey, OAuthAccessKey)).rejects.toThrow();
  });

  test('Malformed domain returns null', async () => {
    let domain = 'blah';
    inst = new TokenApiClient(domain);

    expect(async () => await inst.getAccessToken(testServicePrincipalKey, OAuthAccessKey)).rejects.toThrow();
  });

  test('Correct config returns access token', async () => {
    let domain = OAuthAccessKey.domain;
    inst = new TokenApiClient(domain);

    let result: GetAccessTokenResponse = await inst.getAccessToken(testServicePrincipalKey, OAuthAccessKey);
    expect(result?.access_token).toBeTruthy();
  });

  test('Correct domain is case insensitive', async () => {
    let domain = OAuthAccessKey.domain.toUpperCase();
    inst = new TokenApiClient(domain);

    let result: GetAccessTokenResponse = await inst.getAccessToken(testServicePrincipalKey, OAuthAccessKey);
    expect(result?.access_token).toBeTruthy();
  });

  test('Empty domain throws exception', async () => {
    let domain = '';
    expect(() => new TokenApiClient(domain)).toThrow();
  });
});
