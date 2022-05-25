export interface JWK {
    kty: "EC" | string;
    use: "sig" | string;
    crv: "P-256" | string;
    d: string;
    x: string;
    y: string;
    kid: string;
    [x: string]: unknown; 
}
