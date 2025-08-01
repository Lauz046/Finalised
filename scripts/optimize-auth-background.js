const sharp = require('sharp');
const path = require('path');

async function optimizeAuthBackground() {
  try {
    const inputPath = path.join(__dirname, '../public/hornloader/HOP_Coming soon_desktop-2.png');
    const outputPath = path.join(__dirname, '../public/auth-background-optimized.webp');
    
    await sharp(inputPath)
      .resize(1200, 800, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: 60,
        effort: 6
      })
      .toFile(outputPath);
    
    console.log('Auth background optimized successfully!');
  } catch (error) {
    console.error('Error optimizing auth background:', error);
  }
}

optimizeAuthBackground(); 