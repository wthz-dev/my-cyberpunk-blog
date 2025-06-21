import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: true, port: process.env.VITE_WEB_PORT || 3000 },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#37359e",
          "secondary-color": "#565b71",
          "link-color": "#354599",
          "border-radius-base": "8px",
          "table-row-hover-bg": "#9ba7b3",
          "font-size-base": "14px",
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
