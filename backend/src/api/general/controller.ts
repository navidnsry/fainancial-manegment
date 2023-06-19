import * as Boom from "boom";
import * as Hapi from "hapi";
import { ObjectSchema } from "joi";
import { IServerConfigurations } from "../../../config";
import { IDatabase } from "../../database";

import { IRequest } from "../../interfaces/request";

export default abstract class GeneralController {
	protected responseKeys: string;
	protected configs: IServerConfigurations;
	protected database: IDatabase;
	protected server: Hapi.Server;

	constructor(
		server: Hapi.Server,
		configs: IServerConfigurations,
		database?: IDatabase,
		responseSchema?: ObjectSchema,
	) {
		this.configs = configs;
		this.database = database;
		this.server = server;
	}

	// Creates a new document in POST requests
	public abstract create(
		request: IRequest,
		h: Hapi.ResponseToolkit,
	): Promise<Hapi.ResponseObject | Boom<null>>;
	// Update an existing document in PUT requests
	public abstract update(
		request: IRequest,
		h: Hapi.ResponseToolkit,
	): Promise<Hapi.ResponseObject | Boom<null>>;
	// Finds one specific document in the given entity with specific queries
	public abstract findById(
		request: IRequest,
		h: Hapi.ResponseToolkit,
	): Promise<Hapi.ResponseObject | Boom<null>>;





}
