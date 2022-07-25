import { Server } from "$lib/models";
import { authenticate, errorResponse } from "$lib/sutil";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (req) => {
	const user = await authenticate(req);
	if (!user) {
		return errorResponse(req, "Not authenticated.");
	}

	const server = await Server.findById(req.params.id);
	if (!server) {
		return errorResponse(req, "Server not found");
	}

	return {
		body: {
			server
		}
	};
};
