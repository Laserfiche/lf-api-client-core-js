import * as JwtUtils from './JwtUtils.js';

describe('JwtUtils', () => {

  it('getAccountIdFromLfJWT returns the account id', () => {
    // Arrange
    const jwt: JwtUtils.JWT = {
      header: { "typ": "JWT" },
      payload: { "csid": "123456789" },
      signature: "_signature"
    };
    const expectedAccountId = '123456789';

    // Act
    const accountId = JwtUtils.getAccountIdFromLfJWT(jwt);

    // Assert
    expect(accountId).toEqual(expectedAccountId);
  });

  it('getTrusteeIdFromLfJWT returns the trustee id', () => {
    // Arrange
    const jwt: JwtUtils.JWT = {
      header: { "typ": "JWT" },
      payload: { "trid": "1008" },
      signature: "_signature"
    };
    const expectedTrusteeId = '1008';

    // Act
    const trid = JwtUtils.getTrusteeIdFromLfJWT(jwt);

    // Assert
    expect(trid).toEqual(expectedTrusteeId);
  });

  it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints for clouddev environment', () => {
    // Arrange
    const regionalDomain = 'a.clouddev.laserfiche.com';
    const expectedEndpoints: JwtUtils.LfEndpoints = {
      webClientUrl: 'https://app.a.clouddev.laserfiche.com/laserfiche',
      wsignoutUrl: 'https://accounts.a.clouddev.laserfiche.com/WebSTS/?wa=wsignout1.0',
      repositoryApiBaseUrl: 'https://api.a.clouddev.laserfiche.com/repository/',
      regionalDomain: 'a.clouddev.laserfiche.com',
      oauthAuthorizeUrl: 'https://signin.a.clouddev.laserfiche.com/oauth/Authorize',
      oauthTokenUrl: 'https://signin.a.clouddev.laserfiche.com/oauth/Token'
    };

    // Act
    const endpoints = JwtUtils.getLfEndpoints(regionalDomain);

    // Assert
    expect(endpoints).toEqual(expectedEndpoints);
  });

  it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints for production environment', () => {
    // Arrange
    const expectedEndpoints: JwtUtils.LfEndpoints = {
      webClientUrl: 'https://app.laserfiche.com/laserfiche',
      wsignoutUrl: 'https://accounts.laserfiche.com/WebSTS/?wa=wsignout1.0',
      repositoryApiBaseUrl: 'https://api.laserfiche.com/repository/',
      regionalDomain: 'laserfiche.com',
      oauthAuthorizeUrl: 'https://signin.laserfiche.com/oauth/Authorize',
      oauthTokenUrl: 'https://signin.laserfiche.com/oauth/Token'
    };

    // Act
    const endpoints = JwtUtils.getLfEndpoints('laserfiche.com');

    // Assert
    expect(endpoints).toEqual(expectedEndpoints);
  });

  it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints for cloudtest environment', () => {
    // Arrange
    const regionalDomain = 'cloudtest.laserfiche.com';
    const expectedEndpoints: JwtUtils.LfEndpoints = {
      webClientUrl: 'https://app.cloudtest.laserfiche.com/laserfiche',
      wsignoutUrl: 'https://accounts.cloudtest.laserfiche.com/WebSTS/?wa=wsignout1.0',
      repositoryApiBaseUrl: 'https://api.cloudtest.laserfiche.com/repository/',
      regionalDomain: 'cloudtest.laserfiche.com',
      oauthAuthorizeUrl: 'https://signin.cloudtest.laserfiche.com/oauth/Authorize',
      oauthTokenUrl: 'https://signin.cloudtest.laserfiche.com/oauth/Token'
    };

    // Act
    const endpoints = JwtUtils.getLfEndpoints(regionalDomain);

    // Assert
    expect(endpoints).toEqual(expectedEndpoints);
  });

  it('parseAccessToken parses a base64-encoded jwt', () => {
    // Arrange
    const jwtString = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9l
    IiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`; // copy from https://jwt.io/
    const expectedJWT: JwtUtils.JWT = {
      header:
      {
        "alg": "HS256",
        "typ": "JWT"
      },
      payload:
      {
        "sub": "1234567890",
        "name": "John Doe",
        "iat": 1516239022
      },
      signature: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    };

    // Act
    const jwt = JwtUtils.parseAccessToken(jwtString);

    // Assert
    expect(jwt).toEqual(expectedJWT);

  });

});
