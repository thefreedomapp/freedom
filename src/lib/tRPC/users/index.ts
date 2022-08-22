import * as trpc from "@trpc/server";
// import prisma from "$lib/prisma";
// import { z } from "zod";

export const router = trpc.router().query("loggedIn", {
	// input: z.string().regex(/^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/),
	resolve: () => {
		return true;
	}
});
