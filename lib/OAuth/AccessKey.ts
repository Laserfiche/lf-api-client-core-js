// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.
import { StringUtils } from '@laserfiche/lf-js-utils';
import { JWK } from './JWK.js';
import { KEYUTIL, KJUR } from 'jsrsasign';

/**
 * The access key exported from the Laserfiche Developer Console.
 */
export interface AccessKey {
  /**
   * The account ID associated to the application
   */
  customerId: string;

  /**
   * The client ID for the application. You can find the client ID
   * on the Laserfiche Developer Console config page for your application
   */
  clientId: string;

  /**
   * The domain for the API environment
   */
  domain: string;

  /**
   * The application's json web key.
   */
  jwk: JWK;
}

interface jwtPayload {
  client_id: string;
  client_secret: string;
  exp?: number;
  aud: string;
  iat: number;
  nbf: number;
  scopes?: string;
}

/**
 * Creates an AccessKey given a base-64 encoded access key.
 * @param base64EncodedAccessKey The base-64 encoded access key exported from the Laserfiche Developer Console.
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
 * Create OAuth 2.0 client_credentials Authorization JWT that can be used with Laserfiche Cloud Token endpoint to request an Access Token.
 * @param servicePrincipalKey The service principal key created for the service principal from the Laserfiche Account Administration.
 * @param accessKey AccessKey JSON object or base-64 encoded AccessKey exported from the Laserfiche Developer Console.
 * @param expireInSeconds The expiration time in seconds for the authorization JWT with a default value of 3600 seconds. Set it to 0 if the JWT never expires.
 * @returns Authorization JWT.
 */
export function createClientCredentialsAuthorizationJwt(
  servicePrincipalKey: string,
  accessKey: AccessKey | string,
  expireInSeconds = 3600,
  scopes?: string
): string {
  const currentTime: any = new Date(); // the current time in milliseconds
  const nowSecondsFrom1970: number = Math.ceil(currentTime / 1000 - 1);
  const audience: string = 'laserfiche.com';

  if (typeof accessKey === 'string') {
    accessKey = createFromBase64EncodedAccessKey(accessKey);
  }

  const payload: jwtPayload = {
    client_id: accessKey.clientId,
    client_secret: servicePrincipalKey,
    aud: audience,
    iat: nowSecondsFrom1970,
    nbf: nowSecondsFrom1970
  };

  if (scopes) {
    // TODO should we do some sort of validation on the scopes?
    payload.scopes = scopes;
  }

  if (expireInSeconds) {
    const expireSecondsFrom1970: number = Math.ceil(nowSecondsFrom1970 + expireInSeconds);
    if (expireSecondsFrom1970 <= nowSecondsFrom1970) {
      throw new Error('Expiration time must be later than the current time.');
    }
    payload.exp = expireSecondsFrom1970;
  }

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
