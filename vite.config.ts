import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import type { IncomingMessage, ServerResponse } from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function localVisibilityApi() {
  return {
    name: "local-visibility-api",
    apply: "serve" as const,
    configureServer(server: import("vite").ViteDevServer) {
      server.middlewares.use("/api/visibility", async (req: IncomingMessage, res: ServerResponse) => {
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          const rawBody = Buffer.concat(chunks).toString("utf8");
          const body = rawBody ? JSON.parse(rawBody) : {};
          const modulePath = `/@fs/${path.resolve(__dirname, "api/visibility.ts").replaceAll("\\", "/")}`;
          const { default: handler } = await server.ssrLoadModule(modulePath);
          const response = {
            setHeader: (name: string, value: string) => res.setHeader(name, value),
            status(code: number) {
              res.statusCode = code;
              return this;
            },
            json(payload: unknown) {
              res.setHeader("Content-Type", "application/json; charset=utf-8");
              res.end(JSON.stringify(payload));
              return this;
            },
          };
          await handler({ method: req.method, headers: req.headers, body, socket: req.socket }, response);
        } catch (error) {
          console.error("[local-visibility-api]", error);
          if (!res.headersSent) res.statusCode = 500;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ error: "local_api_error" }));
        }
      });
    },
  };
}

export default defineConfig({
  root: path.resolve(__dirname, "client"), 
  plugins: [react(), localVisibilityApi()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },

  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});

