import prisma from "$lib/prisma";
import { invalid } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { compare } from "@node-rs/bcrypt";
import { dev } from "$app/environment";

export const actions: Actions = {
	async login({ cookies, request }) {
		const data = await request.formData();
		const email_or_username = data.get("email_or_username") as string;
		const password = data.get("password") as string;

		const user = await prisma.user.findFirst({
			where: {
				email: email_or_username,
				OR: {
					username: email_or_username
				}
			}
		});

		if (!user || !(await compare(password, user.password))) {
			return invalid(401, { message: "Invalid credentials" });
		}

		cookies.set("token", user.token, {
			path: "/trpc",
			httpOnly: true,
			sameSite: "strict",
			secure: !dev
		});

		throw "";
	}
};
