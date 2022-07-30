import { User } from "$lib/models/user";
import { connectDB, errorResponse, serializeUser } from "$lib/sutil";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (req) => {
	await connectDB();

	const user = await User.findById(req.params.id).populate("friends");
	return user
		? {
				body: {
					user: serializeUser(user)
				}
		  }
		: errorResponse(req, "User not found.");
};
