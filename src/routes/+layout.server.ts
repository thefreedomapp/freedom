import { createContext } from "$lib/tRPC/server"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ cookies }) => {
	const { user } = await createContext({ cookies })

	return {
		logged_in: user !== null,
		account: user
	}
}
