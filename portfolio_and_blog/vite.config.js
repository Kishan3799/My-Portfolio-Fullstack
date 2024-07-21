import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    // server: {
    //   proxy: {
    //     '/api/v1': {
    //       target: 'http://127.0.0.1:8000',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '/api')
    //     },
    //   },
    // },
    plugins: [react()],
  };
});