import { CreateConnectionRequest } from "../APIServer/CreateConnectionRequest";
import { TokenClient } from "../APIServer/TokenClient";
import { BeforeFetchResult } from "./BeforeFetchResult";
import { HttpRequestHandler } from "./HttpRequestHandler";

export class UsernamePasswordHandler implements HttpRequestHandler{
    private _accessToken: string | undefined;
    private _grantType: string = "password";
    private _repositoryId: string;
    private _baseUrl: string | undefined;
    private _client: TokenClient;
    private _request: CreateConnectionRequest;

    /**
     * Creates a username and password authorization handler for self hosted API server
     *
     * @param repositoryId Repository name
     * @param username     The username used with "password" grant type.
     * @param password     The password used with "password" grant type.
     * @param baseUrl      APIServer Base Url e.g. https://example.com/LFRepositoryAPI
     * @param client       OPTIONAL
     */
    constructor(repositoryId: string, username: string, password: string, baseUrl: string, client: TokenClient | null){
        this._baseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length - 1) : baseUrl;
        this._repositoryId = repositoryId;
        this._request = {
            grant_type: this._grantType,
            username: username,
            password: password
        }
        if (!client){
            this._client = new TokenClient(this._baseUrl ?? '');
        }
        else{
            this._client = client;
        }
    }

    async beforeFetchRequestAsync(url: string, request: RequestInit): Promise<BeforeFetchResult>{
        if (!this._accessToken) {
            let resp = await this._client.createAccessToken(this._repositoryId, this._request);
            if (resp?.access_token) this._accessToken = resp.access_token;
            else console.warn(`createAccessToken did not return a token. ${resp}`);
          }
      
          if (this._accessToken) (<any>request.headers)['Authorization'] = 'Bearer ' + this._accessToken;
      
          return {
            regionalDomain: this._baseUrl ?? ''
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