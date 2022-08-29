import trpc from "$lib/tRPC/client";

/**
 * @description Whether the user is logged in or not.
 */
export const LOGGED_IN = await trpc.query("users:loggedIn");
