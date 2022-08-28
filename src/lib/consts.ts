import { browser } from "$app/environment";
import trpc from "$lib/tRPC/client";

/**
 * @description Whether the user is logged in or not.
 * @note This is only null on the server.
 */
export const LOGGED_IN = browser ? await trpc!.query("users:loggedIn") : null;
