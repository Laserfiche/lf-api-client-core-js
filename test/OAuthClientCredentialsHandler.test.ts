import 'dotenv/config';
import * as OAuthClientCredentialsFactory from "../lib/OAuthClientCredentialsFactory"
describe("OAuthClientCredentialsFactory.createClientCredentialsHandler", () => {
    test("Empty service principal key throws exception", () => {
        let client = () => {
            OAuthClientCredentialsFactory.createClientCredentialsHandler("", "")
        }
        expect(client).toThrow();    
    })

    test("Malformed access key throws exception", () => {
        let client = () => {
            OAuthClientCredentialsFactory.createClientCredentialsHandler("blah", "blah")
        }
        expect(client).toThrow();  
    })

    test("Correct config returns handler", () => {
        let client =
            OAuthClientCredentialsFactory.createClientCredentialsHandler(process.env.ACCESS_KEY ?? "", 
                                                                        process.env.SERVICE_PRINCIPAL_KEY ?? "")
        
        expect(client).toBeTruthy(); 
    })
})
