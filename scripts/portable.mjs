import { readFile, writeFile } from 'node:fs/promises';

const output = new URL('../.portable-build/', import.meta.url);
let html = await readFile(new URL('index.html', output), 'utf8');
const scriptTag = html.match(/<script type="module"[^>]+src="([^"]+)"><\/script>/);
const styleTag = html.match(/<link rel="stylesheet"[^>]+href="(\.\/assets\/[^"]+)">/);
if (!scriptTag || !styleTag) throw new Error('O build não gerou o JavaScript e o CSS esperados.');

const [script, style] = await Promise.all([
  readFile(new URL(scriptTag[1], output), 'utf8'),
  readFile(new URL(styleTag[1], output), 'utf8'),
]);
// The same React build also opens directly from disk, without a server.
html = html.replace(scriptTag[0], () => `<script type="module">\n${script.replaceAll('</script', '<\\/script')}\n</script>`);
html = html.replace(styleTag[0], () => `<style>\n${style}\n</style>`);
await writeFile(new URL('../Natal Mágico_ 40 atividades de Natal para imprimir _ Criaê.html', import.meta.url), html);
