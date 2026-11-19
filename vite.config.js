import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: './',
  build: {
    modulePreload: false,
    ...(mode === 'portable' && {
      outDir: '.portable-build',
      assetsInlineLimit: Infinity,
      chunkSizeWarningLimit: 1200,
    }),
  },
}));
