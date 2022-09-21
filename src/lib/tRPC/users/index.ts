import * as trpc from "@trpc/server";
import type { CreateContextFn } from "../server";

export const router = trpc.router<CreateContextFn>().query("loggedIn", {
	resolve: ({ ctx }) => ctx.user !== null
});
