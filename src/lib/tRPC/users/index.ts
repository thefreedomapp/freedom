import * as trpc from "@trpc/server";
import type { CreateContextFn } from "../server";
import { z } from "zod";
import { compare, hash } from "@node-rs/bcrypt";
import prisma from "$lib/prisma";

export const router = trpc
	.router<CreateContextFn>()
	.query("loggedIn", {
		resolve: ({ ctx }) => ctx.user !== null
	})
	.query("signUp", {
		input: z.object({ email: z.string(), username: z.string(), password: z.string() }),
		resolve: async ({ input }) => {
			const token = await hash(`${input.email}╬${input.password}`);
			const u = await prisma.user.create({
				data: {
					...input,
					password: await hash(input.password),
					token
				}
			});
			console.log(u);
			return token;
		}
	})
	.query("logIn", {
		input: z.object({ email_username: z.string(), password: z.string() }),
		resolve: async ({ input }) => {
			const user = await prisma.user.findFirst({
				where: {
					email: input.email_username,
					OR: {
						username: input.email_username
					}
				}
			});

			if (!(await compare(user?.password || "", input.password))) return null;

			return user!.token;
		}
	});
