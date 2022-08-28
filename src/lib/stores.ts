import { writable, type Writable } from "svelte/store";

/**
 * @description The error shown to the user.
 * @note To remove the error, set the error to null.
 */
export const error: Writable<string | null> = writable(null);
