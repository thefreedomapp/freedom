import { type Document, createSchema, getModel } from "$lib/models";

export interface IServer extends Document {
	name: string;
	isDirect: boolean;
}

export const serverSchema = createSchema({
	name: { type: String },
	isDirect: { type: Boolean }
});

export const Server = getModel<IServer>("Server", serverSchema);
