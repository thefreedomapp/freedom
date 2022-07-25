import { User, type IUser } from "$lib/models";
import { authenticate, connectDB, errorResponse, serializeUser } from "$lib/sutil";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (req) => {
	await connectDB();

	const user = await authenticate(req).then((u) => u?.populate("friends"));
	if (!user) {
		return errorResponse(req, "Not authenticated");
	}

	return {
		body: {
			friends: await getFriends(user)
		}
	};
};

export const POST: RequestHandler = async (req) => {
	await connectDB();

	const user = await authenticate(req);
	if (!user) {
		return errorResponse(req, "Not authenticated");
	}

	const formData = await req.request.formData();
	const friendUsername = formData.get("username") as string;

	if (!friendUsername) {
		return errorResponse(req, "Missing required fields");
	}

	const friend = await User.findOne({ username: friendUsername });
	if (!friend) {
		return errorResponse(req, "Friend not found");
	}

	friend.friends.push(user);
	await friend.save();

	user.friends.push(friend);
	await user.save();

	return {
		body: {
			friends: await getFriends(user)
		}
	};
};

const getFriends = (user: IUser) =>
	Promise.all(
		user.friends.map(async (friend) => ({
			friend: serializeUser(friend),
			direct: await user.getDirectServer(friend)
		}))
	);
