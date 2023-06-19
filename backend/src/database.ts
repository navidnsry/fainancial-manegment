import * as Mongoose from "mongoose";
import { IDataConfiguration } from "../config";
import { ICard, CardModel } from "./models/card/card";
import { BillModel, IBill } from "./models/payments/bill/bill";
import { BillPaymentModel, IBillPayment } from "./models/payments/bill/billPayment";
export interface IDatabase {
	cardModel: Mongoose.Model<ICard>;
	billModel: Mongoose.Model<IBill>;
	billPaymentModel: Mongoose.Model<IBillPayment>;
}

const dbModels = {
	cardModel: CardModel,
	billModel: BillModel,
	billPaymentModel: BillPaymentModel,
};

export default class Database {
	public connection: Mongoose.Connection;
	private config: IDataConfiguration;

	constructor(config: IDataConfiguration) {
		this.config = config;
		console.log(process.env);
	}

	public init(): IDatabase {
		(Mongoose as any).Promise = Promise;
		Mongoose.connect(process.env.MONGO_URL || this.config.connectionString);

		this.connection = Mongoose.connection;

		this.connection.on("error", (error) => {
			console.log(`Unable to connect to database: ${this.config.connectionString}`);
			console.error(error);
		});

		this.connection.once("open", () => {
			console.log(`Connected to database: ${this.config.connectionString}`);
		});

		return dbModels;
	}

	public initAsync(): Promise<IDatabase> {
		return new Promise((resolve, reject) => {
			(Mongoose as any).Promise = Promise;
			Mongoose.connect(process.env.MONGO_URL || this.config.connectionString);

			this.connection = Mongoose.connection;

			this.connection.on("error", (err) => {
				console.log(`Unable to connect to database: ${this.config.connectionString}`);
				console.error(err);
				reject(err);
			});

			this.connection.once("open", () => {
				console.log(`Connected to database: ${this.config.connectionString}`);
				resolve(dbModels);
			});
		});
	}
}
