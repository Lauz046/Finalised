const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Video trimming script using alternative methods
const inputDir = path.join(__dirname, '../public/herosection');
const outputDir = path.join(__dirname, '../public/herosection/optimized');
const tempDir = path.join(__dirname, '../temp_videos');

// Ensure directories exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Video files to process
const videoFiles = [
  'StorySaver.to_AQMiiL2ymzY2G0kqVs2OLw37rR5PwqdeSPY4Op1sUmtSQSXL8NwtA7r00YqdE1AEMu0ELk9wQXa60avNhd4e5kt.webm',
  'StorySaver.to_AQNRVdeF2ejk-sqw5JUDMy_23uzXuD2m1jqUBnYxUodDN_38d8AFtBk-n4pjN13bvNcAiNFdx2EsLUHMFYoY3sx.webm',
  'StorySaver.to_AQObCzPuN2j23kjIwDyRbd4rgniYN7kM8ZAn_fO09Q_ZhVpRCGVQya6evieaDdlyqwx0hZOnX1q72VjoW2-PGhw.webm',
  'StorySaver.to_AQP8TheManZYkoMPUGyyyzhRfH5jlRZ8veRzG5zO9o3Jw4Pql8C71K27_MG7DFMr7x1MZ9NxIdYGo8Jd7wS4Hjc.webm',
  'StorySaver.to_AQOKbDbVhs6Jnnb0LVccp3FdKXqVba9a7ps5E53RcALtrDbCosTs8ub03_Gb0-IV7Ju9m0AIAoO-Zl0TCDu9w7i.webm'
];

console.log('🚀 Starting video trimming to 10 seconds...');

// Check if FFmpeg is available
let ffmpegAvailable = false;
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
  ffmpegAvailable = true;
  console.log('✅ FFmpeg found - will trim videos to 10 seconds');
} catch (error) {
  console.log('⚠️ FFmpeg not found - will copy videos as-is');
  console.log('💡 Install FFmpeg for true video trimming');
}

videoFiles.forEach((filename, index) => {
  const inputPath = path.join(inputDir, filename);
  const outputFilename = `hero-video-${index + 1}.webm`;
  const outputPath = path.join(outputDir, outputFilename);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Input file not found: ${filename}`);
    return;
  }

  try {
    console.log(`📹 Processing: ${filename}`);
    
    if (ffmpegAvailable) {
      // Use FFmpeg to trim to 10 seconds
      const ffmpegCommand = `ffmpeg -i "${inputPath}" -t 10 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 64k -movflags +faststart -y "${outputPath}"`;
      execSync(ffmpegCommand, { stdio: 'inherit' });
      console.log(`✅ Trimmed: ${outputFilename}`);
    } else {
      // Copy original file (no trimming possible without FFmpeg)
      fs.copyFileSync(inputPath, outputPath);
      console.log(`📋 Copied: ${outputFilename} (no trimming - FFmpeg required)`);
    }
    
    // Get file size info
    const stats = fs.statSync(outputPath);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📊 Size: ${fileSizeInMB}MB`);
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
});

// Clean up temp directory
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log('🎉 Video processing complete!');
console.log('📁 Optimized videos saved to: public/herosection/optimized/');

if (!ffmpegAvailable) {
  console.log('\n🔧 To enable video trimming:');
  console.log('1. Install FFmpeg: https://ffmpeg.org/download.html');
  console.log('2. Run: npm run trim-videos');
} 