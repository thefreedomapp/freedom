import { dev } from "$app/environment";
import { error, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
	async default({ request, cookies }) {
		const token = (await request.formData().then((f) => f.get("token"))) as string;

		console.log(token);
		if (!token) {
			throw error(400, "No token provided");
		}

		cookies.set("token", token, {
			httpOnly: true,
			path: "/trpc",
			sameSite: "Strict",
			secure: !dev
		});

		throw redirect(303, "/");
	}
};
