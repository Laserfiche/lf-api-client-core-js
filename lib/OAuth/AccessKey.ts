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


export class AccessKeyImpl implements AccessKey {
  customerId: string = '';
  clientId: string = '';
  domain: string = '';
  jwk:JWK = {} as JWK;

  static createFromBase64EncodedAccessKey(base64EncodedAccessKey: string): AccessKey {
    if (!base64EncodedAccessKey.trim()) {
      throw new Error('Base 64 Encoded Access Key cannot be null or empty');
    }
    try {
      let accessKeyStr: string = StringUtils.base64toString(base64EncodedAccessKey) ?? '';
      let accessKey: AccessKey = JSON.parse(accessKeyStr);
      return accessKey;
    } catch (err) {
      throw new SyntaxError(`${Object.keys({ base64EncodedAccessKey })} is not valid`);
    }
  }
}
