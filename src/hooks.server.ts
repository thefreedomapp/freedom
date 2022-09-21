// src/hooks.ts
import { createTRPCHandle } from "trpc-sveltekit";
import { router, createContext } from "$lib/tRPC/server";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) =>
	await createTRPCHandle({
		url: "/trpc",
		createContext,
		router,
		event,
		resolve
	});
