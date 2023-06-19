import * as Mongoose from "mongoose";

export interface IIdValidationObject {
	model: Mongoose.Model<Mongoose.Document>;
	id: Mongoose.Types.ObjectId | string;
}

export default async function checkDocumentExistence(idList: IIdValidationObject[]) {
	for (const item of idList) {
		try {
			const document = await item.model.findById(item.id);
			if (!document) {
				throw new Error(
					`No document were found in ${item.model.collection.collectionName} collection with id ${
						item.id
					}`,
				);
			}
		} catch (err) {
			throw new Error(
				`No document were found in ${item.model.collection.collectionName} collection with id ${
					item.id
				}`,
			);
		}
	}
	return true;
}
