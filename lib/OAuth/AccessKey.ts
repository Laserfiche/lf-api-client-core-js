import { JWK } from "./JWK.js";

export interface AccessKey {
    // The account ID associated to the application
    customerId: string;

    // The client ID for the application. You can find the client ID 
    // on the Laserfiche Developer Console config page for your application
    clientId: string;

    // The domain for the API environment
    domain: string;

    jwk: JWK;
}