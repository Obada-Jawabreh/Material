import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths(), react()],
  server: {
    allowedHosts: ["1f15-176-28-160-197.ngrok-free.app"], // Add the allowed host here
  },
});
