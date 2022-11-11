import 'dotenv/config';
import { AccessKey, createFromBase64EncodedAccessKey } from './lib/OAuth/AccessKey.js';
export const testServicePrincipalKey: string = process.env.SERVICE_PRINCIPAL_KEY ?? '';
if (!testServicePrincipalKey) {
  throw new Error(`Unable to load SERVICE_PRINCIPAL_KEY from .env`);
}
let accessKeyBase64: string = process.env.ACCESS_KEY ?? '';
if (!accessKeyBase64) {
  throw new Error(`Unable to load ACCESS_KEY from .env`);
}
export const OAuthAccessKey: AccessKey = createFromBase64EncodedAccessKey(accessKeyBase64 ?? '');
export const ApiServer_Username: string = process.env.APISERVER_USERNAME ?? '';
export const ApiServer_Password: string = process.env.APISERVER_PASSWORD ?? '';
export const ApiServer_RepositoryId: string = process.env.REPOSITORY_ID ?? '';
export const ApiServer_baseUrl: string = process.env.APISERVER_REPOSITORY_API_BASE_URL ?? '';