import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Security: Disable X-Powered-By header to prevent server identification
app.disable('x-powered-by');

// Security Middleware: Set robust HTTP Security Headers
app.use((req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Cross-Site Scripting (XSS) Protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Restrict sensitive browser features
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), payment=()');

  // Content Security Policy (allowing CDNs for fonts, icons, qrcode, confetti and openstreetmap embeds)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com; " +
    "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com data:; " +
    "img-src 'self' data: blob: https:; " +
    "frame-src 'self' https://www.openstreetmap.org https://maps.google.com; " +
    "connect-src 'self';"
  );

  next();
});

// Serve static assets with no-cache for instant live updates
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(express.static(__dirname, {
  dotfiles: 'ignore',
  etag: false,
  maxAge: 0
}));

// Fallback to index.html with safe path resolution
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running securely on http://0.0.0.0:${PORT}`);
});
