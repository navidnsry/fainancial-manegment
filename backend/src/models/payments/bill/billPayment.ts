import * as Mongoose from "mongoose";

export interface IBillPayment extends Mongoose.Document {
	amount: number;
	taxPrice: number;
	billDate: Date;
	paymentDate: Date;
	paymentAccount: string;
	documentPicture: Mongoose.Types.ObjectId[] | string[];
	trackingNumber: string;
	paymentID: number;
	paymentBill: number;
}

export const BillPaymentSchema = new Mongoose.Schema(
	{
		amount: {
			type: Number,
			required: true,
		},
		taxPrice: {
			type: Number,
		},
		paymentID: {
			type: Number,
		},
		paymentBill: {
			type: Number,
		},

		paymentDate: {
			type: Date,
			required: true,
			default: new Date(),
		},
		billDate: {
			type: Date,
			required: true,
			default: new Date(),
		},
		paymentAccount: {
			type: String,
		},
		trackingNumber: {
			type: String,
		},

		documentPicture: [
			{
				type: Mongoose.Schema.Types.ObjectId,
				ref: "FileAttachment",
			},
		],
	},
	{
		timestamps: true,
	},
);

export const BillPaymentModel = Mongoose.model<IBillPayment>("BillPayment", BillPaymentSchema);
