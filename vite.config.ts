import handleServer from "./apollo-server";
import type { UserConfig } from "vite";

// @ts-ignore
import { sveltekit } from "@sveltejs/kit/vite";

const config: UserConfig = {
	plugins: [
		{
			name: "GraphQL",
			configurePreviewServer({ middlewares, httpServer }) {
				handleServer(middlewares, httpServer);
			},
			configureServer({ middlewares, httpServer }) {
				handleServer(middlewares, httpServer!);
			}
		},

		sveltekit()
	]
};

export default config;
