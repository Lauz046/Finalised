const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const hypezoneDir = path.join(__dirname, '../public/hypezonepost');
const optimizedDir = path.join(__dirname, '../public/hypezonepost-optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath, options = {}) {
  const {
    width = 600,
    height = 600,
    quality = 95,
    format = 'webp'
  } = options;

  try {
    await sharp(inputPath)
      .resize(width, height, { 
        fit: 'inside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3 // Better quality resizing
      })
      .webp({ 
        quality,
        effort: 6, // Higher compression effort for better quality
        nearLossless: true // Better quality preservation
      })
      .toFile(outputPath);
    
    console.log(`✅ Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error);
  }
}

async function optimizeHypezoneImages() {
  console.log('🚀 Starting HypeZone image optimization with enhanced quality...');
  
  const posts = fs.readdirSync(hypezoneDir).filter(dir => 
    fs.statSync(path.join(hypezoneDir, dir)).isDirectory() && dir.startsWith('Post')
  );

  for (const postDir of posts) {
    const postPath = path.join(hypezoneDir, postDir);
    const optimizedPostPath = path.join(optimizedDir, postDir);
    
    // Create optimized post directory
    if (!fs.existsSync(optimizedPostPath)) {
      fs.mkdirSync(optimizedPostPath, { recursive: true });
    }

    const images = fs.readdirSync(postPath).filter(file => 
      file.match(/\.(jpg|jpeg|png)$/i)
    );

    console.log(`📁 Processing ${postDir} (${images.length} images)`);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const inputPath = path.join(postPath, image);
      const outputPath = path.join(optimizedPostPath, `${i + 1}.webp`);
      
      await optimizeImage(inputPath, outputPath);
    }
  }

  console.log('🎉 HypeZone image optimization complete!');
}

// Also optimize the hover perfume image with better quality
async function optimizeHoverPerfume() {
  const inputPath = path.join(__dirname, '../public/hoverperfume.png');
  const outputPath = path.join(__dirname, '../public/hoverperfume-optimized.webp');
  
  if (fs.existsSync(inputPath)) {
    console.log('🔄 Optimizing hover perfume image with enhanced quality...');
    await optimizeImage(inputPath, outputPath, { width: 1000, height: 800, quality: 95 });
  }
}

async function main() {
  await optimizeHypezoneImages();
  await optimizeHoverPerfume();
  console.log('✨ All optimizations complete with enhanced quality!');
}

main().catch(console.error); 