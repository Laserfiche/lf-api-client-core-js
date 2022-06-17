import { CoreUtils, StringUtils } from "@laserfiche/lf-js-utils";
import crypto from "crypto";
/**
 * Generates a random PKCE code verifier
 * @returns PKCE code verifier
 */
export function generateCodeVerifier(): string {
  const array = new Uint8Array(25);
  const randomString = generateRandomValuesFromArray(array);
  const code_verifier_raw = Array.from(randomString, StringUtils.base10ToBase16).join('');
  const code_verifier = StringUtils.stringToBase64(code_verifier_raw)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return code_verifier;
}

/**
 * Generates a PKCE code challenge given the code verifier
 * @param code_verifier
 * @returns The PKCE code challenge
 */
export async function generateCodeChallengeAsync(code_verifier: string): Promise<string> {
  const base64CodeVerifierHash = (await createBase64SHA256Hash(code_verifier))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return base64CodeVerifierHash;
}

// Generates random array
function generateRandomValuesFromArray(array: Uint8Array): Uint8Array {
  let randomArray;
  if (CoreUtils.isBrowser()) {
    randomArray = window.crypto.getRandomValues(array);
  }
  else {
    randomArray = crypto.randomBytes(array.length)
  }
  return randomArray;
}

async function createBase64SHA256Hash(message: string) {
  let hashEncoded;
  if (CoreUtils.isBrowser()) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8); // hash the message
    hashEncoded = StringUtils.arrayBufferToBase64(hashBuffer)
  }
  else {
    const hash = crypto.createHash('sha256');
    hash.update(message);
    hashEncoded = hash.digest('base64');
  }
  return hashEncoded;
}
