import type { Router } from "./server";
import { type TRPCClient, createTRPCClient, TRPCClientError } from "@trpc/client";
import { browser } from "$app/environment";
import { error } from "$lib/stores";

export type Client = TRPCClient<Router>;

const client: Client = browser
	? new Proxy(
			createTRPCClient<Router>({
				url: "/trpc"
			}),
			{
				get: (target, name: keyof Client): Client[typeof name] =>
					name === "query"
						? (((...args) =>
								target.query(...args).catch((e) => {
									if (e instanceof TRPCClientError) {
										error.set(e.message);
										return e;
									} else {
										// let the error bubble up
										throw e;
									}
								})) as Client["query"])
						: target[name]
			}
	  )
	: // no-op
	  (new Proxy(
			{},
			{
				get: () => () => null
			}
	  ) as Client);

export default client;
