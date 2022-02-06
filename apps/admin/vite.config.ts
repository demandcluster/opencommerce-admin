import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@platform": path.resolve(__dirname, "./src/platform"),
      "@plugins": path.resolve(__dirname, "./src/plugins"),
      "@types": path.resolve(__dirname, "./src/types"),
    }
  },
  plugins: [react()]
})
