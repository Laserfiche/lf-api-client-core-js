## 1.1.4
### Features
- An optional `scope` parameter has been added when requesting an access token for `getAccessTokenFromCode` and `getAccessTokenFromServicePrincipal`.

## 1.1.3

### Fixes
- Errors will now be thrown with the new `ApiException` type that has a `ProblemDetails` property to match the error handling of `lf-repository-api-client-js`.

## 1.1.2

### Fixes
- Fixed import errors by adding a `.js` extension next to all the files being imported in `APIServer\TokenClient.ts` and `UsernamePasswordHandler.ts`

## 1.1.1

### Maintenance
- Updated function `createAccessToken` with unabbreviated `repositoryId` parameter name

## 1.1.0

### Features
- Added support for Self-hosted API Server

## 1.0.12

### Features

### Fixes
- **[BREAKING]** `JwtUtils`:
  - remove interface `LfEndpoints`.
  - remove function `getLfRegionalDomainFromAccountId`.
  - remove function `getLfDevEnvironmentSubDomain`.
  - remove function `getLfEndpoints`.
- **[BREAKING]** `DomainUtils`:
  - add 
    ```
    interface LfEndpoints {
      webClientUrl: string;
      wsignoutUrl: string;
      regionalDomain: string;
      oauthAuthorizeUrl: string;
    }
    ```
  - add function `getLfEndpoints(regionalDomain: string): LfEndpoints`.
  - remove function `getRegionFromAccountId`.
  - remove function `getEnvironmentSubDomain`.


### Chore & Maintenance
