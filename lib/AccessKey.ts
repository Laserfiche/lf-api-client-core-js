import { JWK } from "./JWK.js";

export interface AccessKey {
    // The account ID associated to the application
    csid: string;

    // The client ID for the application. You can find the client ID 
    // on the Laserfiche Developer Console config page for your application
    client_id: string;

    // The domain for the API environment
    domain: string;

    accessKey: JWK;
}