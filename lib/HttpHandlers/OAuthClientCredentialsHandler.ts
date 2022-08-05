import { HttpRequestHandler } from './HttpRequestHandler.js';
import { TokenClient } from '../OAuth/TokenClient.js';
import { IAccessKey } from '../OAuth/AccessKey.js';
import { BeforeFetchResult } from './BeforeFetchResult.js';

export class OAuthClientCredentialsHandler implements HttpRequestHandler {
  // A valid JWK access key taken from the Laserfiche Developer Console
  // config page for your application.
  private _accessKey: IAccessKey;
  private _tokenClient: TokenClient;
  private _accessToken: string | undefined;

  // The service principal key for the associated service principal user
  // for the application. You can configure service principals in
  // the Laserfiche Account Administration page under
  // "Service Principals"
  private _servicePrincipalKey: string;

  public constructor(servicePrincipalKey: string, accessKey: IAccessKey) {
    if (!servicePrincipalKey) throw new Error('Service principal key cannot be blank.');

    this._accessKey = accessKey;
    this._servicePrincipalKey = servicePrincipalKey;
    this._tokenClient = new TokenClient(this._accessKey.domain);
  }

  async beforeFetchRequestAsync(url: string, request: RequestInit): Promise<BeforeFetchResult> {
    if (!this._accessToken) {
      let resp = await this._tokenClient.getAccessTokenFromServicePrincipal(this._servicePrincipalKey, this._accessKey);
      if (resp?.access_token) this._accessToken = resp.access_token;
      else console.warn(`getAccessToken did not return a token. ${resp}`);
    }

    if (this._accessToken) (<any>request.headers)['Authorization'] = 'Bearer ' + this._accessToken;

    return {
      regionalDomain: this._accessKey.domain,
    };
  }
  async afterFetchResponseAsync(url: string, response: Response, request: RequestInit): Promise<boolean> {
    if (response.status === 401) {
      this._accessToken = undefined;
      return true;
    }
    return false;
  }
}
