import {
	type Model,
	type Document as MongooseDocument,
	Types,
	Schema,
	models,
	model
} from "mongoose";

export interface Document extends MongooseDocument {
	/**
	 * @description The internal ID of the `Document`.
	 *
	 * @remarks This is used to get the `createdAt` timestamp of the `Document`.
	 * @remarks If you do not desire to expose the date of creation, do not give out this property.
	 */
	_id: Types.ObjectId;

	/**
	 * @description Gets the `createdAt` timestamp
	 *
	 * @returns The date the document was created.
	 */
	createdAt(): Date;
}

/**
 * @description Creates a user schema with all properties required by default.
 *
 * @param schema The schema to use for the model.
 * @returns The constructed Schema.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const createSchema = <T = any>(schema: T) => {
	// sorry for the ugly code!
	for (const k in schema) {
		if (Array.isArray(schema[k])) {
			for (const v in schema[k]) {
				if ((schema[k][v] as any).required !== false) (schema[k][v] as any).required = true;
			}
		}
		if ((schema[k] as any).required !== false) (schema[k] as any).required = true;
	}
	/* eslint-enable @typescript-eslint/no-explicit-any */

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
export { Server, type IServer, Message, type IMessage } from "$lib/models/server";
