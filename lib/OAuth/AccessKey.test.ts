import { AccessKey, IAccessKey } from './AccessKey';
import { JWK } from './JWK';

describe('AccessKey', () => {
  test('create from base 64 encoded access key -> valid base 64', () => {
    let clientId: string = 'V5gqHxkzihZKdQTSc6DFYnkd';
    let customerId: string = '7215189634';
    let domain: string = 'laserfiche.ca';
    let jwk: JWK = {
      kty: 'EC',
      crv: 'P-256',
      use: 'sig',
      kid: '_pk_xM5VCqEND6OULr_DNYs-GegAUJwLBP9lyFenAMh',
      x: '0CfMWX6yOmNo7F_km8nv8SAkQPUzDw06LknNzXadwTS',
      y: 'gfNs-JA9v0iW9sqUAdHfXq8ZSAsYxIkYRxOH94cHlal',
      d: 'B1oAZHCPP2Ic03fhRuXVKQpEpQdM5bqqbK7iKQU-4Uh',
      iat: 1659632705,
    };
    let expectedDecodedAccessKey: IAccessKey = new AccessKey(customerId, clientId, domain, jwk);
    let base64EncodedAccessKey: string =
      'ewoJImN1c3RvbWVySWQiOiAiNzIxNTE4OTYzNCIsCgkiY2xpZW50SWQiOiAiVjVncUh4a3ppaFpLZFFUU2M2REZZbmtkIiwKCSJkb21haW4iOiAibGFzZXJmaWNoZS5jYSIsCgkiandrIjogewoJCSJrdHkiOiAiRUMiLAoJCSJjcnYiOiAiUC0yNTYiLAoJCSJ1c2UiOiAic2lnIiwKCQkia2lkIjogIl9wa194TTVWQ3FFTkQ2T1VMcl9ETllzLUdlZ0FVSndMQlA5bHlGZW5BTWgiLAoJCSJ4IjogIjBDZk1XWDZ5T21ObzdGX2ttOG52OFNBa1FQVXpEdzA2TGtuTnpYYWR3VFMiLAoJCSJ5IjogImdmTnMtSkE5djBpVzlzcVVBZEhmWHE4WlNBc1l4SWtZUnhPSDk0Y0hsYWwiLAoJCSJkIjogIkIxb0FaSENQUDJJYzAzZmhSdVhWS1FwRXBRZE01YnFxYks3aUtRVS00VWgiLAoJCSJpYXQiOiAxNjU5NjMyNzA1Cgl9Cn0=';
    let decodedAccessKey: IAccessKey = AccessKey.createFromBase64EncodedAccessKey(base64EncodedAccessKey);
    expect(expectedDecodedAccessKey.clientId).toBe(decodedAccessKey.clientId);
    expect(expectedDecodedAccessKey.customerId).toBe(decodedAccessKey.customerId);
    expect(expectedDecodedAccessKey.domain).toBe(decodedAccessKey.domain);
    expect(expectedDecodedAccessKey.jwk.kty).toBe(decodedAccessKey.jwk.kty);
    expect(expectedDecodedAccessKey.jwk.crv).toBe(decodedAccessKey.jwk.crv);
    expect(expectedDecodedAccessKey.jwk.d).toBe(decodedAccessKey.jwk.d);
    expect(expectedDecodedAccessKey.jwk.kid).toBe(decodedAccessKey.jwk.kid);
    expect(expectedDecodedAccessKey.jwk.use).toBe(decodedAccessKey.jwk.use);
    expect(expectedDecodedAccessKey.jwk.x).toBe(decodedAccessKey.jwk.x);
    expect(expectedDecodedAccessKey.jwk.y).toBe(decodedAccessKey.jwk.y);
    expect(expectedDecodedAccessKey.jwk.iat).toBe(decodedAccessKey.jwk.iat);
  });

  test.each([['YXNkYXNkYXNkYXNkYWQ='], ['你好你好'], ['"This is a "string" in JS"'], ['c\nc'], ['😀 😃 😄 😁']])(
    'create from base 64 encoded access key -> %s',
    (base64EncodedAccessKey) => {
      expect(() => {
        AccessKey.createFromBase64EncodedAccessKey(base64EncodedAccessKey);
      }).toThrow(`${Object.keys({ base64EncodedAccessKey })} is not valid`);
    }
  );

  test.each([[''], ['     '], ['\n']])("create from base 64 encoded access key -> '%s'", (base64EncodedAccessKey) => {
    expect(() => {
      AccessKey.createFromBase64EncodedAccessKey(base64EncodedAccessKey);
    }).toThrow('Base 64 Encoded Access Key cannot be null or empty');
  });
});
