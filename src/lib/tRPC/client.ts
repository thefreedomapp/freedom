import type { Router } from "./server";
import * as trpc from "@trpc/client";
import { browser } from "$app/environment";

const client = browser
	? trpc.createTRPCClient<Router>({
			url: "/trpc"
	  })
	: null;

export default client;
