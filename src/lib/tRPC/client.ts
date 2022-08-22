import { browser } from "$app/env";
import type { Router } from "./server";
import * as trpc from "@trpc/client";

const url = browser ? "/trpc" : "http://localhost:3000/trpc";
export default trpc.createTRPCClient<Router>({
	url
});
