import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

const FRONTEND_DIR = "frontend";

// https://astro.build/config
export default defineConfig({
    root: FRONTEND_DIR,
    srcDir: `${FRONTEND_DIR}/src`,
    publicDir: `${FRONTEND_DIR}/public`,
    integrations: [react(), tailwind({ config: { applyBaseStyles: true } })]
});
