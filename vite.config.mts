import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import { splitVendorChunkPlugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@atomic': path.resolve(__dirname, 'src/atomic'),
      '@atomic-samples': path.resolve(__dirname, 'src/atomic-samples'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  plugins: [react(), splitVendorChunkPlugin(), tailwindcss()],
  build: {
    emptyOutDir: true,
    outDir: 'dist/public',
    commonjsOptions: {
      include: ['tailwind.config.ts', 'node_modules/**'],
    },
  },
});
