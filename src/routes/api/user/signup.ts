import type { RequestHandler } from "@sveltejs/kit";
import { hash } from "$lib/bcrypt";
import { User } from "$lib/models";
import cookie from "cookie";
import { dev } from "$app/env";
import { cookies, errorResponse } from "$lib/sutil";

export const POST: RequestHandler = async (req) => {
	const formData = await req.request.formData();

	const name = formData.get("name") as string;
	const username = formData.get("username") as string;
	const email = (formData.get("email") as string).toLowerCase();
	const raw_password = formData.get("password") as string;

	if (!name || !username || !email || !raw_password) {
		return errorResponse(req, "Missing required fields");
	}

	if (await User.findOne({ email })) {
		return errorResponse(req, "Email already in use");
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
			Location: "/",
			...cookies(
				cookie.serialize("token", user.generateToken(), {
					httpOnly: true,
					secure: !dev,
					sameSite: "strict",
					maxAge: 1000 * 60 * 60 * 24 * 7,
					path: "/api"
				}),
				cookie.serialize("user", user._id.toString(), {
					path: "/"
				})
			)
		}
	};
};
