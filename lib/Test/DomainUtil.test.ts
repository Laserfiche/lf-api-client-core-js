import { getEnvironmentSubDomain, getRepositoryEndpoint, getOauthTokenUrl } from '../util/DomainUtil.js';

describe('DomainUtil', () => {
  const baseUrlUSProd = 'https://api.laserfiche.com/repository';
  const baseUrlCAProd = 'https://api.laserfiche.ca/repository';
  const baseUrlUSDev = 'https://api.a.clouddev.laserfiche.com/repository';
  const baseUrlUSTest = 'https://api.cloudtest.laserfiche.com/repository';

  const baseDomainUSProd = 'laserfiche.com';
  const baseDomainUSTest = 'cloudtest.laserfiche.com';
  const baseDomainCAProd = 'laserfiche.ca';
  const baseDomainUSDev = 'a.clouddev.laserfiche.com';

  test('getEnvironmentSubDomain returns correct subdomain', () => {
    let url = new URL(baseUrlUSProd);
    let result = getEnvironmentSubDomain(url.hostname);

    expect(result).toBe('');

    url = new URL(baseUrlUSDev);
    result = getEnvironmentSubDomain(url.hostname);

    expect(result).toBe('a.clouddev.');

    url = new URL(baseUrlCAProd);
    result = getEnvironmentSubDomain(url.hostname);

    expect(result).toBe('');

    url = new URL(baseUrlUSTest);
    result = getEnvironmentSubDomain(url.hostname);

    expect(result).toBe('cloudtest.');
  });

  test('getRepositoryEndpoint returns correct endpoint', () => {
    let result = getRepositoryEndpoint('laserfiche.com');

    expect(result).toBe(`https://api.laserfiche.com/repository`);
  });

  test('getOAuthTokenUrl returns correct endpoint', () => {
    // Need to take out subdomain
    let url = new URL(baseUrlUSProd);
    let result = getOauthTokenUrl(baseDomainUSProd);

    expect(result).toBe(`https://signin.laserfiche.com/OAuth/Token`);

    url = new URL(baseUrlUSDev);
    result = getOauthTokenUrl(baseDomainUSDev);

    expect(result).toBe(`https://signin.a.clouddev.laserfiche.com/OAuth/Token`);

    url = new URL(baseUrlCAProd);
    result = getOauthTokenUrl(baseDomainCAProd);

    expect(result).toBe(`https://signin.laserfiche.ca/OAuth/Token`);

    url = new URL(baseUrlUSTest);
    result = getOauthTokenUrl(baseDomainUSTest);

    expect(result).toBe(`https://signin.cloudtest.laserfiche.com/OAuth/Token`);
  });
});
