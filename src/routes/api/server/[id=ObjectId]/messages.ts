import { Message, Server } from "$lib/models";
import { authenticate, errorResponse } from "$lib/sutil";
import type { RequestHandler } from "@sveltejs/kit";

// this is used so that you don't have to fetch the entire server object
export const GET: RequestHandler = async (req) => {
	const user = await authenticate(req);
	if (!user) {
		return errorResponse(req, "Not authenticated");
	}

	const { id } = req.params;
	if (!id) {
		return errorResponse(req, "Missing required fields");
	}

	const server = await Server.findById(id, "messages").populate("messages");
	if (!server || !user.servers.includes(server)) {
		return errorResponse(req, "Server not found");
	}

	return {
		status: 200,
		body: {
			messages: server.messages
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

	const server = await Server.findById(id).populate("messages");
	if (!server || !user.servers.includes(server)) {
		return errorResponse(req, "Server not found");
	}

	server.messages.push(new Message({ user, message }));
	await server.save();

	return {
		status: 200,
		body: {
			messages: server.messages
		}
	};
};
