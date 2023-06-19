import * as nconf from "nconf";
import * as path from "path";

// Read Configurations
const configs = new nconf.Provider({
	env: true,
	argv: true,
	store: {
		type: "file",
		file: path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`),
	},
});

export interface IServerConfigurations {
	port: number;
	plugins: string[];
	jwtSecret: string;
	refreshSecret: string;
	jwtExpiration: string;
	routePrefix: string;
	meetingsApiUrl: string;
}

export interface IDataConfiguration {
	connectionString: string;
}

export interface IAWSConfiguration {
	accessKey: string;
	bucketName: string;
	secretKey: string;
}

export function getDatabaseConfig(): IDataConfiguration {
	return configs.get("database");
}

export function getServerConfigs(): IServerConfigurations {
	return configs.get("server");
}

export function getAWSConfigs(): IAWSConfiguration {
	return configs.get("aws");
}
