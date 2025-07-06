import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // allows Replit to access it
    port: 5173,
    allowedHosts: [
      "210e3dcf-eb61-45ad-af99-8df3e0e22246-00-1ncdci0ymzz3.sisko.replit.dev",
    ],
  },
});
