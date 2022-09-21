import { createContext } from "$lib/tRPC/server";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
	return { logged_in: await createContext({ cookies }).then((ctx) => ctx.user !== null) };
};
