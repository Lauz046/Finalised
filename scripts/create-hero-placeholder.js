const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public');

// Create a simple placeholder image with House of Plutus branding
async function createHeroPlaceholder() {
  console.log('🎨 Creating hero section placeholder image...');
  
  try {
    // Create a dark background with House of Plutus branding
    const svgContent = `
      <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#051f2d;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a2f3d;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        
        <!-- Subtle pattern overlay -->
        <defs>
          <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="1" fill="#ffffff" opacity="0.05"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern)"/>
        
        <!-- Main text -->
        <text x="50%" y="45%" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="72" font-weight="bold" opacity="0.9">
          HOUSE OF PLUTUS
        </text>
        
        <!-- Subtitle -->
        <text x="50%" y="55%" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" opacity="0.7">
          India's Trusted Luxury Platform
        </text>
        
        <!-- Decorative elements -->
        <circle cx="200" cy="200" r="2" fill="#ffffff" opacity="0.3"/>
        <circle cx="1720" cy="880" r="1.5" fill="#ffffff" opacity="0.2"/>
        <circle cx="300" cy="800" r="1" fill="#ffffff" opacity="0.4"/>
        <circle cx="1600" cy="300" r="1.5" fill="#ffffff" opacity="0.3"/>
        
        <!-- Play button indicator -->
        <circle cx="50%" cy="70%" r="40" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.6"/>
        <polygon points="45%,65% 45%,75% 55%,70%" fill="#ffffff" opacity="0.8"/>
        
        <!-- Loading text -->
        <text x="50%" y="85%" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="16" opacity="0.6">
          Loading premium experience...
        </text>
      </svg>
    `;
    
    // Convert SVG to PNG
    await sharp(Buffer.from(svgContent))
      .png()
      .resize(1920, 1080, {
        fit: 'fill',
        background: { r: 5, g: 31, b: 45, alpha: 1 }
      })
      .toFile(path.join(outputDir, 'hero-placeholder.png'));
    
    console.log('✅ Hero placeholder image created: hero-placeholder.png');
    
    // Also create a smaller version for mobile
    await sharp(Buffer.from(svgContent))
      .png()
      .resize(768, 1024, {
        fit: 'fill',
        background: { r: 5, g: 31, b: 45, alpha: 1 }
      })
      .toFile(path.join(outputDir, 'hero-placeholder-mobile.png'));
    
    console.log('✅ Mobile hero placeholder created: hero-placeholder-mobile.png');
    
  } catch (error) {
    console.error('❌ Error creating placeholder:', error);
  }
}

createHeroPlaceholder().catch(console.error); 