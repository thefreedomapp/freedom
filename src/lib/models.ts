import {
	type Model,
	type Document as MongooseDocument,
	Types,
	Schema,
	models,
	model
} from "mongoose";

export interface Document extends MongooseDocument {
	_id: Types.ObjectId;

	/**
	 * @description Gets the `createdAt` timestamp
	 *
	 * @returns {Date}
	 */
	createdAt(): Date;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSchema = <T = any>(schema: T) => {
	for (const k in schema) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if ((schema[k] as any).required !== false) (schema[k] as any).required = true;
	}
	const s = new Schema(schema);
	s.methods.createdAt = function (this: Document) {
		return this._id.getTimestamp();
	};

	return s;
};

export const getModel = <T extends Document>(name: string, schema: Schema) =>
	(models[name] as Model<T> | undefined) ?? model<T>(name, schema);

export class ObjectId extends Types.ObjectId {}

// re-export models.
export { User, type IUser } from "$lib/models/user";
export { Server, type IServer } from "$lib/models/server";
