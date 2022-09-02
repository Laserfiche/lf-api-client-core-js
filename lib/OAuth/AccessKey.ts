import { StringUtils } from '@laserfiche/lf-js-utils';
import { JWK } from './JWK.js';
import { KEYUTIL, KJUR } from 'jsrsasign';

export interface AccessKey {
  // The account ID associated to the application
  customerId: string;

  // The client ID for the application. You can find the client ID
  // on the Laserfiche Developer Console config page for your application
  clientId: string;

  // The domain for the API environment
  domain: string;

  jwk: JWK;
}

/**
 * Creates an AccessKey given a base64Encoded AccessKey
 */
export function createFromBase64EncodedAccessKey(base64EncodedAccessKey: string): AccessKey {
  const accessKeyStr: string = StringUtils.base64toString(base64EncodedAccessKey);
  const accessKey = JSON.parse(accessKeyStr);
  if (!accessKey?.jwk?.kid) {
    throw new Error('base64EncodedAccessKey cannot be parsed.');
  }
  return accessKey;
}

/**
 * Create OAuth 2.0 client_credentials Authorization JWT that can be used with Laserfiche Token endpoint to request an Access Token.
 * @param servicePrincipalKey
 * @param accessKey AccessKey JSON object or base64 encoded AccessKey
 * @returns Authorization JWT with a one hour expiration.
 */
export function createClientCredentialsAuthorizationJwt(
  servicePrincipalKey: string,
  accessKey: AccessKey | string
): string {
  const currentTime: any = new Date(); // the current time in milliseconds
  const nowSecondsFrom1970: number = Math.ceil(currentTime / 1000 - 1);
  const expireSecondsFrom1970: number = Math.ceil(nowSecondsFrom1970 + 3600);
  const audience: string = 'laserfiche.com';

  if (typeof accessKey === 'string') {
    accessKey = createFromBase64EncodedAccessKey(accessKey);
  }

  const payload: object = {
    client_id: accessKey.clientId,
    client_secret: servicePrincipalKey,
    aud: audience,
    exp: expireSecondsFrom1970,
    iat: nowSecondsFrom1970,
    nbf: nowSecondsFrom1970,
  };

  const options = {
    algorithm: 'ES256',
    header: {
      alg: 'ES256',
      typ: 'JWT',
      kid: accessKey.jwk.kid,
    },
  };

  const privateKey = KEYUTIL.getKey(<any>accessKey.jwk);

  const token = KJUR.jws.JWS.sign(options.algorithm, options.header, payload, <any>privateKey);

  return token;
}
