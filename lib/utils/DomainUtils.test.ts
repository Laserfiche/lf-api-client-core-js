import { getRepositoryEndpoint, getLfEndpoints, LfEndpoints } from './DomainUtils.js';

describe('DomainUtil', () => {
  const baseUrlUSProd = 'https://api.laserfiche.com/repository';
  const baseUrlCAProd = 'https://api.laserfiche.ca/repository';
  const baseUrlUSDev = 'https://api.a.clouddev.laserfiche.com/repository';
  const baseUrlUSTest = 'https://api.cloudtest.laserfiche.com/repository';

  const baseDomainUSProd = 'laserfiche.com';
  const baseDomainUSTest = 'cloudtest.laserfiche.com';
  const baseDomainCAProd = 'laserfiche.ca';
  const baseDomainUSDev = 'a.clouddev.laserfiche.com';

  test('getRepositoryEndpoint returns correct endpoint', () => {
    let result = getRepositoryEndpoint('laserfiche.com');

    expect(result).toBe(`https://api.laserfiche.com/repository`);
  });

  it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints', () => {
    // Arrange
    const regionalDomain = 'laserfiche.com';
    const expectedEndpoints: LfEndpoints = {
      webClientUrl: 'https://app.laserfiche.com/laserfiche',
      wsignoutUrl: 'https://accounts.laserfiche.com/WebSTS/?wa=wsignout1.0',
      repositoryApiBaseUrl: 'https://api.laserfiche.com/repository/',
      regionalDomain: 'laserfiche.com',
      oauthAuthorizeUrl: 'https://signin.laserfiche.com/oauth/Authorize',
      oauthTokenUrl: 'https://signin.laserfiche.com/oauth/Token'
    };

    // Act
    const endpoints = getLfEndpoints(regionalDomain);

    // Assert
    expect(endpoints).toEqual(expectedEndpoints);
  });
});
