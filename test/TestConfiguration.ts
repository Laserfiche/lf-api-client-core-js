import { AccessKey } from "../lib/AccessKey";
import { ClientCredentialsOptions } from "../lib/ClientCredentialsOptions";

let testKey: AccessKey = {
	client_id: "c2a8dc23-4ab9-4c89-b5d2-bf17cc2930c8",
	domain: "a.clouddev.laserfiche.com",
	csid: "948224660",
	accessKey: {
		"kty": "EC",
		"crv": "P-256",
		"use": "sig",
		"kid": "4PfoRh6Yaodl6okyxSnam_qyMxQf5nEP15WozRoedz0",
		"x": "VFNfDEbE788oK05gYQ1brPiEv9pxzrOOlP56GBt_8FM",
		"y": "_WcLoFbUOeWuVxN35bBFwKAZkVafVCGCXsFuGHMtUL4",
		"d": "yAwQ2eZZafZ2hVYrnu2WzW_8wid-E-Hz-d04kv7kyVI"
	}
};

let testServicePrincipalKey: string = "L43IRUZPra4oX_kgaJzk";

let testConfig: ClientCredentialsOptions = {
    servicePrincipalKey: testServicePrincipalKey,
    accessKey: testKey
}

export { testConfig };