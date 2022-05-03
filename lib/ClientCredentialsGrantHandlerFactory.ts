import { ClientCredentialsGrantHandler } from "./ClientCredentialsGrantHandler.js";
import { ClientCredentialsOptions } from "./ClientCredentialsOptions.js";

export function createClientCredentialsHandler(accessKey: string, servicePrincipalKey: string) : ClientCredentialsGrantHandler {
    let options: ClientCredentialsOptions = {
        servicePrincipalKey: servicePrincipalKey,
        accessKey: JSON.parse(accessKey)
    }
    let credentials = new ClientCredentialsGrantHandler(options);

    return credentials;
}