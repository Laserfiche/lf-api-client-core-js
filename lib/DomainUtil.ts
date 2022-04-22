/** @internal */
export class DomainUtil {

    public static getRegionFromAccountId(accountId: string | undefined, env: string) {
        if (accountId?.length == 9) {
            return `${env}laserfiche.com`;
       } else if (accountId?.length == 10 && accountId.slice(0, 1) === '1') {
            return `${env}laserfiche.ca`;
       } else if (accountId?.length == 10 && accountId.slice(0, 1) === '2') {
            return `${env}eu.laserfiche.com`;
       }
       return `${env}laserfiche.com`;
    }

    public static getRepositoryEndpoint(env: string): string {
        return `https://api.${env}/repository`;
    }

    public static getOauthTokenUrl(env: string): string {
        env = env.includes("api") ? env.replace("api", "signin") : env;
        return `https://signin.${env}/OAuth/Token`;
    }

    public static getEnvironmentSubDomain(baseUrl: string): string {
        if (baseUrl.includes('clouddev')) return 'a.clouddev.';
        else if (baseUrl.includes('cloudtest')) return 'cloudtest.';
        return '';
    }
}