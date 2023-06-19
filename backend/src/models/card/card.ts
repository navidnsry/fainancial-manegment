import { number } from "mathjs";
import * as Mongoose from "mongoose";
const mongooseUniqueValidator = require("mongoose-unique-validator");

export interface ICard extends Mongoose.Document {
	fullName: string;
	codeNumber: number;
	cvvNumber: number;
	expirationDate: Date;
	shabaNumber: number;
	bankType: string;
	createdAt: Date;
	updateAt: Date;
}

export const CardSchema = new Mongoose.Schema({
	codeNumber: {
		type: number,
		trim: true,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	cvvNumber: {
		type: number,
		trim: true,
		required: true,
	},
	expirationDate: {
		type: Date,
		required: true,
	},
	shabaNumber: {
		type: number,
		trim: true,
	},
	bankType: {
		type: String,
		required: true,
	},
}).plugin(mongooseUniqueValidator);

export const CardModel = Mongoose.model<ICard>("Card", CardSchema);
