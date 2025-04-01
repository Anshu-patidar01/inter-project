import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow connections from any IP
    port: 5173, // Ensure it's on the correct port
    strictPort: true, // Prevent port fallback
  },
});
