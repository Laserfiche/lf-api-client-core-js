import { ApiServer_Username, ApiServer_Password, ApiServer_RepositoryId, ApiServer_baseUrl } from '../../testHelper.js';
import { TokenClient } from './TokenClient.js';
import 'isomorphic-fetch';
import { CreateConnectionRequest } from './CreateConnectionRequest.js';
import { SessionKeyInfo } from './SessionKeyInfo.js';


//add a test for ampersand
describe.skip('getAccessTokenFromServicePrincipal', () => {
  let inst: TokenClient;
  let body: CreateConnectionRequest = {
    grant_type: 'password',
    username: ApiServer_Username,
    password: ApiServer_Password,
  };
  test('Wrong domain returns null', async () => {
    let domain = 'fake.laserfiche.com';
    inst = new TokenClient(domain);
    expect(async () => await inst.createAccessToken(ApiServer_RepositoryId, body)).rejects.toThrow();
  });

  test('Malformed domain returns null', async () => {
    let domain = 'blah';
    inst = new TokenClient(domain);
    expect(async () => await inst.createAccessToken(ApiServer_RepositoryId, body)).rejects.toThrow();
  });

  test('Correct config returns access token', async () => {
    let domain = ApiServer_baseUrl;
    inst = new TokenClient(domain);

    let result: SessionKeyInfo = await inst.createAccessToken(ApiServer_RepositoryId, body);
    expect(result?.access_token).toBeTruthy();
  });

  test('Correct domain is case insensitive', async () => {
    let domain = ApiServer_baseUrl.toUpperCase();
    inst = new TokenClient(domain);
    let result: SessionKeyInfo = await inst.createAccessToken(ApiServer_RepositoryId, body);
    expect(result?.access_token).toBeTruthy();
  });

  test('Empty domain throws exception', async () => {
    let domain = '';
    expect(() => new TokenClient(domain)).toThrow();
  });
});
