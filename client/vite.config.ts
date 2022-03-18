import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import postcss from "./postcss.config.cjs";
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), tsconfigPaths()],
  css: {
    postcss: postcss,
  },
  build: {
    outDir: 'build'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      }
    }
  }
});
