# Laserfiche Service App OAuth 2.0 Client 
This package is a Typescript/Javascript OAuth 2.0 client for authorizing to the Laserfiche API using the client credentials flow. You will need a properly configured Service app as well as at least one **JSON Web Key (JWK)**  access key from the Laserfiche Developer Console. You can download a .txt file of the access key from the Developer Console.

## Installation

Name TBD
```bash
npm install laserfiche-service-app-oauth-client
```

## Usage
### 1. Create a Service app on the [Laserfiche Developer Console](https://app.laserfiche.com/devconsole/)
Ensure that the Service app is properly configured with a valid Service Principal and at least one access key.

### 2. Create a ClientCredentialsOptions object
A ClientCredentialsOptions object is a plain Javascript object with three required properties:

```typescript
{
    // The client ID for the application. You can find the client ID 
    // on the Laserfiche Developer Console config page for your application
    clientId: string;

    // The service principal key for the associated service principal user
    // for the application. You can configure service principals in 
    // the Laserfiche Account Administration page under 
    // "Service Principals"
    servicePrincipalKey: string;

    // A valid JWK access key taken from the Laserfiche Developer Console
    // config page for your application. 
    signingKey: JWK;
}
```

The `signingKey` must be a JWK in the following format:
``` typescript
 {
    kty: "EC";
    use: "sig";
    crv: "P-256";
    d: string;
    x: string;
    y: string;
    kid: string;
}
```
Note that a key downloaded or copied directly from the Laserfiche Developer Console will inherently be in this format and thus usable. 

### 3. Create a new ClientCredentialsGrantHandler(ClientCredentialsOptions options) with your ClientCredentialsOptions Object
```typescript
let client: ClientCredentialsGrantHandler = new ClientCredentialsGrantHandler(testConfig);
```
### 4. Request an access token from the Laserfiche OAuth 2.0 Server
```typescript
let accessToken: AccessToken = await client.getAccessToken("https://signin.laserfiche.com/OAuth/Token");
```
Note that the specific endpoint will depend on your region. 

An access token is an object of the following format: 
```typescript
{
    access_token: string;
    expire_in: number;
    token_type: string;
}
```
If the request was successful, you can now make authorized requests to the Laserfiche API using the access token you receive.


## Example 

### Retrieving repository entries
We will create a new `ClientCredentialsOptions` and `ClientCredentialsGrantHandler` as outlined above to retrieve an access token from the Laserfiche OAuth Server. You can then use [Axios](https://github.com/axios/axios), fetch, or your HTTP client of choice to create a new Laserfiche API session and make an API call to retrieve the list of entries from a repository. 

#### 1. Creating a ClientCredentialsOptions object
First, create a ClientCredentialsObject: 
```typescript
import { AccessToken, ClientCredentialsGrantHandler, ClientCredentialsOptions, JWK } from 'laserfiche-service-app-oauth-client';

// Setup our ClientCredentialsOptions object
let signingKey: JWK = {
	"kty": "EC",
	"crv": "P-256",
	"use": "sig",
	"kid": "atOfVBe38QD-9Msk1wL0qt5D9YQIM0zWulFqSdTbYGs",
	"x": "r7YyDvPUEstFVTuAih-SyR2Xy626ry44hIOzMkgCA7M",
	"y": "DJOYCafNLXqpTGzxI_9fGNW6czmC_biWxau8VDHUU0o",
	"d": "Yolx3mlDkfIOpVBORzZz2h3ySFsFRibkOELdSxqRDzU"
};
let clientId: string = "rTXtFqwwatWX0qlTdJnUtOi1";
let servicePrincipalKey: string = "KkeSGwKcqoOKH5_8g1RR";

let testConfig: ClientCredentialsOptions = {
    clientId: clientId,
    servicePrincipalKey: servicePrincipalKey,
    signingKey: signingKey
}
```
#### 2. Requesting an access token from the Laserfiche OAuth 2.0 Server
Create a ClientCredentialsGrantHandler to request a new access token:

```typescript
// Get an access token using the client credentials flow
console.log("Retrieving access token...");

let inst: ClientCredentialsGrantHandler = new ClientCredentialsGrantHandler(testConfig);
let accessToken: AccessToken = await inst.getAccessToken("https://signin.a.clouddev.laserfiche.com/oauth/Token");

if (accessToken) {
    console.log("Access token retrieved: ", accessToken?.access_token);
}
```
#### 3. Create a new session with the Laserfiche API server
Once you have your access token, use it to create a new session with the Laserfiche API server:

#### Axios 
```typescript
import axios, { AxiosRequestConfig } from 'axios';

// Our Laserfiche repository ID
let repoId: string = "r-23456789";

// Set the access token as the bearer token for authorization
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken?.access_token}`;

// Create a new Laserfiche API session
console.log("Creating new session...");

let createServerSessionReq: AxiosRequestConfig = {
    method: 'POST',
    url: `https://api.a.clouddev.laserfiche.com/repository/v1/Repositories/${repoId}/ServerSession/Create`,
};

try {
    // No need to store the response
    await axios.request(createServerSessionReq);
} catch (error) {
    console.error(error);
}
```

#### fetch
```typescript
import fetch from 'isomorphic-fetch';

// Our Laserfiche repository ID
let repoId: string = "r-23456789";

// Create a new Laserfiche API session
console.log("Creating new session...");

let createServerSessionEndpoint = `https://api.a.clouddev.laserfiche.com/repository/v1/Repositories/${repoId}/ServerSession/Create`;

// Set the access token as the bearer token for authorization
let createServerSessionReq: RequestInit = {
    method: 'POST',
    headers: new Headers({
        'content-type': 'application/json',
        'withCredentials': 'true',
        'credentials': 'include',
        'Authorization': `Bearer ${accessToken?.access_token}`
    }),
    body: 'grant_type=client_credentials'
};

try {
    // No need to store the response
    await fetch(createServerSessionEndpoint, createServerSessionReq);
} catch (error) {
   console.error(error);
}
```

#### 4. Retrieve the list of entries from a repository
After creating a new session with the Laserfiche API server, use your access token to make further requests to the Laserfiche API:

#### Axios 
```typescript
// Retrieve entries from repository
console.log("Retrieving repository entries...");

let entryId: number = 1;

let getEntriesReq: AxiosRequestConfig = {
    method: 'GET',
    url: `https://api.a.clouddev.laserfiche.com/repository/v1/Repositories/${repoId}/Entries/${entryId}/Laserfiche.Repository.Folder/children`,
};

try {
    const { data } = await axios.request(getEntriesReq);
    // Log the list of entries
    console.log(data);
} catch (error) {
    console.error(error);
}
```
#### fetch
```typescript
// Retrieve entries from repository
console.log("Retrieving repository entries...");

let entryId: number = 1;

let getEntriesEndpoint = `https://api.a.clouddev.laserfiche.com/repository/v1/Repositories/${repoId}/Entries/${entryId}/Laserfiche.Repository.Folder/children`;

// Set the access token as the bearer token for authorization
let getEntriesReq: RequestInit = {
    method: 'GET',
    headers: new Headers({
        'content-type': 'application/json',
        'withCredentials': 'true',
        'credentials': 'include',
        'Authorization': `Bearer ${accessToken?.access_token}`
    }),
};

try {
    let response = await fetch(getEntriesEndpoint, getEntriesReq);
    let data = await response.json();
    console.log(data);
} catch (error) {
    console.error(error);
}
```
You can also run this example yourself by running `npm run example` and checking out the `/example` folder.

## Testing
Run the Jest test suite with `npm test`.

## License
[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)