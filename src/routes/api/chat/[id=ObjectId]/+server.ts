import { Chat } from "$lib/models/chat";
import { authenticate, errorResponse } from "$lib/sutil";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (req) => {
	const user = await authenticate(req);
	if (!user) {
		return errorResponse(req, "Not authenticated.");
	}

	const chat = await Chat.findById(req.params.id).populate("messages");
	if (!chat) {
		return errorResponse(req, "Chat not found");
	}

	return {
		body: {
			chat
		}
	};
};
