import * as Joi from "joi";
import { customJoi } from "../lib/customValidator";

// JWT Header validator for hapi
export const jwtHeader = Joi.object({
	authorization: Joi.string()
		.required()
		.description("JWT Authorization Token"),
}).unknown();

// General string validator
export const booleanQueryParam = Joi.bool();
export const stringQueryParam = Joi.string();
export const requiredStringQueryParam = Joi.string().required();
export const arrayQueryParam = Joi.alternatives([Joi.array().items(Joi.string()), Joi.string()]);
export const paginationQueryParam = Joi.number().min(0);

// ID in url params validator for hapi
export const idParam = Joi.string()
	.required()
	.description("ID of document in entity");

// Action type for getting fields
export const actionQueryParam = Joi.valid(["edit", "create"]).description(
	"Can only be 'edit' or 'create'",
);

// Key in url query params validator for hapi
export const keyQueryParam = Joi.string().description("Key of needed setting");

// Partial Update Payload
export const partialUpdatePayload = Joi.object()
	.keys({
		updateChunk: Joi.object()
			.keys(null)
			.required(),
		updateProperty: Joi.string().required(),
	})
	.optional();

// Response Schemas
export const createResponse = Joi.object().keys({
	success: Joi.bool(),
	message: Joi.string(),
	id: Joi.string(),
});

export const updateResponse = Joi.object().keys({
	success: Joi.bool(),
	message: Joi.string(),
});

export const deleteResponse = Joi.object().keys({
	success: Joi.bool(),
	message: Joi.string(),
});

export const error401UnauthorizedResponse = Joi.object().keys({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
	attributes: Joi.object().keys({
		error: Joi.string(),
	}),
});

export const error400InvalidInput = Joi.object().keys({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
	path: Joi.array().items(Joi.string()),
	type: Joi.string(),
});

export const error400GroupResponse = Joi.object().keys({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
});

export const error500GroupResponse = Joi.object().keys({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
});
