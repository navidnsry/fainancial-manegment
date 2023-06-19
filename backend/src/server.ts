import * as Hapi from "hapi";
import { IServerConfigurations } from "./../config";
import { IDatabase } from "./database";
import loadRoutes from "./lib/loadroutes";
export async function init(
	configs: IServerConfigurations,
	database: IDatabase,
): Promise<Hapi.Server> {
	try {
		const port = process.env.PORT || configs.port;
		const server = new Hapi.Server({
			port,
			routes: {
				cors: { origin: ["*"] },
				timeout: {
					server: 12000,
					socket: 12800,
				},
			},
			host: process.env.HOST || "localhost",
		});

		if (configs.routePrefix) {
			server.realm.modifiers.route.prefix = configs.routePrefix;
		}

		//  Setup Hapi Plugins
		const plugins: string[] = configs.plugins;
		const pluginOptions = {
			database,
			serverConfigs: configs,
		};

		console.log("Register Routes");
		loadRoutes(server, configs, database);
		console.log("Routes registered successfully.");

		return server;
	} catch (err) {
		console.log("Error starting server: ", err);
		throw err;
	}
}
