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
