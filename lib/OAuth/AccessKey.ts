import { StringUtils } from '@laserfiche/lf-js-utils';
import { JWK } from './JWK.js';

export interface IAccessKey {
  // The account ID associated to the application
  customerId: string;

  // The client ID for the application. You can find the client ID
  // on the Laserfiche Developer Console config page for your application
  clientId: string;

  // The domain for the API environment
  domain: string;

  jwk: JWK;
}

export class AccessKey implements IAccessKey {
  customerId: string;
  clientId: string;
  domain: string;
  jwk: JWK;
  constructor(customerId: string, clientId: string, domain: string, jwk: JWK) {
    this.customerId = customerId;
    this.clientId = clientId;
    this.domain = domain;
    this.jwk = jwk;
  }
  static createFromBase64EncodedAccessKey(base64EncodedAccessKey: string): IAccessKey {
    if (!base64EncodedAccessKey.trim()) {
      throw new Error('Base 64 Encoded Access Key cannot be null or empty');
    }
    let accessKeyStr: string = StringUtils.base64toString(base64EncodedAccessKey) ?? '';
    try {
      let accessKey: IAccessKey = JSON.parse(accessKeyStr);
      return accessKey;
    } catch (err) {
      throw new SyntaxError(`${Object.keys({ base64EncodedAccessKey })} is not valid`);
    }
  }
}
