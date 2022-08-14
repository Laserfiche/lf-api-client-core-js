import { StringUtils } from '@laserfiche/lf-js-utils';
import { JWK } from './JWK.js';

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
