// utilities for the server

import type { RequestEvent } from "@sveltejs/kit";
import mongoose from "mongoose";
import cookie from "cookie";
import { User, type IUser } from "$lib/models";
import type { SerializedUser } from "$lib/common";
import { env } from "$env/dynamic/private";

let __connected = false;
export const connectDB = async () => {
	if (!__connected) {
		if (!env.MONGODB_URI) {
			throw new Error("MONGODB_URI is not defined");
		}
		await mongoose.connect(env.MONGODB_URI);
		__connected = true;
	}
};

export const accepts = (req: RequestEvent, ...types: string[]) => {
	const accept = req.request.headers.get("Accept") || "";
	return types.some((type) => accept.includes(type));
};

export const errorResponse = (req: RequestEvent, message: string) => {
	const jsonError = {
		status: 400,
		body: {
			error: message
		}
	};

	if (accepts(req, "text/html")) {
		let url: URL;
		try {
			url = new URL(req.request.headers.get("Referer") || "/");
		} catch (_) {
			return jsonError;
		}
		url.searchParams.set("error", message);

		return {
			status: 303,
			headers: {
				Location: url.toString()
			}
		};
	} else {
		return jsonError;
	}
};

export const authenticate = async (req: RequestEvent) => {
	// get the token from the cookie called token
	const cookies = cookie.parse(req.request.headers.get("Cookie") || "");
	const token = cookies.token;
	const userId = cookies.user;

	const user = await User.findById(userId).populate("friends").populate("chats");

	// this makes sure that the user:
	// 1. exists
	// 2. has a correct token
	if (!user?.compareToken(token)) {
		return;
	}

	return user;
};

export const serializeUser = (user: IUser): SerializedUser => {
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		friends: (user.friends ?? []).map(serializeUser)
	};
};
