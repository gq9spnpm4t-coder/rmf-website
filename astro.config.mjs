import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ridenourmediafirm.com',
  vite: {
    plugins: [tailwindcss()],
    server: {
      // During dev, /api/* is answered by `wrangler pages dev` (port 8788),
      // which runs the same Pages Functions Cloudflare runs in production.
      proxy: {
        '/api': 'http://localhost:8788',
      },
    },
  },
});
