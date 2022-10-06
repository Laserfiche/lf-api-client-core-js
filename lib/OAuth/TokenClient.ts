import { AccessKey, createClientCredentialsAuthorizationJwt } from './AccessKey.js';
import { GetAccessTokenResponse } from './GetAccessTokenResponse.js';
import { getLfEndpoints } from '../utils/DomainUtils.js';
import { HTTPError } from '../HttpError.js';
import { StringUtils } from '@laserfiche/lf-js-utils';

const CONTENT_TYPE_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded';

/**
 * An object to interact with the OAuth 2.0 token endpoint.
 */
export interface ITokenClient {
  /**
   * Gets an OAuth access token given a Laserfiche cloud service principal key and an OAuth service application access key.
   * @param servicePrincipalKey Laserfiche cloud service principal key
   * @param accessKey OAuth service application access key
   */
  getAccessTokenFromServicePrincipal(
    servicePrincipalKey: string,
    accessKey: AccessKey
  ): Promise<GetAccessTokenResponse>;

  /**
   * Gets an OAuth access token given an OAuth code
   * @param code Authorization code
   * @param redirect_uri Authorization endpoint redirect uri
   * @param client_id OAuth application client id
   * @param client_secret OPTIONAL OAuth application client secret. Required for web apps.
   * @param code_verifier OPTIONAL PKCE code verifier. Required for SPA apps.
   */
  getAccessTokenFromCode(
    code: string,
    redirect_uri: string,
    client_id: string,
    client_secret?: string,
    code_verifier?: string
  ): Promise<GetAccessTokenResponse>;

  /**getAccessTokenFromCode(code: string, redirect_uri: string, client_id: string, code_verifier?: string): Promise<GetAccessTokenResponse>;
   * Gets a refreshed access token given a refresh token
   * @param refresh_token Refresh token
   * @param client_id OAuth application client id
   * @param client_secret OPTIONAL OAuth application client secret. Required for web apps.
   */
  refreshAccessToken(refresh_token: string, client_id: string, client_secret?: string): Promise<GetAccessTokenResponse>;
}

/**
 * An object to interact with the OAuth 2.0 token endpoint.
 */
export class TokenClient implements ITokenClient {
  private _baseUrl: string;

  constructor(regionalDomain: string) {
    this._baseUrl = getLfEndpoints(regionalDomain).oauthTokenUrl;
  }

  /**
   * Gets a refreshed access token given a refresh token
   * @param refresh_token Refresh token
   * @param client_id OAuth application client id
   * @param client_secret OPTIONAL OAuth application client secret. Required for web apps.
   */
  async refreshAccessToken(
    refresh_token: string,
    client_id: string,
    client_secret?: string
  ): Promise<GetAccessTokenResponse> {
    const request = this.createRefreshTokenRequest(refresh_token, client_id, client_secret);
    let url = this._baseUrl;
    const res: Response = await fetch(url, request);
    if (res.status === 200) {
      const getAccessTokenResponse = await res.json();
      return getAccessTokenResponse;
    } else if (res.headers.get('Content-Type')?.includes('json') === true) {
      const errorResponse = await res.json();
      throw errorResponse;
    } else {
      throw new HTTPError(`Refresh access token error.`, res.status);
    }
  }

  /**
   * Gets an OAuth access token given an OAuth code
   * @param code Authorization code
   * @param redirect_uri Authorization endpoint redirect uri
   * @param client_id OAuth application client id
   * @param client_secret OPTIONAL OAuth application client secret. Required for web apps.
   * @param code_verifier OPTIONAL PKCE code verifier. Required for SPA apps.
   */
  async getAccessTokenFromCode(
    code: string,
    redirect_uri: string,
    client_id: string,
    client_secret?: string,
    code_verifier?: string
  ): Promise<GetAccessTokenResponse> {
    const request = this.createAuthorizationCodeTokenRequest(
      code,
      redirect_uri,
      client_id,
      code_verifier,
      client_secret
    );
    let url = this._baseUrl;
    const res: Response = await fetch(url, request);
    if (res.status === 200) {
      const getAccessTokenResponse = await res.json();
      return getAccessTokenResponse;
    } else if (res.headers.get('Content-Type')?.includes('json') === true) {
      const errorResponse = await res.json();
      throw errorResponse;
    } else {
      throw new HTTPError(`Get access token from code error.`, res.status);
    }
  }

  /**
   * Gets an OAuth access token given a Laserfiche cloud service principal key and an OAuth service application access key.
   * @param servicePrincipalKey Laserfiche cloud service principal key
   * @param accessKey OAuth service application access key
   */
  async getAccessTokenFromServicePrincipal(
    servicePrincipalKey: string,
    accessKey: AccessKey
  ): Promise<GetAccessTokenResponse> {
    const token = createClientCredentialsAuthorizationJwt(servicePrincipalKey, accessKey);

    const req: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/x-www-form-urlencoded',
        withCredentials: 'true',
        credentials: 'include',
        Authorization: `Bearer ${token}`,
      }),
      body: 'grant_type=client_credentials',
    };

    const url = this._baseUrl;
    const res: Response = await fetch(url, req);
    if (res.status === 200) {
      const getAccessTokenResponse = await res.json();
      return getAccessTokenResponse;
    } else if (res.headers.get('Content-Type')?.includes('json') === true) {
      const errorResponse = await res.json();
      throw errorResponse;
    } else {
      throw new HTTPError(`Get access token error.`, res.status);
    }
  }

  private createAuthorizationCodeTokenRequest(
    code: string,
    redirect_uri: string,
    client_id: string,
    code_verifier?: string,
    client_secret?: string
  ): RequestInit {
    const request: RequestInit = { method: 'POST' };
    const headers = this.getPostRequestHeaders(client_id, client_secret);
    const body: any = {
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      client_id,
    };
    if (code_verifier) {
      body['code_verifier'] = code_verifier;
    }
    const requestBody = this.objToWWWFormUrlEncodedBody(body);
    request.headers = headers;
    request.body = requestBody;
    return request;
  }

  private createRefreshTokenRequest(refreshToken: string, client_id: string, client_secret?: string): RequestInit {
    const request: RequestInit = { method: 'POST' };
    const headers = this.getPostRequestHeaders(client_id, client_secret);
    const body = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id,
    };
    const requestBody = this.objToWWWFormUrlEncodedBody(body);
    request.headers = headers;
    request.body = requestBody;
    return request;
  }

  private getPostRequestHeaders(client_id: string, client_secret?: string) {
    const headers: Record<string, string> = {
      'Content-Type': CONTENT_TYPE_WWW_FORM_URLENCODED,
    };
    if (client_secret) {
      const basicCredentials = client_id + ':' + client_secret;
      const encodedClientSecret = StringUtils.stringToBase64(basicCredentials);
      headers['Authorization'] = 'Basic ' + encodedClientSecret;
    }
    return headers;
  }

  private objToWWWFormUrlEncodedBody(obj: any): string {
    const urlSearchParams = new URLSearchParams();
    for (const i in obj) {
      urlSearchParams.set(i, obj[i]);
    }
    return urlSearchParams.toString();
  }
}
