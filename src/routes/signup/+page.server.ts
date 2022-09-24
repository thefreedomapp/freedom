import prisma from "$lib/prisma"
import { invalid, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { hash } from "@node-rs/bcrypt"
import { dev } from "$app/environment"

export const actions: Actions = {
	async default({ cookies, request }) {
		const data = await request.formData()
		const email = data.get("email") as string
		const username = data.get("username") as string
		let password = data.get("password") as string

		if (!email || !username || !password) {
			return invalid(400, { message: "Invalid credentials" })
		}

		password = await hash(password)

		const token = await hash(`${email}╬${password}`)
		await prisma.user.create({
			data: {
				email,
				username,
				password,
				token
			}
		})

		console.log({
			email,
			username,
			password,
			token
		})

		cookies.set("token", token, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: !dev
		})

		throw redirect(302, "/")
	}
}
