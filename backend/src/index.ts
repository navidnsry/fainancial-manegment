import * as Configs from "./../config";
import Database, { IDatabase } from "./database";
import * as Server from "./server";



const start = async (config: Configs.IServerConfigurations, db: IDatabase) => {
	try {
		const server = await Server.init(config, db);
		await server.start();
		console.log("Server running at:", server.info.uri);
	} catch (err) {
		console.error("Error starting server: ", err.message);
		throw err;
	}
};

// Init Database
const dbConfigs = Configs.getDatabaseConfig();
const database = new Database(dbConfigs).init();

// Starting Application Server
const serverConfigs = Configs.getServerConfigs();

// Start the server
start(serverConfigs, database);
