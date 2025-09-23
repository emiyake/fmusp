import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@atomic': path.resolve(__dirname, 'src/atomic'),
      '@atomic-samples': path.resolve(__dirname, 'src/atomic-samples'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@/components': path.resolve(__dirname, 'src/app/modules/builder/basic-form-builder/components'),
    },
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: 'globalThis',
  },
  plugins: [react(), tailwindcss()],
  build: {
    emptyOutDir: true,
    outDir: 'dist/public',
    commonjsOptions: {
      include: ['tailwind.config.ts', 'node_modules/**'],
    },
  },
});
