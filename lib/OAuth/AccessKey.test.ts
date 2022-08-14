import { createFromBase64EncodedAccessKey, AccessKey } from './AccessKey';

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
    console.log(decodedAccessKeyJSON);
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
      } catch (err : any) {
        const msg : string | undefined = err?.message;
        return msg?.includes('Unexpected') && msg?.includes('JSON');
      }
    }).toBeTruthy();
  });
});
