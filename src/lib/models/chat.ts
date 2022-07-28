import { type Document, createSchema, getModel, ObjectId, type IUser } from "$lib/models";

export interface IChat extends Document {
	name: string;
	isDirect: boolean;
	messages: IMessage[];
}

export const chatSchema = createSchema({
	name: { type: String },
	isDirect: { type: Boolean },
	messages: [{ type: ObjectId, ref: "Message" }]
});

export const Chat = getModel<IChat>("Chat", chatSchema);

export interface IMessage extends Document {
	user: IUser;
	message: string;
}

export const messageSchema = createSchema({
	user: { type: ObjectId, ref: "User" },
	message: { type: String }
});

export const Message = getModel<IMessage>("Message", messageSchema);
