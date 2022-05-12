import fetch from 'isomorphic-fetch';
import { KEYUTIL, KJUR } from 'jsrsasign';
import { AccessKey } from './AccessKey';
import { AccessToken } from './AccessToken';
import { DomainUtil } from './DomainUtil';

export interface TokenApi {
  getAccessToken(servicePrincipalKey: string, accessKey: AccessKey): Promise<AccessToken>;
}

export class TokenApiClient implements TokenApi {
  private _baseUrl: string;

  public constructor(regionalDomain: string) {
    this._baseUrl = DomainUtil.getOauthTokenUrl(regionalDomain);
  }

  async getAccessToken(servicePrincipalKey: string, accessKey: AccessKey): Promise<AccessToken> {
    let currentTime: any = new Date(); // the current time in milliseconds
    let now: number = currentTime / 1000;
    let expire: number = currentTime / 1000 + 3600;
    let audience: string = 'laserfiche.com';

    let payload: object = {
      client_id: accessKey.clientId,
      client_secret: servicePrincipalKey,
      aud: audience,
      exp: Math.ceil(expire),
      iat: Math.ceil(now),
      nbf: Math.ceil(now),
    };

    let options = {
      algorithm: 'ES256',
      header: {
        alg: 'ES256',
        typ: 'JWT',
        kid: accessKey.jwk.kid,
      },
    };

    let privateKey = KEYUTIL.getKey(<any>accessKey.jwk);

    let token = KJUR.jws.JWS.sign(options.algorithm, options.header, payload, <any>privateKey);

    let req: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/x-www-form-urlencoded',
        withCredentials: 'true',
        credentials: 'include',
        Authorization: `Bearer ${token}`,
      }),
      body: 'grant_type=client_credentials',
    };

    let accessToken: AccessToken = null;

    let url = this._baseUrl;
    try {
      const res: any = await fetch(url, req);
      if (res.ok) {
        accessToken = await res.json();
      }
    } catch (error) {
      console.error(error);
    }

    return accessToken;
  }
}
