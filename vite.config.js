import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: './',
  build: {
    modulePreload: mode === 'portable' ? false : { polyfill: true },
    cssMinify: true,
    chunkSizeWarningLimit: 1200,
    ...(mode === 'portable' && {
      outDir: '.portable-build',
      assetsInlineLimit: Infinity,
    }),
  },
}));
