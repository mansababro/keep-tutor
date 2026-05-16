import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api': 'http://localhost:3001',
      },
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      // Production optimizations
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.log in production
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          // Code splitting for better caching
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'animation-vendor': ['framer-motion', 'gsap'],
            'icons-vendor': ['lucide-react']
          }
        }
      },
      // Chunk size warning limit
      chunkSizeWarningLimit: 1000,
      // Source maps for debugging (disable in production if needed)
      sourcemap: false
    },
    // Performance optimizations
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'gsap', 'lucide-react']
    }
  };
});
