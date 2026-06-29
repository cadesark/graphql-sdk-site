import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// base is set to the repo name so the build works on GitHub Pages
// (https://cadesark.github.io/graphql-sdk-site/). Override with BASE_PATH=/ for local roots.
export default defineConfig({
    base: process.env.BASE_PATH ?? "/graphql-sdk-site/",
    plugins: [react(), tailwindcss()]
});
