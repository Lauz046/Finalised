const sharp = require('sharp');
const path = require('path');

async function optimizeImage() {
  try {
    const inputPath = path.join(__dirname, '../public/hornloader/HOP_Coming soon_desktop-2.png');
    const outputPath = path.join(__dirname, '../public/auth-background-optimized.webp');
    
    await sharp(inputPath)
      .resize(1920, 1080, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: 80,
        effort: 6
      })
      .toFile(outputPath);
    
    console.log('Background image optimized successfully!');
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

optimizeImage(); 