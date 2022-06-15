import { CoreUtils, StringUtils } from "@laserfiche/lf-js-utils";
import crypto from "crypto";
/**
 * Generates a random PKCE code verifier
 * @returns PKCE code verifier
 */
export function generateCodeVerifier(): string {
  const array = new Uint8Array(25);
  const randomString = generateRandomValuesFromArray(array);
  const code_verifier_raw = Array.from(randomString, dec2base64).join('');
  const code_verifier = StringUtils.stringToBase64(code_verifier_raw)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return code_verifier;
}

export function generateRandomValuesFromArray(array: Uint8Array): Uint8Array {
  let randomArray;
  if (CoreUtils.isBrowser()) {
    randomArray = window.crypto.getRandomValues(array);
  }
  else {
    randomArray = crypto.randomBytes(array.length)
  }
  return randomArray;
}

export async function hashMessageToBase64(message: string) {
  let hashEncoded;
  if (CoreUtils.isBrowser()) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8); // hash the message
    hashEncoded = arrayBufferToBase64(hashBuffer)
  }
  else {
    const hash = crypto.createHash('sha256');
    hash.update(message);
    hashEncoded = hash.digest('base64');
  }
  return hashEncoded;
}
/**
 * Generates a PKCE code challenge given the code verifier
 * @param code_verifier
 * @returns The PKCE code challenge
 */
export async function generateCodeChallengeAsync(code_verifier: string): Promise<string> {
  // const msgUint8 = new TextEncoder().encode(code_verifier); // encode as (utf-8) Uint8Array
  const hashEncoded = await (await hashMessageToBase64(code_verifier) // hash the message
  ) // hash the message
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return hashEncoded;
}


// TODO: move to js utils
function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return StringUtils.stringToBase64(binary);
}

// TODO: move to js-utils
function dec2base64(dec: number) {
  return dec.toString(16).padStart(2, "0");
}
