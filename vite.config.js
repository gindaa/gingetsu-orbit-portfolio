import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        project: resolve(__dirname, 'project.html'),
        privacy_annajm: resolve(__dirname, 'privacy-annajm.html'),
        annajm_request: resolve(__dirname, 'annajm-request.html')
      }
    }
  }
});
