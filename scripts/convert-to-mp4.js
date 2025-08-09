#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎬 Converting WebM videos to MP4 for iOS compatibility...\n');

const inputDir = path.join(__dirname, '../public/herosection');
const outputDir = path.join(__dirname, '../public/herosection/optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all WebM files
const webmFiles = fs.readdirSync(inputDir).filter(file => file.endsWith('.webm'));

if (webmFiles.length === 0) {
  console.log('❌ No WebM files found in', inputDir);
  process.exit(1);
}

console.log(`📁 Found ${webmFiles.length} WebM files to convert:\n`);

// Check if FFmpeg is available
let ffmpegAvailable = false;
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
  ffmpegAvailable = true;
  console.log('✅ FFmpeg found - will convert videos to MP4');
} catch (error) {
  console.log('❌ FFmpeg not found - cannot convert videos');
  console.log('💡 Please install FFmpeg:');
  console.log('   macOS: brew install ffmpeg');
  console.log('   Windows: Download from https://ffmpeg.org/download.html');
  console.log('   Linux: sudo apt install ffmpeg');
  process.exit(1);
}

// Convert each WebM file to MP4
webmFiles.forEach((filename, index) => {
  const inputPath = path.join(inputDir, filename);
  const outputFilename = `hero-video-${index + 1}.mp4`;
  const outputPath = path.join(outputDir, outputFilename);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Input file not found: ${filename}`);
    return;
  }

  try {
    console.log(`🔄 Converting: ${filename} → ${outputFilename}`);
    
    // FFmpeg command to convert WebM to MP4 with iOS optimization
    const ffmpegCommand = `ffmpeg -i "${inputPath}" -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 64k -movflags +faststart -y "${outputPath}"`;
    
    execSync(ffmpegCommand, { stdio: 'inherit' });
    
    // Get file size info
    const stats = fs.statSync(outputPath);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`✅ Converted: ${outputFilename} (${fileSizeInMB}MB)\n`);
    
  } catch (error) {
    console.error(`❌ Error converting ${filename}:`, error.message);
  }
});

console.log('🎉 MP4 conversion complete!');
console.log('📁 MP4 files saved in:', outputDir);
console.log('\n📱 iOS devices will now use MP4 format for better compatibility.'); 