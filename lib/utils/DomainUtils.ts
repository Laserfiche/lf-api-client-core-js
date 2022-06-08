/** @internal */
export function getRegionFromAccountId(accountId: string | undefined, env: string) {
  if (accountId?.length == 9) {
    return `${env}laserfiche.com`;
  } else if (accountId?.length == 10 && accountId.slice(0, 1) === '1') {
    return `${env}laserfiche.ca`;
  } else if (accountId?.length == 10 && accountId.slice(0, 1) === '2') {
    return `${env}eu.laserfiche.com`;
  }
  return `${env}laserfiche.com`;
}
/**
 * Creates the Laserfiche repository API base address
 * @param regionDomain Laserfiche Cloud Regional Domain
 * @returns Laserfiche repository API base address
 * @example
 * ```typescript
 * getRepositoryEndpoint('laserfiche.com'); // 'https://api.laserfiche.com/repository'
 * ```
 */
export function getRepositoryEndpoint(regionDomain: string): string {
  if (!regionDomain) throw new Error('regionDomain is undefined.');
  return `https://api.${regionDomain}/repository`;
}

/** @internal */
export function getOauthTokenUrl(regionDomain: string): string {
  if (!regionDomain) throw new Error('regionDomain is undefined.');
  return `https://signin.${regionDomain}/OAuth/Token`;
}

/** @internal */
export function getEnvironmentSubDomain(baseUrl: string): string {
  if (baseUrl.includes('clouddev')) return 'a.clouddev.';
  else if (baseUrl.includes('cloudtest')) return 'cloudtest.';
  return '';
}
