import * as trpc from "@trpc/server";
import type { Cookies } from "@sveltejs/kit";
import { router as userRouter } from "./users";
import { dev } from "$app/environment";
import type { inferAsyncReturnType } from "@trpc/server";
import prisma from "$lib/prisma";

export const createContext = async ({ cookies }: { cookies: Cookies }) => {
	const token = cookies.get("token");

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
