import { connectDB } from "$lib/util";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith("/api")) {
		await connectDB();
	}

	return resolve(event);
};
