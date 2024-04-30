import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/xAlessandroo/",
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
  },
  // server: {
  //   hmr: {
  //     port: 443,
  //   },
  // },
});
