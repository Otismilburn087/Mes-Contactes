import fs from 'fs';

const photoData = fs.readFileSync('contact-photo-data.js', 'utf8');
let scriptContent = fs.readFileSync('script.js', 'utf8');

if (!scriptContent.startsWith('window.TODISOA_CONTACT_PHOTO_B64')) {
  scriptContent = photoData + '\n' + scriptContent;
  fs.writeFileSync('script.js', scriptContent);
  console.log('Prepended photo data directly to script.js');
} else {
  console.log('Already at top of script.js');
}
