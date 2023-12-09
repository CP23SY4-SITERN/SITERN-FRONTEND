import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
const env = dotenv.config({
  path: process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, '..', './.env.production')
    : path.resolve(__dirname, '..', './.env.development'),
}).parsed;


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    // Pass environment variables to the client
    'process.env': env,
  },
  server: {
    port: 3000,
  }
});
