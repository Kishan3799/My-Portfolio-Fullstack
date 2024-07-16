import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': 'https://my-portfolio-fullstack-backend.onrender.com'
    }
  },
  plugins: [react()]
})