import type { RequestHandler } from "@sveltejs/kit";
import { User } from "$lib/models";
import { serialize } from "cookie";
import { dev } from "$app/env";

export const post: RequestHandler = async (req) => {
	const { email, password }: { email?: string; password?: string } = await req.request.json();

	if (!email || !password) {
		return {
			status: 400,
			body: {
				error: "Missing required fields"
			}
		};
	}

	const user = await User.findOne({ email });

	// is falsey if user is not found or their password is incorrect.
	const isValid = user?.comparePassword(password);

	if (!isValid) {
		return {
			status: 401,
			body: {
				error: "Invalid email or password"
			}
		};
	}

	return {
		status: 200,
		headers: {
			"Set-Cookie": serialize("token", user!.generateToken(), {
				httpOnly: true,
				secure: !dev,
				sameSite: "strict",
				maxAge: 1000 * 60 * 60 * 24 * 7
			})
		}
	};
};
