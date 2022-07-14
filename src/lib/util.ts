import { connect as innerConnect } from "mongoose";

let __connected = false;
export const connectDB = async () => {
	if (!__connected) {
		if (import.meta.env.VITE_MONGODB_URI) {
			await innerConnect(import.meta.env.VITE_MONGODB_URI);
		} else {
			throw new Error("VITE_MONGO_URI is not defined");
		}
	}
};

export const errorResponse = (path: string, message: string) => {
	return {
		status: 303,
		headers: {
			Location: path + "?error=" + encodeURIComponent(message)
		}
	};
};
