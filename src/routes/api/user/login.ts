import type { RequestHandler } from "@sveltejs/kit";
import { User } from "$lib/models";
import { cookies, errorResponse } from "$lib/util";
import cookie from "cookie";
import { dev } from "$app/env";

export const POST: RequestHandler = async (req) => {
	const formData = await req.request.formData();

	const email = (formData.get("email") as string).toLowerCase();
	const password = formData.get("password") as string;

	if (!email || !password) {
		return errorResponse(req, "Missing required fields");
	}

	const optional_user = await User.findOne({ email });

	// is falsey if user is not found or their password is incorrect.
	const isValid = optional_user?.comparePassword(password);

	if (!isValid) {
		return errorResponse(req, "Invalid email or password");
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const user = optional_user!;

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
