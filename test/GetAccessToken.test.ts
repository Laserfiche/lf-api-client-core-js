import { ClientCredentialsGrantHandler } from "../lib/ClientCredentialsGrantHandler"
import { testConfig } from './TestConfiguration';

describe("getAccessToken", () => {
    let inst: any

    beforeEach(() => {
        inst = new ClientCredentialsGrantHandler(testConfig);
    })

    test("Incomplete URL returns null", async () => {
        let result: any = await inst.getAccessToken("https://")
        expect(result).toBe(null)
    })

    test("Malformed URL returns null", async () => {
        let result: any = await inst.getAccessToken("blah")
        expect(result).toBe(null)
    })

    test("Correct config returns access token", async () => {
        let result: any = await inst.getAccessToken("https://signin.a.clouddev.laserfiche.com/oauth/Token")
        expect(result?.access_token).toBeTruthy();
    })

    test("Correct config without baseURL input returns access token", async () => {
        let result: any = await inst.getAccessToken();
        expect(result?.access_token).toBeTruthy();
    })

    test("Correct config is case insensitive", async () => {
        let result: any = await inst.getAccessToken("hTTps://SiGNin.a.clouDdeV.lasERfiche.com/oauth/TOken")
        expect(result?.access_token).toBeTruthy();
    })

    test("Empty URL returns null", async () => {
        let result: any = await inst.getAccessToken("")
        expect(result).toBe(null)
    })

    test("Correct config with null baseURL returns access token", async () => {
        let result: any = await inst.getAccessToken(null)
        expect(result?.access_token).toBeTruthy();
    })
})
