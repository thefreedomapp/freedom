import * as trpc from "@trpc/server";

export const router = trpc.router().query("loggedIn", {
	resolve: () => {
		return true;
	}
});
