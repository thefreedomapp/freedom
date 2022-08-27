import * as trpc from "@trpc/server";
import type { RequestEvent } from "@sveltejs/kit";
import { router as userRouter } from "./users";
import { dev } from "$app/env";
import type { inferAsyncReturnType } from "@trpc/server";
import prisma from "$lib/prisma";
import cookie from "cookie";

export const createContext = async (event: RequestEvent) => {
	const token = cookie.parse(event.request.headers.get("cookie") || "").token;

	return {
		user: token
			? await prisma.user.findFirst({
					where: { token }
			  })
			: null
	};
};

export type CreateContextFn = inferAsyncReturnType<typeof createContext>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const router = trpc
	.router<CreateContextFn>()
	.formatError(({ error, shape }) => {
		if (error.code === "INTERNAL_SERVER_ERROR" && !dev)
			return { ...shape, message: "INTERNAL SERVER ERROR" };
		else return shape;
	})
	.merge("users:", userRouter);

export type Router = typeof router;
