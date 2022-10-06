## 1.0.12

### Features

### Fixes
- **[BREAKING]** `JwtUtils`:
  - add `regionalDomain`, `oauthAuthorizeUrl`, and `oauthTokenUrl` to `LfEndpoints` interface.
  - remove `getLfRegionalDomainFromAccountId` method.
  - remove `getLfDevEnvironmentSubDomain` method.
  - change `getLfEndpoints` method input parameter to only take in `regionalDomain`: regional specific host.


### Chore & Maintenance
