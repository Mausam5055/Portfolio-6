const fs = require('fs');
const path = require('path');

const targetDir = path.join('e:/nesilnoble.com/public/work/media/the-local-project');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = [
  'dune.jpg',
  'brick.jpg',
  'drawing.jpg',
  'curves.jpg',
  'brutal.jpg',
  'interior.jpg',
  'lattice.jpg'
];

async function downloadAll() {
  for (const file of files) {
    const url = `https://nesilnoble.com/work/media/the-local-project/${file}`;
    const dest = path.join(targetDir, file);
    console.log(`Downloading ${url} -> ${dest}`);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed to fetch ${url}: ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${file} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${file}:`, err.message);
    }
  }
  console.log('Done!');
}

downloadAll();
