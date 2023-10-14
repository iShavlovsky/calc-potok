import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import eslint from "vite-plugin-eslint";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  publicDir: "public",
  root: "./",
  build: {
    outDir: "dist",
  },
  plugins: [
    eslint({
      cache: false,
      fix: true,
    }),
    ViteImageOptimizer({
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 90,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 90,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 90,
      },
      tiff: {
        // https://sharp.pixelplumbing.com/api-output#tiff
        quality: 90,
      },
      // gif does not support lossless compression
      // https://sharp.pixelplumbing.com/api-output#gif
      gif: {},
      webp: {
        // https://sharp.pixelplumbing.com/api-output#webp
        lossless: true,
      },
      avif: {
        // https://sharp.pixelplumbing.com/api-output#avif
        lossless: true,
      },
      cache: false,
      /* pass your config */
    }),
  ],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./*", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
