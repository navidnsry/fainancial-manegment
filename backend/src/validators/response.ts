import * as Joi from "joi";
import { customJoi } from "../lib/customValidator";

export const userResponseSchema = Joi.object().keys({
	fullName: Joi.string(),
	email: Joi.string(),
	anotherEmail: Joi.string(),
	accountNumber: Joi.string(),
	disabled: Joi.string(),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
	_id: customJoi.string().objectId(),
});
export const cardResponseSchema = Joi.object().keys({
	codeNumber: Joi.number().required(),
	cvvNumber: Joi.number().required(),
	expirationDate: Joi.date().required(),
	fullName: Joi.string().required(),
	shabaNumber: Joi.number(),
	bankType: Joi.string().required(),
});
export const billRersponseSchema = Joi.object().keys({
	billType: Joi.string().required(),
	commonName: Joi.string().required(),
	postalCode: Joi.number(),
	address: Joi.string(),
	accountType: Joi.string().required(),
	numberOfOutstandingBills: Joi.number(),
	previousDebt: Joi.number(),
});

export const billPaymentRersponseSchema = Joi.object().keys({
	amount: Joi.number().required(),
	taxPrice: Joi.number(),
	billDate: Joi.date().required(),
	paymentDate: Joi.date().required(),
	paymentAccount: Joi.string().required(),
	trackingNumber: Joi.string().required(),
	paymentID: Joi.number(),
	paymentBill: Joi.number(),
});
