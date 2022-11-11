import { CreateConnectionRequest } from './CreateConnectionRequest';
import { SessionKeyInfo } from './SessionKeyInfo';
import { HTTPError } from '../HttpError.js';

export interface ITokenClient {
  /**
   * Gets the self hosted access token
   * @param repoId Repository name
   * @param body   Request body that contains username, password and grant type
   * @return Create an access token successfully.
   */
  createAccessToken(repoId: string, body: CreateConnectionRequest): Promise<SessionKeyInfo>;
}

export class TokenClient implements ITokenClient{
    private _baseUrl: string;

  constructor(baseUrl: string) {
    if (!baseUrl) throw new Error('baseUrl is undefined.');
    this._baseUrl = baseUrl;
  }

  async createAccessToken(repoId: string, body: CreateConnectionRequest): Promise<SessionKeyInfo> {
    const encodedGrantType = body.grant_type ? encodeURIComponent(body.grant_type) : '';
    const encodedUsername = body.username ? encodeURIComponent(body.username) : '';
    const encodedPassword = body.password ? encodeURIComponent(body.password) : '';
    const req: RequestInit = {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        }),
        body: `grant_type=${encodedGrantType}&username=${encodedUsername}&password=${encodedPassword}`,
      };
      const url = this._baseUrl + `/v1/Repositories/${encodeURIComponent(repoId)}/Token`;
      const res: Response = await fetch(url, req);
      if (res.status === 200) {
        const getAccessTokenResponse = await res.json();
        return getAccessTokenResponse;
      } else if (res.headers.get('Content-Type')?.includes('json') === true) {
        const errorResponse = await res.json();
        throw errorResponse;
      } else {
        throw new HTTPError(`Get access token error.`, res.status);
      }
  }
}
