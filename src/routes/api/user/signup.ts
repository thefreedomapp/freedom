import type { RequestHandler } from "@sveltejs/kit";
import { hash } from "$lib/bcrypt";
import User from "$lib/models/user";
import { serialize } from "cookie";
import { dev } from "$app/env";
import { errorResponse } from "$lib/util";

export const post: RequestHandler = async (req) => {
	const formData = await req.request.formData();

	const name = formData.get("name") as string;
	const username = formData.get("username") as string;
	const email = (formData.get("email") as string).toLowerCase();
	const raw_password = formData.get("password") as string;

	if (!name || !username || !email || !raw_password) {
		return errorResponse("/signup", "Missing required fields");
	}

	if (await User.findOne({ email })) {
		return errorResponse("/signup", "Email already in use");
	}

	const password = await hash(raw_password);

	const user = new User({
		name,
		username,
		email,
		password
	});

	await user.save();

	return {
		status: 303,
		headers: {
			"Set-Cookie":
				serialize("token", user.generateToken(), {
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
