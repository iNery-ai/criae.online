import { defineConfig } from 'vite';

function preloadHeroPlugin() {
  return {
    name: 'preload-hero-lcp',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) {
        return [
          {
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'image',
              href: '/assets/ui/hero-480.webp',
              imagesrcset: '/assets/ui/hero-480.webp 480w, /assets/ui/hero-800.webp 800w, /assets/ui/hero-1200.webp 1200w',
              imagesizes: '(max-width: 42rem) 92vw, (max-width: 64rem) 40vw, 416px',
              fetchpriority: 'high',
            },
            injectTo: 'head',
          },
        ];
      }

      let hero480 = '';
      let hero800 = '';
      let hero1200 = '';
      for (const [fileName] of Object.entries(ctx.bundle)) {
        if (fileName.includes('hero-480') && fileName.endsWith('.webp')) hero480 = './' + fileName;
        if (fileName.includes('hero-800') && fileName.endsWith('.webp')) hero800 = './' + fileName;
        if (fileName.includes('hero-1200') && fileName.endsWith('.webp')) hero1200 = './' + fileName;
      }

      if (hero480 && hero800 && hero1200) {
        return [
          {
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'image',
              href: hero480,
              imagesrcset: `${hero480} 480w, ${hero800} 800w, ${hero1200} 1200w`,
              imagesizes: '(max-width: 42rem) 92vw, (max-width: 64rem) 40vw, 416px',
              fetchpriority: 'high',
            },
            injectTo: 'head',
          },
        ];
      }
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [preloadHeroPlugin()],
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

