// src/hooks.ts
import { createTRPCHandle } from "trpc-sveltekit";
import { router } from "$lib/tRPC/server";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const response = await createTRPCHandle({
		url: "/trpc",
		router,
		event,
		resolve
	});

	return response;
};
