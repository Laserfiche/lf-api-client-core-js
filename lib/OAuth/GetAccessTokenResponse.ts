export interface GetAccessTokenResponse {
  access_token: string | undefined;
  expires_in: number | undefined;
  token_type: string | undefined;
  refresh_token: string | undefined;
};
