import * as Mongoose from "mongoose";

export interface IFileAttachmentObject {
	title: string;
	file: Mongoose.Types.ObjectId | string;
	isMailFile?: boolean;
}

export interface IFileAttachment extends Mongoose.Document {
	originalName: string;
	fileName: string;
	fileLocation: string;
	createdAt: Date;
	updatedAt: Date;
}

export const FileAttachmentSchema = new Mongoose.Schema(
	{
		originalName: String,
		fileName: {
			type: String,
			required: true,
		},
		fileLocation: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export const FileAttachmentModel = Mongoose.model<IFileAttachment>(
	"FileAttachment",
	FileAttachmentSchema,
);
