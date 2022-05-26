import {testKey,testServicePrincipalKey} from '../../testHelper';
import { AccessKey } from './AccessKey.js';
import { GetAccessTokenResponse } from './GetAccessTokenResponse.js';
import { TokenApiClient } from './TokenApiClient.js';

describe('getAccessToken', () => {
  let inst: TokenApiClient;
  let accessKey:any = JSON.parse(testKey);
  test('Wrong domain returns null', async () => {
    let domain = 'fake.laserfiche.com';
    inst = new TokenApiClient(domain);

    expect(async () => await inst.getAccessToken(testServicePrincipalKey, accessKey)).rejects.toThrow();
  });

  test('Malformed domain returns null', async () => {
    let domain = 'blah';
    inst = new TokenApiClient(domain);

    expect(async () => await inst.getAccessToken(testServicePrincipalKey, accessKey)).rejects.toThrow();
  });

  test('Correct config returns access token', async () => {
    let domain = accessKey.domain;
    console.log(process.env);
    let accessParse = `${accessKey.replace(/\\\\/g, '\\')}`;
    console.log(accessParse);
    let accessJson:AccessKey = JSON.parse(accessParse);
    let domain2 = accessJson.domain;
    console.log(accessJson.jwk);
    inst = new TokenApiClient(domain2);
    let result: GetAccessTokenResponse = await inst.getAccessToken(testServicePrincipalKey, accessJson);
    console.log(result);
    expect(result?.access_token).toBeTruthy();
  });

  test('Correct domain is case insensitive', async () => {
    let domain = accessKey.domain.toUpperCase();
    inst = new TokenApiClient(domain);

    let result: GetAccessTokenResponse = await inst.getAccessToken(testServicePrincipalKey, accessKey);
    expect(result?.access_token).toBeTruthy();
  });

  test('Empty domain throws exception', async () => {
    let domain = '';
    expect(() => new TokenApiClient(domain)).toThrow();
  });
});
