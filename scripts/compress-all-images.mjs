import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, '../assets/ui');

const targets = [
  { name: 'atividade-01.webp', maxW: 640, q: 76 },
  { name: 'atividade-02.webp', maxW: 640, q: 76 },
  { name: 'atividade-03.webp', maxW: 640, q: 76 },
  { name: 'atividade-04.webp', maxW: 640, q: 76 },
  { name: 'atividade-05.webp', maxW: 640, q: 76 },
  { name: 'atividade-06.webp', maxW: 640, q: 76 },
  { name: 'bonus.webp', maxW: 600, q: 78 },
  { name: 'bonus-cartinha.webp', maxW: 460, q: 78 },
  { name: 'bonus-etiquetas.webp', maxW: 460, q: 78 },
  { name: 'globo.webp', maxW: 640, q: 78 },
  { name: 'memoria.webp', maxW: 640, q: 78 },
];

async function run() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const t of targets) {
    const file = path.join(dir, t.name);
    const inputBuf = fs.readFileSync(file);
    const before = inputBuf.length;
    totalBefore += before;

    const m = await sharp(inputBuf).metadata();
    let pipeline = sharp(inputBuf);
    if (m.width > t.maxW) {
      pipeline = pipeline.resize({ width: t.maxW });
    }
    const buf = await pipeline.webp({ quality: t.q, effort: 6 }).toBuffer();
    fs.writeFileSync(file, buf);
    const after = buf.length;
    totalAfter += after;

    console.log(`${t.name.padEnd(22)}: ${(before / 1024).toFixed(1)} KB -> ${(after / 1024).toFixed(1)} KB (Economizado: ${((before - after) / 1024).toFixed(1)} KB)`);
  }

  console.log(`\nTOTAL: ${(totalBefore / 1024).toFixed(1)} KB -> ${(totalAfter / 1024).toFixed(1)} KB | ECONOMIZADO: ${((totalBefore - totalAfter) / 1024).toFixed(1)} KB`);
}

run();
