import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { paraglide } from "@inlang/paraglide-sveltekit/vite";

export default defineConfig({
  plugins: [
    paraglide({ project: "./project.inlang", outdir: "./src/lib/paraglide" }),
    sveltekit(),
    SvelteKitPWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      registerType: "prompt",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "honkipass5",
        short_name: "本気でパスワード v5",
        description: "honkipass5",
        theme_color: "#63A002",
        background_color: "#63A002",
        lang: "ja",
      },

      injectManifest: {
        globPatterns: [
          "client/**/*.{js,css,ico,png,svg,webp,webmanifest}",
          "prerendered/**/*.html",
        ],
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },

      kit: {
        includeVersionFiles: true,
      },
    }),
  ],
});
