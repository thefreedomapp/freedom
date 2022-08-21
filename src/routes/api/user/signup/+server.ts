import type { RequestHandler } from "@sveltejs/kit";
import { hash } from "$lib/bcrypt";
import { User } from "$lib/models/user";
import cookie from "cookie";
import { dev } from "$app/env";
import { connectDB, errorResponse } from "$lib/sutil";

export const POST: RequestHandler = async (req) => {
	await connectDB();

	const formData = await req.request.formData();

	const name = formData.get("name") as string;
	const username = formData.get("username") as string;
	const email = (formData.get("email") as string).toLowerCase();
	const rawPassword = formData.get("password") as string;
	const profilePicture = formData.get("profilePicture") as string;

	if (!name || !username || !email || !rawPassword) {
		return errorResponse(req, "Missing required fields");
	}

	if (await User.findOne({ email })) {
		return errorResponse(req, "Email already in use");
	}

	const password = await hash(rawPassword);

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
			"Set-Cookie": [
				cookie.serialize("token", user.generateToken(), {
					httpOnly: true,
					secure: !dev,
					sameSite: "strict",
					maxAge: 1000 * 60 * 60 * 24 * 7,
					path: "/api"
				}),
				cookie.serialize("user", user.id, {
					path: "/"
				})
			]
		}
	};
};
