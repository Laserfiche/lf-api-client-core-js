import 'dotenv/config';
import { AccessKey } from './lib/OAuth/AccessKey.js';
export const testServicePrincipalKey: string =
  process.env.DEV_CA_PUBLIC_USE_TESTOAUTHSERVICEPRINCIPAL_SERVICE_PRINCIPAL_KEY ?? '';
if (!testServicePrincipalKey) {
  throw new Error(`Unable to load DEV_CA_PUBLIC_USE_TESTOAUTHSERVICEPRINCIPAL_SERVICE_PRINCIPAL_KEY from .env`);
}
export const testKey: AccessKey = JSON.parse(process.env.DEV_CA_PUBLIC_USE_INTEGRATION_TEST_ACCESS_KEY ?? '');
