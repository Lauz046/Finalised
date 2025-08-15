const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public');

// Create a placeholder image for the small carousel
async function createSmallCarouselPlaceholder() {
  console.log('🎨 Creating small carousel placeholder image...');
  
  try {
    // Create a smaller placeholder for the carousel section
    const svgContent = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#051f2d;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a2f3d;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        
        <!-- Subtle pattern overlay -->
        <defs>
          <pattern id="pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="0.5" fill="#ffffff" opacity="0.03"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern)"/>
        
        <!-- Main text -->
        <text x="50%" y="45%" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" font-weight="bold" opacity="0.8">
          360° VIEW
        </text>
        
        <!-- Subtitle -->
        <text x="50%" y="60%" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14" opacity="0.6">
          Interactive Product Experience
        </text>
        
        <!-- Decorative elements -->
        <circle cx="80" cy="80" r="1" fill="#ffffff" opacity="0.2"/>
        <circle cx="320" cy="220" r="0.8" fill="#ffffff" opacity="0.15"/>
        <circle cx="120" cy="200" r="0.6" fill="#ffffff" opacity="0.25"/>
        <circle cx="280" cy="100" r="0.8" fill="#ffffff" opacity="0.2"/>
        
        <!-- Play button indicator -->
        <circle cx="50%" cy="75%" r="20" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
        <polygon points="45%,70% 45%,80% 55%,75%" fill="#ffffff" opacity="0.7"/>
        
        <!-- Loading text -->
        <text x="50%" y="90%" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="10" opacity="0.5">
          Loading interactive view...
        </text>
      </svg>
    `;
    
    // Convert SVG to PNG
    await sharp(Buffer.from(svgContent))
      .png()
      .resize(400, 300, {
        fit: 'fill',
        background: { r: 5, g: 31, b: 45, alpha: 1 }
      })
      .toFile(path.join(outputDir, 'small-carousel-placeholder.png'));
    
    console.log('✅ Small carousel placeholder created: small-carousel-placeholder.png');
    
  } catch (error) {
    console.error('❌ Error creating small carousel placeholder:', error);
  }
}

createSmallCarouselPlaceholder().catch(console.error); 