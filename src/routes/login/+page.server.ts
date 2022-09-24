import prisma from "$lib/prisma"
import { invalid, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { compare } from "@node-rs/bcrypt"
import { dev } from "$app/environment"

export const actions: Actions = {
	async default({ cookies, request }) {
		const data = await request.formData()
		const email_or_username = data.get("email_or_username") as string
		const password = data.get("password") as string

		console.log(email_or_username)

		const user = await prisma.user.findFirst({
			where: {
				OR: [{ email: email_or_username }, { username: email_or_username }]
			}
		})

		if (!user || !(await compare(password, user.password))) {
			console.log("u", user)
			return invalid(401, { message: "Invalid credentials" })
		}

		cookies.set("token", user.token, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: !dev
		})

		throw redirect(302, "/")
	}
}
