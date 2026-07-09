import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname, "client"), 
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },

  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-dom") || id.includes(`${path.sep}react${path.sep}`) || id.includes("scheduler")) {
            return "react-vendor";
          }

          if (id.includes("framer-motion")) {
            return "motion-vendor";
          }

          if (id.includes("lucide-react")) {
            return "icons-vendor";
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("cmdk") ||
            id.includes("class-variance-authority") ||
            id.includes("clsx") ||
            id.includes("tailwind-merge")
          ) {
            return "ui-vendor";
          }

          if (id.includes("wouter")) {
            return "router-vendor";
          }
        },
      },
    },
  },
});
