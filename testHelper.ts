import 'dotenv/config';
import { IAccessKey, AccessKey } from './lib/OAuth/AccessKey.js';
export const testServicePrincipalKey: string = process.env.SERVICE_PRINCIPAL_KEY ?? '';
if (!testServicePrincipalKey) {
  throw new Error(`Unable to load SERVICE_PRINCIPAL_KEY from .env`);
}
let accessKeyBase64: string = process.env.ACCESS_KEY ?? '';
if (!accessKeyBase64) {
  throw new Error(`Unable to load ACCESS_KEY from .env`);
}
export const OAuthAccessKey: IAccessKey = AccessKey.createFromBase64EncodedAccessKey(accessKeyBase64 ?? '');
