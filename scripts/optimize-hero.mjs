import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeHero() {
  const assetsDir = path.resolve(__dirname, '../assets/ui');
  const input = path.join(assetsDir, 'hero.webp');
  
  const metadata = await sharp(input).metadata();
  console.log(`Original: ${metadata.width}x${metadata.height}, ${metadata.format}, size: ${(fs.statSync(input).size / 1024).toFixed(2)} KB`);

  // Target mobile 480w
  const out480 = path.join(assetsDir, 'hero-480.webp');
  await sharp(input)
    .resize({ width: 480 })
    .webp({ quality: 80, effort: 6 })
    .toFile(out480);
  console.log(`hero-480.webp: ${(fs.statSync(out480).size / 1024).toFixed(2)} KB`);

  // Target tablet / mid-res 800w
  const out800 = path.join(assetsDir, 'hero-800.webp');
  await sharp(input)
    .resize({ width: 800 })
    .webp({ quality: 80, effort: 6 })
    .toFile(out800);
  console.log(`hero-800.webp: ${(fs.statSync(out800).size / 1024).toFixed(2)} KB`);

  // Optimized full-res (original was 867w at 235.7 KB)
  const out1200 = path.join(assetsDir, 'hero-1200.webp');
  await sharp(input)
    .resize({ width: 867 })
    .webp({ quality: 82, effort: 6 })
    .toFile(out1200);
  console.log(`hero-1200.webp: ${(fs.statSync(out1200).size / 1024).toFixed(2)} KB`);
}

optimizeHero().catch(err => {
  console.error(err);
  process.exit(1);
});
