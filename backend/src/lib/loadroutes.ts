import * as glob from "glob";
import * as Hapi from "hapi";
import * as path from "path";
import { IServerConfigurations } from "../../config";
import { IDatabase } from "../database";

export default function loadRoutes(
	server: Hapi.Server,
	configs: IServerConfigurations,
	database: IDatabase,
) {
	const routesMainFiles = glob.sync("dist/src/api/**/main.js");
	return routesMainFiles.forEach((file: any) => {
		return import(path.resolve(file))
			.then((route: any) => {
				route.init(server, configs, database);
			})
			.catch((err) => {
				console.log(`Something happened loading the errors: ${err}`);
			});
	});
}
