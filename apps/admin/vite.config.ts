import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import createImportPlugin from "vite-plugin-import";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 3000
  },
  plugins: [
    createImportPlugin(
      [
        {
          libraryName: '@mui/material',
          libraryDirectory: '',
          camel2DashComponentName: false,
        }
      ]
    ),
    createImportPlugin([
      {
        libraryName: '@mui/icons-material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      }
    ]),
    react()
  ]
})
