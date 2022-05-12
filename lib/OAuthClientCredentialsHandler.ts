import { OAuthClientCredentialsOptions } from './OAuthClientCredentialsOptions.js';
import { HttpRequestHandler } from './HttpRequestHandler.js';
import { TokenApiClient } from './TokenApiClient.js';

export class OAuthClientCredentialsHandler implements HttpRequestHandler {
  private _config: OAuthClientCredentialsOptions;
  private _tokenApiClient: TokenApiClient;
  private _accessToken: string;

  public constructor(options: OAuthClientCredentialsOptions) {
    if (!options.servicePrincipalKey) throw new Error('Service principal key cannot be blank.');

    this._config = options;
    this._tokenApiClient = new TokenApiClient(this._config.accessKey.domain);
  }

  async beforeFetchRequestAsync(url: string, request: RequestInit): Promise<string> {
    if (!this._accessToken) {
      let resp = await this._tokenApiClient.getAccessToken(this._config.servicePrincipalKey, this._config.accessKey);
      if (resp) this._accessToken = resp.access_token;
    }

    (<any>request.headers)['Authorization'] = 'Bearer ' + this._accessToken;

    return this._config.accessKey.domain;
  }
  async afterFetchResponseAsync(url: string, response: Response, request: RequestInit): Promise<boolean> {
    if (response.status === 401) {
      this._accessToken = '';
      return true;
    }
    return false;
  }
}
