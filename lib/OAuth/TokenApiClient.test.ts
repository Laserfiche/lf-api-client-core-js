import 'dotenv/config';
import { AccessKey } from './AccessKey';
import { TokenApiClient } from './TokenApiClient';

describe("getAccessToken", () => {
    let inst: TokenApiClient;
    // Import our access and service principal keys 
    let testKey: AccessKey = JSON.parse(process.env.ACCESS_KEY ?? "");
    let testServicePrincipalKey: string = process.env.SERVICE_PRINCIPAL_KEY ?? "";

    test("Wrong domain returns null", async () => {
        let domain = "fake.laserfiche.com";
        inst = new TokenApiClient(domain);

        let result: any = await inst.getAccessToken(testServicePrincipalKey, testKey);
        expect(result).toBe(null)
    })

    test("Malformed domain returns null", async () => {
        let domain = "blah";
        inst = new TokenApiClient(domain);

        let result: any = await inst.getAccessToken(testServicePrincipalKey, testKey);
        expect(result).toBe(null)
    })

    test("Correct config returns access token", async () => {
        let domain = testKey.domain;
        inst = new TokenApiClient(domain);

        let result: any = await inst.getAccessToken(testServicePrincipalKey, testKey);
        expect(result?.access_token).toBeTruthy();
    })


    test("Correct domain is case insensitive", async () => {
        let domain = "a.clouDdeV.lasERfiche.com";
        inst = new TokenApiClient(domain);

        let result: any = await inst.getAccessToken(testServicePrincipalKey, testKey);
        expect(result?.access_token).toBeTruthy();
    })

    test("Empty domain returns null", async () => {
        let domain = "";
        inst = new TokenApiClient(domain);

        let result: any = await inst.getAccessToken(testServicePrincipalKey, testKey);
        expect(result).toBe(null)
    })

})
