import 'dotenv/config';
import { AccessKey } from './lib/OAuth/AccessKey.js';
import {StringUtils} from '@laserfiche/lf-js-utils';
export const testServicePrincipalKey: string =
  process.env.SERVICE_PRINCIPAL_KEY ?? '';
if (!testServicePrincipalKey) {
  throw new Error(`Unable to load SERVICE_PRINCIPAL_KEY from .env`);
}
let accessKeyBase64: string = process.env.ACCESS_KEY ?? '';
if (!accessKeyBase64){
  throw new Error(`Unable to load ACCESS_KEY from .env`);
}
export const OAuthAccessKey: AccessKey = JSON.parse(StringUtils.base64toString(accessKeyBase64) ?? '');
export const repoId: string = process.env.REPOSITORY_ID ?? '';

