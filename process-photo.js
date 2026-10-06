import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function main() {
  // Use the original photo file
  const input = 'IMG20260605163955~2.jpg';
  const output = 'contact-photo-vcard.jpg';
  
  if (!fs.existsSync(input)) {
    console.error(`❌ Error: File "${input}" not found!`);
    process.exit(1);
  }
  
  try {
    // Extract metadata from original image
    const meta = await sharp(input).metadata();
    console.log('✅ Original image dimensions:', meta.width, 'x', meta.height);
    console.log('✅ Image format:', meta.format);
    
    // Create optimized version for vCard (320x320, 80% quality)
    const buf = await sharp(input)
      .extract({
        left: Math.round(meta.width * 0.2),
        top: Math.round(meta.height * 0.1),
        width: Math.round(meta.width * 0.6),
        height: Math.round(meta.width * 0.6)
      })
      .resize(320, 320, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 80, progressive: true })
      .toBuffer();

    fs.writeFileSync(output, buf);
    
    console.log('✅ vCard optimized image created:', output);
    
    // Read and encode to base64
    console.log('✅ vCard optimized size:', buf.length, 'bytes');
    
    const b64 = buf.toString('base64');
    console.log('✅ Base64 generated, length:', b64.length, 'characters');
    
    // Create folded version (for vCard RFC compliance - max 72 chars per line)
    const folded = b64.match(/.{1,72}/g).join('\r\n ');
    
    // Generate contact-photo-data.js with proper variable export
    const jsContent = `// Auto-generated from: ${input}
// Generated at: ${new Date().toISOString()}
// Original filename: IMG20260605163955~2.jpg

window.TODISOA_CONTACT_PHOTO_B64 = ${JSON.stringify(b64)};
window.TODISOA_CONTACT_PHOTO_FOLDED = ${JSON.stringify(folded)};
window.TODISOA_CONTACT_PHOTO_FILENAME = 'IMG20260605163955~2.jpg';
window.TODISOA_CONTACT_PHOTO_GENERATED = new Date('${new Date().toISOString()}').getTime();

console.log('[Photo Data] Loaded contact photo - Original: IMG20260605163955~2.jpg');
`;
    
    fs.writeFileSync('contact-photo-data.js', jsContent);
    console.log('✅ contact-photo-data.js generated successfully');
    console.log('✅ Photo filename preserved:', 'IMG20260605163955~2.jpg');
    
    // Also create a metadata file for reference
    const metadataContent = {
      originalFilename: 'IMG20260605163955~2.jpg',
      originalDimensions: { width: meta.width, height: meta.height },
      originalFormat: meta.format,
      optimizedFilename: output,
      optimizedSize: buf.length,
      base64Length: b64.length,
      generatedAt: new Date().toISOString(),
      vCardCompliant: true
    };
    
    fs.writeFileSync('photo-metadata.json', JSON.stringify(metadataContent, null, 2));
    console.log('✅ photo-metadata.json created for reference');
    console.log('\n✨ All done! Your contact photo is ready.');
    
  } catch (error) {
    console.error('❌ Error processing photo:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
