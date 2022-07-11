import type { UserConfig } from "vite";

// @ts-ignore
import { sveltekit } from "@sveltejs/kit/vite";

const config: UserConfig = {
	plugins: [

		sveltekit()
	]
};

export default config;
