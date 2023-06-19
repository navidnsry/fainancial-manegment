import * as Joi from "joi";
import { cardResponseSchema } from "../../validators/response";

export const createPayload = Joi.object().keys({
	codeNumber: Joi.number().required(),
	cvvNumber: Joi.number().required(),
	expirationDate: Joi.date().required(),
	fullName: Joi.string().required(),
	shabaNumber: Joi.number(),
	bankType: Joi.string().required(),
	password: Joi.string()
		.trim()
		.required(),
});

export const updatePayload = Joi.object().keys({
	codeNumber: Joi.number(),
	cvvNumber: Joi.number(),
	expirationDate: Joi.date(),
	fullName: Joi.string(),
	shabaNumber: Joi.number(),
	bankType: Joi.string(),
	password: Joi.string().trim(),
});

export const findOneResponse = cardResponseSchema;

export const findAllResponse = Joi.array().items(findOneResponse);
