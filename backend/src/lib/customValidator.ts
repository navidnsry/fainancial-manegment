import * as Joi from "joi";
import { parse } from "mathjs";

export const customJoi = Joi.extend((joi: Joi.Root) => ({
	base: joi.string(),
	name: "string",
	language: {
		formula: "Needs to be a valid formula",
		objectId: "Needs to be a valid ObjectId",
	},
	rules: [
		{
			name: "objectId",
			validate(params: any, value: any, state: any, options: any) {
				if (!/^[0-9a-fA-F]{24}$/.test(value)) {
					return this.createError("string.objectId", { v: value }, state, options);
				}

				return value;
			},
		},
		{
			name: "formula",
			validate(params: any, value: any, state: any, options: any) {
				try {
					parse(value);
					return value;
				} catch (error) {
					return this.createError("string.formula", { v: value }, state, options);
				}
			},
		},
	],
}));
