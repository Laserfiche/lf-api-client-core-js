import 'dotenv/config';
import { AccessKey } from './lib/OAuth/AccessKey.js';
export const testServicePrincipalKey: string =
  process.env.DEV_CA_PUBLIC_USE_TESTOAUTHSERVICEPRINCIPAL_SERVICE_PRINCIPAL_KEY ?? '';
//export const testServicePrincipalKey: string ="mbF_XhO9j9AmLIkbSawn";
if (!testServicePrincipalKey) {
  throw new Error(`Unable to load DEV_CA_PUBLIC_USE_TESTOAUTHSERVICEPRINCIPAL_SERVICE_PRINCIPAL_KEY from .env`);
}
//let accessKey:any = process.env.DEV_CA_PUBLIC_USE_INTEGRATION_TEST_ACCESS_KEY;
console.log(process.env.DEV_CA_PUBLIC_USE_TESTOAUTHSERVICEPRINCIPAL_SERVICE_PRINCIPAL_KEY);
let accessKey:any = '{"customerId":"1123456789","domain":"a.clouddev.laserfiche.ca","clientId":"hSnhXJxuzNdWeYtQoE6wCici","jwk":{"kty":"EC","crv":"P-256","use":"sig","kid":"VT5Wz_yjvny0O66hqYFWv2mUAUjoNjLITJYzWGnkIn4","x":"6oZILnV7ytZPB1uz2P47_a_Ymko7SmTNuGpnzl20iCs","y":"ZQorDAQqhY6ojHSV_dpzXxbKI0eKljZbeGQKYDfPHsE","d":"a5Dv3pBpSk9myjg4CSEjNwV4hYx0IhFgqYwMl_TPB1E"}}';
//console.log(accessKey);
const reg = /\\\"/g;
accessKey = accessKey?.replace(reg,'"');
accessKey = accessKey?.replace('"{','{');
accessKey = accessKey?.replace('}"','}');
export const testKey: AccessKey = JSON.parse(accessKey ?? '');
