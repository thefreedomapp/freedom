import type { RequestEvent } from "@sveltejs/kit";
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

export const accepts = (req: RequestEvent, ...types: string[]) => {
	const accept = req.request.headers.get("Accept") || "";
	return types.some((type) => accept.includes(type));
};

export const errorResponse = (req: RequestEvent, message: string) => {
	if (accepts(req, "text/html")) {
		const url = new URL(req.request.headers.get("Referer") || "/");
		url.searchParams.set("error", message);

		return {
			status: 303,
			headers: {
				Location: url.toString()
			}
		};
	} else {
		return {
			status: 400,
			body: {
				error: message
			}
		};
	}
};
