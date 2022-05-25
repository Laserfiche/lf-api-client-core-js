import {testKey,testServicePrincipalKey} from '../../testHelper';
import { AccessKey } from './AccessKey.js';
import { GetAccessTokenResponse } from './GetAccessTokenResponse.js';
import { TokenApiClient } from './TokenApiClient.js';

describe('getAccessToken', () => {
  let inst: TokenApiClient;

  test('Wrong domain returns null', async () => {
    let domain = 'fake.laserfiche.com';
    inst = new TokenApiClient(domain);

    expect(async () => await inst.getAccessToken(testServicePrincipalKey, testKey)).rejects.toThrow();
  });

  test('Malformed domain returns null', async () => {
    let domain = 'blah';
    inst = new TokenApiClient(domain);

    expect(async () => await inst.getAccessToken(testServicePrincipalKey, testKey)).rejects.toThrow();
  });

  test('Correct config returns access token', async () => {
    let domain = testKey.domain;
    inst = new TokenApiClient(domain);

    let result: GetAccessTokenResponse = await inst.getAccessToken(testServicePrincipalKey, testKey);
    expect(result?.access_token).toBeTruthy();
  });

  test('Correct domain is case insensitive', async () => {
    let domain = testKey.domain.toUpperCase();
    inst = new TokenApiClient(domain);

    let result: GetAccessTokenResponse = await inst.getAccessToken(testServicePrincipalKey, testKey);
    expect(result?.access_token).toBeTruthy();
  });

  test('Empty domain throws exception', async () => {
    let domain = '';
    expect(() => new TokenApiClient(domain)).toThrow();
  });
});
