import { type Document, createSchema, getModel, ObjectId, type IUser } from "$lib/models";

export interface IServer extends Document {
	name: string;
	users: IUser[];
	isDirect: boolean;
}

export const serverSchema = createSchema({
	name: { type: String },
	isDirect: { type: Boolean },
	users: [
		{
			type: ObjectId,
			ref: "User",
			default: []
		}
	]
});

export const Server = getModel<IServer>("Server", serverSchema);
