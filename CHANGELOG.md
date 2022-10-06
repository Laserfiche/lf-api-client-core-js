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
      repositoryApiBaseUrl: string;
      regionalDomain: string;
      oauthAuthorizeUrl: string;
      oauthTokenUrl: string;
    }
    ```
  - add function `getLfEndpoints(regionalDomain: string): LfEndpoints`.
  - remove function `getRegionFromAccountId`.
  - remove function `getOauthTokenUrl`.
  - remove function `getEnvironmentSubDomain`.


### Chore & Maintenance
