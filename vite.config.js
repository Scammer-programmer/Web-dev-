import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// В проекте три отдельные страницы, поэтому указываем их все как точки входа.
export default defineConfig({
  root: '.',
  server: {
    port: 6589,
  },
  preview: {
    port: 6589,
  },
  build: {
    rollupOptions: {
      input: {
        catalog: resolve(process.cwd(), 'index.html'),
        event: resolve(process.cwd(), 'event.html'),
        register: resolve(process.cwd(), 'register.html'),
      },
    },
  },
});
