import { AccessKey } from "./AccessKey.js";

export interface ClientCredentialsOptions {
    // The service principal key for the associated service principal user
    // for the application. You can configure service principals in 
    // the Laserfiche Account Administration page under 
    // "Service Principals"
    servicePrincipalKey: string;

    // A valid JWK access key taken from the Laserfiche Developer Console
    // config page for your application. 
    accessKey: AccessKey;
}
  