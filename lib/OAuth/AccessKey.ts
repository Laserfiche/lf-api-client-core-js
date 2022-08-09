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

  set setCustomerId(customerId: string);

  set setClientId(clientId: string);

  set setDomain(domain: string);

  set setJWK(jwk: JWK);

  get getCustomerId(): string;

  get getClientId(): string;

  get getDomain(): string;

  get getJWK(): JWK;
}


export class AccessKeyImpl implements AccessKey {
  customerId: string = '';
  clientId: string = '';
  domain: string = '';
  jwk:JWK = {} as JWK;

  set setClientId(clientId: string) {
    this.clientId = clientId;
  }

  set setDomain(domain: string) {
    this.domain = domain;
  }

  set setCustomerId(customerId: string) {
    this.customerId = customerId;
  }

  set setJWK(jwk: JWK) {
    this.jwk = jwk;
  }

  get getClientId(): string {
    return this.clientId;
  }

  get getCustomerId(): string {
    return this.customerId;
  }

  get getDomain(): string {
    return this.domain;
  }

  get getJWK(): JWK {
    return this.jwk;
  }

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
