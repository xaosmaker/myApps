import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from "rollup-plugin-visualizer"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(),
  visualizer({
    filename: './dist/stats.html',
    template: 'treemap', // 'sunburst', 'treemap', or 'network'
    open: true,          // auto-open after build
    gzipSize: true,
    brotliSize: true,
  })],
  server: {
    allowedHosts: ["myapps"],
    host: "0.0.0.0"

  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
