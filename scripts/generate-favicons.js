const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceIcon = path.join(__dirname, '../public/DON/horn svg.png');
const outputDir = path.join(__dirname, '../public');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateFavicon(size, filename) {
  try {
    await sharp(sourceIcon)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 5, g: 31, b: 45, alpha: 1 } // #051f2d background
      })
      .png()
      .toFile(path.join(outputDir, filename));
    
    console.log(`✅ Generated: ${filename} (${size}x${size})`);
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error);
  }
}

async function generateAllFavicons() {
  console.log('🚀 Generating favicon files...');
  
  // Generate different favicon sizes
  await generateFavicon(16, 'favicon-16x16.png');
  await generateFavicon(32, 'favicon-32x32.png');
  await generateFavicon(48, 'favicon-48x48.png');
  await generateFavicon(192, 'android-chrome-192x192.png');
  await generateFavicon(512, 'android-chrome-512x512.png');
  await generateFavicon(180, 'apple-touch-icon.png');
  
  // Generate ICO file (16x16, 32x32, 48x48)
  try {
    const icon16 = await sharp(sourceIcon)
      .resize(16, 16, { fit: 'contain', background: { r: 5, g: 31, b: 45, alpha: 1 } })
      .png()
      .toBuffer();
    
    const icon32 = await sharp(sourceIcon)
      .resize(32, 32, { fit: 'contain', background: { r: 5, g: 31, b: 45, alpha: 1 } })
      .png()
      .toBuffer();
    
    const icon48 = await sharp(sourceIcon)
      .resize(48, 48, { fit: 'contain', background: { r: 5, g: 31, b: 45, alpha: 1 } })
      .png()
      .toBuffer();
    
    // Create simple ICO file (PNG format)
    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), icon32);
    console.log('✅ Generated: favicon.ico');
  } catch (error) {
    console.error('❌ Error generating ICO:', error);
  }
  
  console.log('🎉 All favicon files generated successfully!');
}

generateAllFavicons().catch(console.error); 