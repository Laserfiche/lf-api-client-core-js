import 'dotenv/config';
import { OAuthClientCredentialsHandler } from './OAuthClientCredentialsHandler';

describe("OAuthClientCredentialsFactory.createClientCredentialsHandler", () => {
    test("Empty service principal key throws exception", () => {
        let client = () => {
            new OAuthClientCredentialsHandler("", "")
        }
        expect(client).toThrow();
    })

    test("Malformed access key throws exception", () => {
        let client = () => {
            new OAuthClientCredentialsHandler("blah", "blah")
        }
        expect(client).toThrow();
    })

    test("Correct config returns handler", () => {
        let client =
          new OAuthClientCredentialsHandler(process.env.SERVICE_PRINCIPAL_KEY ?? "", process.env.ACCESS_KEY ?? "")

        expect(client).toBeTruthy();
    })
})
