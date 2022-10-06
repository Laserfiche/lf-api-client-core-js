/**
 * Laserfiche Cloud endpoints
 */
export interface LfEndpoints {
  webClientUrl: string;
  wsignoutUrl: string;
  repositoryApiBaseUrl: string;
  regionalDomain: string;
  oauthAuthorizeUrl: string;
  oauthTokenUrl: string;
}

/**
 * Decoded JWT
 */
export interface JWT {
  header: object;
  payload: object;
  signature: string;
}

/**
 * Returns Laserfiche account id (customer id) from Laserfiche jwt claims
 * @param lfJwt
 * @returns
 * @example
 * ```typescript
 * const jwt : AccessTokenUtils.JWT = {
 *  header: { 'typ': 'JWT'},
 *  payload: {'csid' : '123456789'},
 *  signature: '_signature'
 * }
 * getAccountIdFromLfJWT(jwt); // '123456789';
 * ```
 */
export function getAccountIdFromLfJWT(lfJwt: JWT): string {
  return (<any>lfJwt).payload['csid'];
}

/**
 * Returns Laserfiche trustee id (user id) from Laserfiche jwt claims
 * @param lfJwt
 * @returns
 * @example
 * ```typescript
 * const jwt : AccessTokenUtils.JWT = {
 *  header: { 'typ': 'JWT'},
 *  payload: {'trid' : '1008'},
 *  signature: '_signature'
 * }
 * getTrusteeIdFromLfJWT(jwt); // '1008';
 * ```
 */
export function getTrusteeIdFromLfJWT(lfJwt: JWT): string {
  return (<any>lfJwt).payload['trid'];
}

/**
 * Returns region-specific Laserfiche Cloud endpoints
 * @param regionalDomain regional specific host, such as 'a.clouddev.laserfiche.ca', or 'cloudtest.laserfiche.com'
 * @returns
 * @example
 * ```typescript
 * getLfEndpoints('a.clouddev.laserfiche.com');
 *  // => {
 *  //      webClientUrl: 'https://app.a.clouddev.laserfiche.com/laserfiche',
 *  //      wsignoutUrl: 'https://accounts.a.clouddev.laserfiche.com/WebSTS/?wa=wsignout1.0',
 *  //      repositoryApiBaseUrl: 'https://api.a.clouddev.laserfiche.com/repository/',
 *  //      regionalDomain: 'a.clouddev.laserfiche.com',
 *  //      oauthAuthorizeUrl: `https://signin.a.clouddev.laserfiche.com/oauth/Authorize`,
 *  //      oauthTokenUrl: `https://signin.a.clouddev.laserfiche.com/oauth/Token`
 *  //     }
 *
 *  getLfEndpoints('laserfiche.com);
 *  // => {
 *  //      webClientUrl: 'https://app.laserfiche.com/laserfiche',
 *  //      wsignoutUrl: 'https://accounts.laserfiche.com/WebSTS/?wa=wsignout1.0',
 *  //      repositoryApiBaseUrl: 'https://api.laserfiche.com/repository/',
 *  //      oauthAuthorizeUrl: `https://signin.laserfiche.com/oauth/Authorize`,
 *  //      oauthTokenUrl: `https://signin.laserfiche.com/oauth/Token`
 *  //     }
 * ```
 */
export function getLfEndpoints(regionalDomain: string): LfEndpoints {
  return {
    webClientUrl: `https://app.${regionalDomain}/laserfiche`,
    repositoryApiBaseUrl: `https://api.${regionalDomain}/repository/`,
    wsignoutUrl: `https://accounts.${regionalDomain}/WebSTS/?wa=wsignout1.0`,
    regionalDomain,
    oauthAuthorizeUrl: `https://signin.${regionalDomain}/oauth/Authorize`,
    oauthTokenUrl: `https://signin.${regionalDomain}/oauth/Token`
  };
}

/**
 * Parses a base64-encoded jwt
 * @param jwt
 * @returns
 * @example
 * ```typescript
 * const jwtString = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
 * parseAccessToken(jstString);
 *  // => {
 *            header:
 *            {
 *              'alg': 'HS256',
 *              'typ': 'JWT'
 *             },
 *            payload:
 *            {
 *              'sub': '1234567890',
 *              'name': 'John Doe',
 *              'iat': 1516239022
 *            },
 *            signature: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
 *          }
 * ```
 */
export function parseAccessToken(jwt: string): JWT {
  const ary = jwt.split('.');
  const header = JSON.parse(base64toString(ary[0]));
  const payload = JSON.parse(base64toString(ary[1]));
  const signature = ary[2];
  return {
    header,
    payload,
    signature,
  };
}

let _isBrowser: boolean | undefined;

/**
 * Function that determines if the environment is in a browser or not
 * @returns True if the function is run in a browser, false if it is run in another environment
 */
export function isBrowser(): boolean {
  if (_isBrowser) {
    return _isBrowser;
  }
  try {
    _isBrowser = window.location !== undefined;
  } catch {
    _isBrowser = false;
  }
  return _isBrowser;
}

/**
 * Decodes a string of data encoded using Base64 encoding
 * @param base64String
 * @returns
 * @example
 * ```typescript
 * base64toString('dGVzdA=='); // => 'test';
 * ```
 */
export function base64toString(base64String: string): string {
  if (isBrowser()) {
    return window.atob(base64String);
  } else {
    return Buffer.from(base64String, 'base64').toString();
  }
}
