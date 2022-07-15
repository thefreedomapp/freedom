import type { RequestHandler } from "@sveltejs/kit";
import User from "$lib/models/user";
import { errorResponse } from "$lib/util";
import { serialize } from "cookie";
import { dev } from "$app/env";

export const post: RequestHandler = async (req) => {
	const formData = await req.request.formData();

	const email = (formData.get("email") as string).toLowerCase();
	const password = formData.get("password") as string;

	if (!email || !password) {
		return errorResponse(req, "Missing required fields");
	}

	const user = await User.findOne({ email });

	// is falsey if user is not found or their password is incorrect.
	const isValid = user?.comparePassword(password);

	if (!isValid) {
		return errorResponse(req, "Invalid email or password");
	}

	return {
		status: 303,
		headers: {
			"Set-Cookie":
				serialize("token", user!.generateToken(), {
					httpOnly: true,
					secure: !dev,
					sameSite: "strict",
					maxAge: 1000 * 60 * 60 * 24 * 7
				}) +
				";" +
				serialize("user", user!._id),
			Location: "/"
		}
	};
};
