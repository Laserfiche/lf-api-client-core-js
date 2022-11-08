import { SelfHostedUsername, SelfHostedPassword, RepositoryId, baseUrl } from '../../testHelper.js';
import { TokenClient } from './TokenClient.js';
import 'isomorphic-fetch';
import { CreateConnectionRequest } from './CreateConnectionRequest.js';
import { SessionKeyInfo } from './SessionKeyInfo.js';

describe.skip('getAccessTokenFromServicePrincipal', () => {
  let inst: TokenClient;
  let body: CreateConnectionRequest = {
    grant_type: 'password',
    username: SelfHostedUsername,
    password: SelfHostedPassword,
  };
  test('Wrong domain returns null', async () => {
    let domain = 'fake.laserfiche.com';
    inst = new TokenClient(domain);
    expect(async () => await inst.createAccessToken(RepositoryId, body)).rejects.toThrow();
  });

  test('Malformed domain returns null', async () => {
    let domain = 'blah';
    inst = new TokenClient(domain);
    expect(async () => await inst.createAccessToken(RepositoryId, body)).rejects.toThrow();
  });

  test('Correct config returns access token', async () => {
    let domain = baseUrl;
    inst = new TokenClient(domain);

    let result: SessionKeyInfo = await inst.createAccessToken(RepositoryId, body);
    expect(result?.access_token).toBeTruthy();
  });

  test('Correct domain is case insensitive', async () => {
    let domain = baseUrl.toUpperCase();
    inst = new TokenClient(domain);
    let result: SessionKeyInfo = await inst.createAccessToken(RepositoryId, body);
    expect(result?.access_token).toBeTruthy();
  });

  test('Empty domain throws exception', async () => {
    let domain = '';
    expect(() => new TokenClient(domain)).toThrow();
  });
});
