import { sveltekit } from "@sveltejs/kit/vite";
import handleServer from "./apollo-server";

/** @type {import("vite").UserConfig} */
const config = {
	plugins: [
		{
			name: "GraphQL",
			configurePreviewServer({ middlewares }) {
				handleServer(middlewares);
			},
			configureServer({ middlewares }) {
				handleServer(middlewares);
			}
		},

		sveltekit()
	]
};

export default config;
