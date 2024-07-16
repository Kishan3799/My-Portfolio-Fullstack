import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      proxy: {
        '/api': JSON.stringify(env.VITE_BASE_URL)
      },
    },
    plugins: [react()],
    base: '/'
  };
});