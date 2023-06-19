import * as Boom from "boom";
import * as Hapi from "hapi";
import { IServerConfigurations } from "../../../config";
import { IDatabase } from "../../database";
import checkDocumentExistence from "../../helpers/documentvalidator";
import { IRequest } from "../../interfaces/request";
import { cardResponseSchema } from "../../validators/response";
import GeneralController from "../general/controller";

export default class CardController extends GeneralController {
	constructor(server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {
		super(server, configs, database, cardResponseSchema);
	}
	// create card with valid information
	public async create(request: IRequest, h: Hapi.ResponseToolkit) {
		const payload: any = request.payload;

		try {
			const card = await this.database.cardModel.create(payload);
			return h
				.response({
					success: true,
					message: "Card created successfully.",
					id: card.id,
				})
				.code(201);
		} catch (error) {
			return Boom.badRequest(error);
		}
	}

	// Update card with valid information
	public async update(request: IRequest, h: Hapi.ResponseToolkit) {
		const id = request.params.id;
		const payload: any = request.payload;

		try {
			await checkDocumentExistence([{ model: this.database.cardModel, id }]);
		} catch (error) {
			return Boom.notFound(error);
		}

		try {
			const card = await this.database.cardModel.findById(id);
			await card.update({ $set: payload }, { new: true, runValidators: true });
			return h
				.response({
					success: true,
					message: "Card updated successfully.",
				})
				.code(200);
		} catch (error) {
			return Boom.badRequest(error);
		}
	}

	// Delete card with ID
	public async delete(request: IRequest, h: Hapi.ResponseToolkit) {
		const id = request.params.id;

		try {
			await checkDocumentExistence([{ model: this.database.cardModel, id }]);
		} catch (error) {
			return Boom.notFound(error);
		}
		try {
			const card = await this.database.cardModel.findById(id);
			await card.remove();
			return h
				.response({
					success: true,
					message: "Card removed successfully",
				})
				.code(200);
		} catch (error) {
			return Boom.badImplementation(error);
		}
	}

	// Find a card with ID and return it
	public async findById(request: IRequest, h: Hapi.ResponseToolkit) {
		const id = request.params.id;
		try {
			const card = this.database.cardModel.findById(id);

			return h.response(card);
		} catch (error) {
			return Boom.notFound(error);
		}
	}

	public async findAll(request: IRequest, h: Hapi.ResponseToolkit) {
		let searchQuery;
		try {
			searchQuery = (request.query as any).search;
		} catch (error) {
			return Boom.notFound(error);
		}
		try {
			const cards = this.database.cardModel.find({
				...(searchQuery && { fullName: { $regex: `${searchQuery}`, $options: "i" } }),
			});

			return h.response(cards);
		} catch (error) {
			return Boom.notFound(error);
		}
	}
}
