import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "EasyHub",
        short_name: "EasyHub",
        description: "Making it Easy to find everything in one place",
        start_url: "/EasyHub/",
        scope: "/EasyHub/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
          { src: "icons/icon-1024.png", sizes: "1024x1024", type: "image/png", purpose: "any maskable" }
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: mode === "development",
      },
    }),

  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));