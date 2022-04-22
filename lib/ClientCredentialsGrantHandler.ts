import fetch from 'isomorphic-fetch';
import { KEYUTIL, KJUR } from 'jsrsasign';
import { ClientCredentialsOptions } from './ClientCredentialsOptions';
import { AccessToken } from './AccessToken';
import { DomainUtil } from './DomainUtil.js';

export class ClientCredentialsGrantHandler {
  config: ClientCredentialsOptions

  public constructor(options: ClientCredentialsOptions) {
    this.config = options;
  }

  public async getAccessToken(url?: string) : Promise<AccessToken> {
    let currentTime: any = new Date(); // the current time in milliseconds
    let now: number  = currentTime / 1000;
    let expire: number = currentTime / 1000 + 3600;
    let audience: string = 'laserfiche.com';

    let payload: object = {
      client_id: this.config.accessKey.client_id,
      client_secret: this.config.servicePrincipalKey,
      aud: audience,
      exp: Math.ceil(expire),
      iat: Math.ceil(now),
      nbf: Math.ceil(now)
    };

    let options = {
        algorithm: 'ES256',
        header: {
            'alg': 'ES256',
            'typ': 'JWT',
            "kid": this.config.accessKey.accessKey.kid
        }
    };

    let privateKey = KEYUTIL.getKey(<any>this.config.accessKey.accessKey);

    let token = KJUR.jws.JWS.sign(options.algorithm, options.header, payload, <any>privateKey);

    let req: RequestInit = {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            'withCredentials': 'true',
            'credentials': 'include',
            'Authorization': `Bearer ${token}`
        }),
        body: 'grant_type=client_credentials'
    };
    
    let accessToken: AccessToken = null;

    url = url ?? DomainUtil.getOauthTokenUrl(this.config.accessKey.domain);
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

