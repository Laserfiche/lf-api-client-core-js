import { OAuthClientCredentialsHandler } from "./OAuthClientCredentialsHandler.js";
import { OAuthClientCredentialsOptions } from "./OAuthClientCredentialsOptions.js";

export function createClientCredentialsHandler(accessKey: string, servicePrincipalKey: string) : OAuthClientCredentialsHandler {
    let options: OAuthClientCredentialsOptions = {
        servicePrincipalKey: servicePrincipalKey,
        accessKey: JSON.parse(accessKey)
    }
    let handler = new OAuthClientCredentialsHandler(options);

    return handler;
}