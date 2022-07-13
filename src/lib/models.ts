import { connect as innerConnect, Schema } from "mongoose";

let connected = false;
export async function connect() {
	if (!connected) {
		if (import.meta.env.VITE_MONGODB_URI) {
			await innerConnect(import.meta.env.VITE_MONGODB_URI);
		} else {
			throw new Error("VITE_MONGO_URI is not defined");
		}
	}
}

export { type IUser, User } from "$lib/models/user";
