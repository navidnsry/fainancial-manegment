import * as Hapi from "hapi";
import { IServerConfigurations } from "../../../config";
import { IDatabase } from "../../database";
import * as RouteValidator from "../../validators/routes";
import CardController from "./card-controllers";
import * as CardValidator from "./card-validator";

export default function(
	server: Hapi.Server,
	serverConfigs: IServerConfigurations,
	database: IDatabase,
) {
	const cardController = new CardController(server, serverConfigs, database);
	server.bind(cardController);

	server.route({
		method: "GET",
		path: "/cards/{id}",
		options: {
			handler: cardController.findById,
			auth: "jwt",
			tags: ["api", "cards"],
			description: "Get card info by id.",
			validate: {
				headers: RouteValidator.jwtHeader,
				params: {
					id: RouteValidator.idParam,
				},
				query: {
					properties: RouteValidator.stringQueryParam,
					sort: RouteValidator.stringQueryParam,
				},
			},
			plugins: {
				"hapi-swagger": {
					responses: {
						200: {
							description: "card found.",
							schema: CardValidator.findOneResponse,
						},
						400: {
							description: "Authentication Error.",
							schema: RouteValidator.error400InvalidInput,
						},
						401: {
							description: "Unauthorized Access.",
							schema: RouteValidator.error401UnauthorizedResponse,
						},
						404: {
							description: "card Not Found.",
							schema: RouteValidator.error400GroupResponse,
						},
					},
				},
			},
		},
	});

	server.route({
		method: "GET",
		path: "/cards",
		options: {
			handler: cardController.findAll,
			auth: "jwt",
			tags: ["api", "cards"],
			description: "Get list of all cards.",
			validate: {
				headers: RouteValidator.jwtHeader,
				query: {
					properties: RouteValidator.stringQueryParam,
					sort: RouteValidator.stringQueryParam,
					search: RouteValidator.stringQueryParam,
				},
			},
			plugins: {
				"hapi-swagger": {
					responses: {
						200: {
							description: "cards found.",
							schema: CardValidator.findAllResponse,
						},
						401: {
							description: "Unauthorized Access.",
							schema: RouteValidator.error401UnauthorizedResponse,
						},
						404: {
							description: "card Not Found.",
							schema: RouteValidator.error400GroupResponse,
						},
					},
				},
			},
		},
	});

	server.route({
		method: "DELETE",
		path: "/cards/{id}",
		options: {
			handler: cardController.delete,
			auth: "jwt",
			tags: ["api", "cards"],
			description: "Delete current card.",
			validate: {
				headers: RouteValidator.jwtHeader,
				params: {
					id: RouteValidator.idParam,
				},
			},
			plugins: {
				"hapi-swagger": {
					responses: {
						200: {
							description: "card Deleted.",
							schema: RouteValidator.deleteResponse,
						},
						401: {
							description: "Unauthorized Access.",
							schema: RouteValidator.error401UnauthorizedResponse,
						},
						404: {
							description: "card Not Found.",
							schema: RouteValidator.error400GroupResponse,
						},
						500: {
							description: "Internal Server Error.",
							schema: RouteValidator.error500GroupResponse,
						},
					},
				},
			},
		},
	});

	server.route({
		method: "POST",
		path: "/cards",
		options: {
			handler: cardController.create,
			auth: "jwt",
			tags: ["api", "cards"],
			description: "Create a card.",
			validate: {
				headers: RouteValidator.jwtHeader,
				payload: CardValidator.createPayload,
			},
			plugins: {
				"hapi-swagger": {
					payloadType: "form",
					responses: {
						201: {
							description: "card Created.",
							schema: RouteValidator.createResponse,
						},
						400: {
							description: "Invalid Payload Information.",
							schema: RouteValidator.error400InvalidInput,
						},
						401: {
							description: "Unauthorized Access.",
							schema: RouteValidator.error401UnauthorizedResponse,
						},
						403: {
							description: "Forbidden.",
							schema: RouteValidator.error400GroupResponse,
						},
						500: {
							description: "Internal Server Error.",
							schema: RouteValidator.error500GroupResponse,
						},
					},
				},
			},
			payload: {
				maxBytes: 1e7,
				output: "stream",
				parse: true,
				timeout: false,
			},
		},
	});

	server.route({
		method: "PUT",
		path: "/cards/{id}",
		options: {
			handler: cardController.update,
			auth: "jwt",
			tags: ["api", "cards"],
			description: "Update current card info.",
			validate: {
				payload: CardValidator.updatePayload,
				headers: RouteValidator.jwtHeader,
				params: {
					id: RouteValidator.idParam,
				},
			},
			plugins: {
				"hapi-swagger": {
					payloadType: "form",
					responses: {
						200: {
							description: "card Update.",
							schema: RouteValidator.deleteResponse,
						},
						400: {
							description: "Invalid Payload Information.",
							schema: RouteValidator.error400InvalidInput,
						},
						401: {
							description: "Unauthorized Access.",
							schema: RouteValidator.error401UnauthorizedResponse,
						},
						404: {
							description: "card Not Found.",
							schema: RouteValidator.error400GroupResponse,
						},
						500: {
							description: "Internal Server Error.",
							schema: RouteValidator.error500GroupResponse,
						},
					},
				},
			},
			payload: {
				maxBytes: 1e7,
				output: "stream",
				parse: true,
				timeout: false,
			},
		},
	});
}
