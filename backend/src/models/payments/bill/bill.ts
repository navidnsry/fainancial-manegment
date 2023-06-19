import * as Mongoose from "mongoose";

export interface IBill extends Mongoose.Document {
	billType: string;
	commonName: string;
	postalCode: number;
	address: string;
	accountType: string;
	numberOfOutstandingBills: number;
	previousDebt: number;
	billPayments: Mongoose.Schema.Types.ObjectId | string;
}

export const BillSchema = new Mongoose.Schema(
	{
		billType: {
			type: String,
			required: true,
		},
		commonName: {
			type: String,
			required: true,
		},
		postalCode: {
			type: Number,
		},
		address: {
			type: String,
		},
		accountType: {
			type: String,
			required: true,
		},
		numberOfOutstandingBills: {
			type: Number,
		},
		previousDebt: {
			type: Number,
		},

		billPayments: [
			{
				type: Mongoose.Schema.Types.ObjectId,
				ref: "",
			},
		],
	},
	{
		timestamps: true,
	},
);

export const BillModel = Mongoose.model<IBill>("Bill", BillSchema);
