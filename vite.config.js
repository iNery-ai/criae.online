import { defineConfig } from 'vite';

function optimizeBuildPlugin(mode) {
  return {
    name: 'optimize-build',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      const tags = [];

      // 1. Injeta Preload da imagem LCP Hero
      if (!ctx.bundle) {
        tags.push({
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
        });
        return tags;
      }

      let hero480 = '';
      let hero800 = '';
      let hero1200 = '';
      let cssSource = '';

      for (const [fileName, file] of Object.entries(ctx.bundle)) {
        if (fileName.includes('hero-480') && fileName.endsWith('.webp')) hero480 = './' + fileName;
        if (fileName.includes('hero-800') && fileName.endsWith('.webp')) hero800 = './' + fileName;
        if (fileName.includes('hero-1200') && fileName.endsWith('.webp')) hero1200 = './' + fileName;
        if (fileName.endsWith('.css') && file.type === 'asset') {
          cssSource = typeof file.source === 'string' ? file.source : file.source.toString('utf8');
        }
      }

      if (hero480 && hero800 && hero1200) {
        tags.push({
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
        });
      }

      // No modo produção padrão, faz inline do CSS crítico da página eliminando a requisição bloqueante de 170ms
      if (mode !== 'portable' && cssSource) {
        tags.push({
          tag: 'style',
          children: cssSource,
          injectTo: 'head',
        });
        return {
          html: html.replace(/<link rel="stylesheet"[^>]+href="[^"]+\.css"[^>]*>/g, ''),
          tags,
        };
      }

      return tags;
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [optimizeBuildPlugin(mode)],
  build: {
    target: 'es2022',
    modulePreload: { polyfill: false },
    cssMinify: true,
    chunkSizeWarningLimit: 1200,
    ...(mode === 'portable' && {
      outDir: '.portable-build',
      assetsInlineLimit: Infinity,
    }),
  },
}));


