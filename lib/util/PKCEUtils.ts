export function generateCodeVerifier() {
  const array = new Uint8Array(25);
  const randomString = window.crypto.getRandomValues(array);
  const code_verifier_raw = Array.from(randomString, dec2base64).join('');
  const code_verifier = btoa(code_verifier_raw)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return code_verifier;
}

/** @internal */
export async function generateCodeChallengeAsync(code_verifier: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(code_verifier); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
  const hashEncoded = arrayBufferToBase64(hashBuffer) // convert bytes to base64 string
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return hashEncoded;
}

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function convertNumber(n: string, fromBase: number, toBase: number) {
  if (fromBase === void 0) {
      fromBase = 10;
  }
  if (toBase === void 0) {
      toBase = 10;
  }
  return parseInt(n.toString(), fromBase).toString(toBase);
}

/** @internal */
export function dec2base64(dec: number) {
  return dec.toString(16).padStart(2, "0");
}
