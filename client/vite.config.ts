import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['**/*.scss'],
  },
  resolve: {
    alias: [
      { find: '@application', replacement: fileURLToPath(new URL('./src/application', import.meta.url)) },
      { find: '@data', replacement: fileURLToPath(new URL('./src/data', import.meta.url)) },
      { find: '@domain', replacement: fileURLToPath(new URL('./src/domain', import.meta.url)) },
      { find: '@errors', replacement: fileURLToPath(new URL('./src/errors', import.meta.url)) },
      { find: '@features', replacement: fileURLToPath(new URL('./src/features', import.meta.url)) },
      { find: '@utils', replacement: fileURLToPath(new URL('./src/utils', import.meta.url)) },
      { find: '@ui', replacement: fileURLToPath(new URL('./src/ui', import.meta.url)) },
    ],
  },
});