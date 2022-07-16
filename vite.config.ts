import type { UserConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

const config: UserConfig = {
	server: {
		port: 3000,
		strictPort: true
	},
	plugins: [sveltekit()]
};

export default config;
