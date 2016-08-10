import fs from 'fs';

export default function copyFile (src, dest) {
  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(src);
    rs.on('error', reject);
    const ws = fs.createWriteStream(dest);
    ws.on('error', reject);
    ws.on('finish', resolve);
    rs.pipe(ws);
  });
}
