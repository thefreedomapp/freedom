import type { UserConfig } from "vite";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { sveltekit } from "@sveltejs/kit/vite";

const config: UserConfig = {
	server: {
		port: 3000,
		strictPort: true
	},
	plugins: [sveltekit()]
};

export default config;
