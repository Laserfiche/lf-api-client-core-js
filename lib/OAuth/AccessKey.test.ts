import { createFromBase64EncodedAccessKey, createClientCredentialsAuthorizationJwt, AccessKey } from './AccessKey';
import { TokenClient } from './TokenClient';

describe('createFromBase64EncodedAccessKey', () => {
  test('createFromBase64EncodedAccessKey successfully parses base 64 string', () => {
    // Arrange
    const expectedAccessKey: AccessKey = {
      customerId: '7215189634',
      clientId: 'V5gqHxkzihZKdQTSc6DFYnkd',
      domain: 'laserfiche.ca',
      jwk: {
        kty: 'EC',
        crv: 'P-256',
        use: 'sig',
        kid: '_pk_xM5VCqEND6OULr_DNYs-GegAUJwLBP9lyFenAMh',
        x: '0CfMWX6yOmNo7F_km8nv8SAkQPUzDw06LknNzXadwTS',
        y: 'gfNs-JA9v0iW9sqUAdHfXq8ZSAsYxIkYRxOH94cHlal',
        d: 'B1oAZHCPP2Ic03fhRuXVKQpEpQdM5bqqbK7iKQU-4Uh',
        iat: 1659632705,
      },
    };

    const base64EncodedAccessKey: string =
      'ewoJImN1c3RvbWVySWQiOiAiNzIxNTE4OTYzNCIsCgkiY2xpZW50SWQiOiAiVjVncUh4a3ppaFpLZFFUU2M2REZZbmtkIiwKCSJkb21haW4iOiAibGFzZXJmaWNoZS5jYSIsCgkiandrIjogewoJCSJrdHkiOiAiRUMiLAoJCSJjcnYiOiAiUC0yNTYiLAoJCSJ1c2UiOiAic2lnIiwKCQkia2lkIjogIl9wa194TTVWQ3FFTkQ2T1VMcl9ETllzLUdlZ0FVSndMQlA5bHlGZW5BTWgiLAoJCSJ4IjogIjBDZk1XWDZ5T21ObzdGX2ttOG52OFNBa1FQVXpEdzA2TGtuTnpYYWR3VFMiLAoJCSJ5IjogImdmTnMtSkE5djBpVzlzcVVBZEhmWHE4WlNBc1l4SWtZUnhPSDk0Y0hsYWwiLAoJCSJkIjogIkIxb0FaSENQUDJJYzAzZmhSdVhWS1FwRXBRZE01YnFxYks3aUtRVS00VWgiLAoJCSJpYXQiOiAxNjU5NjMyNzA1Cgl9Cn0=';

    //Act

    const decodedAccessKey: AccessKey = createFromBase64EncodedAccessKey(base64EncodedAccessKey);

    //Assert
    const accessKeyJSON: string = JSON.stringify(expectedAccessKey);
    const decodedAccessKeyJSON: string = JSON.stringify(decodedAccessKey);
    expect(decodedAccessKeyJSON).toBe(accessKeyJSON);
  });

  test.each([
    [''],
    ['     '],
    ['\n'],
    ['YXNkYXNkYXNkYXNkYWQ='],
    ['你好你好'],
    ['"This is a "string" in JS"'],
    ['c\nc'],
    ['😀 😃 😄 😁'],
  ])('create from base 64 encoded access key -> %s', (base64EncodedAccessKey) => {
    expect(() => {
      try {
        createFromBase64EncodedAccessKey(base64EncodedAccessKey);
        return false;
      } catch (err: any) {
        const msg: string | undefined = err?.message;
        return msg?.includes('Unexpected') && msg?.includes('JSON');
      }
    }).toBeTruthy();
  });
});

describe('createClientCredentialsAuthorizationJwt', () => {
  test('createClientCredentialsAuthorizationJwt successfully creates Client Credentials Authorization Jwt', async () => {
    // Arrange
    const accessKey: AccessKey = {
      customerId: '122222222',
      clientId: 'b2c235cc-2f52-414c-9d4e-3a6b58bf79da',
      domain: 'a.clouddev.laserfiche.com',
      jwk: {
        kty: 'EC',
        crv: 'P-256',
        use: 'sig',
        kid: 'ihX3QNlrwa7S9ykIuGRgIw2J2IFro5VkvFU4BKq-BY4',
        x: '8TF14AaUHUQJM45iNx0yI-Q11egegVQrWsOwLj0SqlQ',
        y: 'Odo8vq4jW6hGZRC5_Q7n_tbtBZK-EkpVpbKrUKRUKN0',
        d: '_ncf4tfr8p55p1UxYf359DxZ2y3PaDBeDWmzIWiJApw',
        iat: 1662154221,
      },
    };

    const servicePrincipalKey = '-_FAKE_2rrr1A_C_22'; //Not an active key

    //Act
    const authorizationToken: string = createClientCredentialsAuthorizationJwt(servicePrincipalKey, accessKey);

    //Assert
    expect(authorizationToken.length).toBeGreaterThan(10);
  });

  test('createClientCredentialsAuthorizationJwt successfully creates Client Credentials Authorization Jwt from Base64EncodedAccessKey', async () => {
    // Arrange
    const base64EncodedAccessKey: string =
      'ewoJImN1c2RvbWVySWQiOiAiMTIzNDU2Nzg5IiwKCSJjbGllbnRJZCI6ICJiMmMyMTVjYy0yZjUyLTQxNGItOWQ0ZS0zYTZiNThiZjc5ZGEiLAoJImRvbWFpbiI6ICJhLmNsb3VkZGV2Lmxhc2VyZmljaGUuY29tIiwKCSJqd2siOiB7CgkJImt0eSI6ICJFQyIsCgkJImNydiI6ICJQLTI1NiIsCgkJInVzZSI6ICJzaWciLAoJCSJraWQiOiAiaWhYM1FObHJ3YTdTOXlrSXVHUmdJdzJKMklGcm81Vmt2RlU0QktxLUJZNCIsCgkJIngiOiAiOFRGMTRBYVVIVVFKTTQ1aU54MHlJLVExMWdnZWdWUXJXc093TGowU3FsUSIsCgkJInkiOiAiT2RvOHZxNGpXNmhHWlJDNV9RN25fdGJ0QlpLLUVrcFZwYktyVUtSVUtOMCIsCgkJImQiOiAiX25jZjR0ZnI4cDU1cDFVeFlmMzU5RHhaM3kzUGFEQmVEV216SVdpSkFwdyIsCgkJImlhdCI6IDE2NjIxNTQyMjEKCX0KfQ==';

    const servicePrincipalKey = '_FAKE_2rrr1A_C_22'; //Not an active key

    //Act
    const authorizationToken: string = createClientCredentialsAuthorizationJwt(
      servicePrincipalKey,
      base64EncodedAccessKey
    );

    //Assert
    expect(authorizationToken.length).toBeGreaterThan(10);
  });
});
