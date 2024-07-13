import { defineConfig ,loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` (development, production, etc.)
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      proxy: {
        '/api': env.VITE_BASE_URL,
      },
    },
    plugins: [react()],
  };
});
