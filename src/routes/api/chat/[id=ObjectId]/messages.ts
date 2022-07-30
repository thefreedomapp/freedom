import { Message, Chat } from "$lib/models/chat";
import { authenticate, errorResponse, connectDB } from "$lib/sutil";
import type { RequestHandler } from "@sveltejs/kit";

// this is used so that you don't have to fetch the entire server object
export const GET: RequestHandler = async (req) => {
	await connectDB();

	const user = await authenticate(req);
	if (!user) {
		return errorResponse(req, "Not authenticated");
	}

	const { id } = req.params;
	if (!id) {
		return errorResponse(req, "Missing required fields");
	}

	const chat = await Chat.findById(id, "messages").populate("messages");
	if (!chat || !user.chats.includes(chat)) {
		return errorResponse(req, "Chat not found");
	}

	return {
		status: 200,
		body: {
			messages: chat.messages
		}
	};
};

export const POST: RequestHandler = async (req) => {
	const user = await authenticate(req);
	if (!user) {
		return errorResponse(req, "Not authenticated");
	}

	const message = (await req.request.formData()).get("message") as string;
	const { id } = req.params;
	if (!message || !id) {
		return errorResponse(req, "Missing required fields");
	}

	const chat = await Chat.findById(id).populate("messages");

	console.log(user.chats[0], chat);

	if (
		!chat /* TODO(@TheBotlyNoob): figure out why `|| !user.servers.includes(server)` doesn't work */
	) {
		return errorResponse(req, "Chat not found");
	}

	chat.messages.push(new Message({ user, message }));
	await chat.save();

	return {
		status: 200,
		body: {
			messages: chat.messages
		}
	};
};
