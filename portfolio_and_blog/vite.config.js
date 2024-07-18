import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      proxy: {
        '/api/v1': {
          target: 'https://my-portfolio-fullstack-backend.onrender.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        },
      },
    },
    plugins: [react()],
  };
});