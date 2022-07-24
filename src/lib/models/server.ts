import { type Document, createSchema, getModel, ObjectId, type IUser } from "$lib/models";

export interface IServer extends Document {
	name: string;
	isDirect: boolean;
	messages: IMessage[];
}

export const serverSchema = createSchema({
	name: { type: String },
	isDirect: { type: Boolean },
	messages: [{ type: ObjectId, ref: "Message" }]
});

export const Server = getModel<IServer>("Server", serverSchema);

export interface IMessage extends Document {
	user: IUser;
	message: string;
}

export const messageSchema = createSchema({
	user: { type: ObjectId, ref: "User" },
	message: { type: String }
});

export const Message = getModel<IMessage>("Message", messageSchema);
