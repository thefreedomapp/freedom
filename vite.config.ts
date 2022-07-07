import { sveltekit } from "@sveltejs/kit/vite";
import { Server } from "http";
import type { UserConfig } from "vite";

function handle_server(server: Server) {}

const config: UserConfig = {
	plugins: [
		sveltekit(),

		{
			name: "test",
			configurePreviewServer({ httpServer }) {
				handle_server(httpServer);
			},
			configureServer({ httpServer }) {
				handle_server(httpServer!);
			}
		}
	]
};

export default config;
