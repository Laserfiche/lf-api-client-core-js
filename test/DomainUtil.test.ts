import { DomainUtil } from '../lib/DomainUtil';
describe("DomainUtil" , () => 
{
    const baseUrlUSProd = "https://api.laserfiche.com/repository";
    const baseUrlCAProd = "https://api.laserfiche.ca/repository";
    const baseUrlUSDev = "https://api.a.clouddev.laserfiche.com/repository";
    const baseUrlUSTest = "https://api.cloudtest.laserfiche.com/repository";

    test("getEnvironmentSubDomain returns correct subdomain", () => 
    {
        let url = new URL(baseUrlUSProd);
        let result = DomainUtil.getEnvironmentSubDomain(url.hostname);

        expect(result).toBe('');

        url = new URL(baseUrlUSDev);
        result = DomainUtil.getEnvironmentSubDomain(url.hostname);

        expect(result).toBe('a.clouddev.');

        url = new URL(baseUrlCAProd);
        result = DomainUtil.getEnvironmentSubDomain(url.hostname);

        expect(result).toBe('');

        url = new URL(baseUrlUSTest);
        result = DomainUtil.getEnvironmentSubDomain(url.hostname);

        expect(result).toBe('cloudtest.');
    });

    test("getRepositoryEndpoint returns correct endpoint", () => 
    {   
        // Need to take out subdomain;
        let url = new URL(baseUrlUSProd);
        let result = DomainUtil.getRepositoryEndpoint(url.hostname.replace(/^[^.]+\./g, "")); 

        expect(result).toBe(`https://api.laserfiche.com/repository`);

        url = new URL(baseUrlUSDev);
        result = DomainUtil.getRepositoryEndpoint(url.hostname.replace(/^[^.]+\./g, ""));

        expect(result).toBe(`https://api.a.clouddev.laserfiche.com/repository`);

        url = new URL(baseUrlCAProd);
        result = DomainUtil.getRepositoryEndpoint(url.hostname.replace(/^[^.]+\./g, ""));

        expect(result).toBe(`https://api.laserfiche.ca/repository`);

        url = new URL(baseUrlUSTest);
        result = DomainUtil.getRepositoryEndpoint(url.hostname.replace(/^[^.]+\./g, ""));

        expect(result).toBe(`https://api.cloudtest.laserfiche.com/repository`);
    });

    test("getOAuthTokenUrl returns correct endpoint", () => 
    {
        // Need to take out subdomain
        let url = new URL(baseUrlUSProd);
        let result = DomainUtil.getOauthTokenUrl(url.hostname.replace(/^[^.]+\./g, "")) 

        expect(result).toBe(`https://signin.laserfiche.com/OAuth/Token`);

        url = new URL(baseUrlUSDev);
        result = DomainUtil.getOauthTokenUrl(url.hostname.replace(/^[^.]+\./g, ""));

        expect(result).toBe(`https://signin.a.clouddev.laserfiche.com/OAuth/Token`);

        url = new URL(baseUrlCAProd);
        result = DomainUtil.getOauthTokenUrl(url.hostname.replace(/^[^.]+\./g, ""));

        expect(result).toBe(`https://signin.laserfiche.ca/OAuth/Token`);

        url = new URL(baseUrlUSTest);
        result = DomainUtil.getOauthTokenUrl(url.hostname.replace(/^[^.]+\./g, ""));

        expect(result).toBe(`https://signin.cloudtest.laserfiche.com/OAuth/Token`);
    });


})