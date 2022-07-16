import User from "$lib/models/user";
import { authenticate, errorResponse } from "$lib/util";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (req) => {
	const user = await authenticate(req);
	if (!user) {
		return errorResponse(req, "Not authenticated");
	}

	return {
		body: {
			friends: user.friends.map((friend) => friend._id.toString())
		}
	};
};

export const POST: RequestHandler = async (req) => {
	const user = await authenticate(req);
	if (!user) {
		return errorResponse(req, "Not authenticated");
	}

	const formData = await req.request.formData();
	const friendId = formData.get("friend") as string;

	if (!friendId) {
		return errorResponse(req, "Missing required fields");
	}

	const friend = await User.findById(friendId);
	if (!friend) {
		return errorResponse(req, "Friend not found");
	}

	user.friends.push(friend);
	await user.save();

	return {
		body: {
			friends: user.friends.map((friend) => friend._id.toString())
		}
	};
};
