## 1.1.0

### Features
- **[Breaking]** `Self-hosted API Server support`:
  - add interface `CreateConnectionRequest`.
  - add interface  `SessionKeyInfo`.
  - add interface and implementation `APIServer/TokenClient`.
  - add self hosted integration tests `UsernamePasswordHandler.test`.

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
