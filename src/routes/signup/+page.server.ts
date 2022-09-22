import prisma from "$lib/prisma";
import { invalid } from "@sveltejs/kit";
import type { Actions } from "../../../.svelte-kit/types/src/routes/signup/$types";
import { compare } from "@node-rs/bcrypt";
import { dev } from "$app/environment";

export const actions: Actions = {
	async signup({ cookies, request }) {
		const data = await request.formData();
		const email = data.get("email") as string;
		const username = data.get("username") as string;
		const password = data.get("password") as string;

		cookies.set("token", user.token, {
			path: "/trpc",
			httpOnly: true,
			sameSite: "strict",
			secure: !dev
		});

		throw "";
	}
};
