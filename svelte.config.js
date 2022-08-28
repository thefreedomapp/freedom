// @ts-check

import adapter from "@sveltejs/adapter-netlify";
import { optimizeImports } from "carbon-preprocess-svelte";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), optimizeImports()],

	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		}
	}
};

export default config;
