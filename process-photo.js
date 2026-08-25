import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const input = 'contact-photo.jpg';
  const output = 'contact-photo-vcard.jpg';
  
  // Extract info
  const meta = await sharp(input).metadata();
  console.log('Original dimensions:', meta.width, 'x', meta.height);
  
  // Crop focusing on upper body & smiling face
  await sharp(input)
    .extract({
      left: Math.round(meta.width * 0.2),
      top: Math.round(meta.height * 0.1),
      width: Math.round(meta.width * 0.6),
      height: Math.round(meta.width * 0.6)
    })
    .resize(320, 320)
    .jpeg({ quality: 80 })
    .toFile(output);
    
  const buf = fs.readFileSync(output);
  console.log('vCard optimized size:', buf.length, 'bytes');
  const b64 = buf.toString('base64');
  
  const folded = b64.match(/.{1,72}/g).join('\r\n ');
  
  const jsContent = 'window.TODISOA_CONTACT_PHOTO_B64 = ' + JSON.stringify(b64) + ';\n' +
                    'window.TODISOA_CONTACT_PHOTO_FOLDED = ' + JSON.stringify(folded) + ';\n';
  fs.writeFileSync('contact-photo-data.js', jsContent);
  console.log('contact-photo-data.js generated successfully.');
}

main().catch(console.error);
