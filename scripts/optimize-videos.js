const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/herosection';
const outputDir = 'public/herosection/optimized';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const videoFiles = [
  'StorySaver.to_AQMiiL2ymzY2G0kqVs2OLw37rR5PwqdeSPY4Op1sUmtSQSXL8NwtA7r00YqdE1AEMu0ELk9wQXa60avNhd4e5kt.webm',
  'StorySaver.to_AQNRVdeF2ejk-sqw5JUDMy_23uzXuD2m1jqUBnYxUodDN_38d8AFtBk-n4pjN13bvNcAiNFdx2EsLUHMFYoY3sx.webm',
  'StorySaver.to_AQObCzPuN2j23kjIwDyRbd4rgniYN7kM8ZAn_fO09Q_ZhVpRCGVQya6evieaDdlyqwx0hZOnX1q72VjoW2-PGhw.webm',
  'StorySaver.to_AQP8TheManZYkoMPUGyyyzhRfH5jlRZ8veRzG5zO9o3Jw4Pql8C71K27_MG7DFMr7x1MZ9NxIdYGo8Jd7wS4Hjc.webm',
  'StorySaver.to_AQOKbDbVhs6Jnnb0LVccp3FdKXqVba9a7ps5E53RcALtrDbCosTs8ub03_Gb0-IV7Ju9m0AIAoO-Zl0TCDu9w7i.webm'
];

const optimizedNames = [
  'hero-1-optimized.webm',
  'hero-2-optimized.webm', 
  'hero-3-optimized.webm',
  'hero-4-optimized.webm',
  'hero-5-optimized.webm'
];

console.log('🚀 Starting video optimization...');

videoFiles.forEach((file, index) => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, optimizedNames[index]);
  
  // FFmpeg command to:
  // - Cut video to 10 seconds (from 0 to 10)
  // - Optimize for web delivery
  // - Maintain quality while reducing file size
  const ffmpegCommand = `ffmpeg -i "${inputPath}" -t 10 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 64k -movflags +faststart "${outputPath}"`;
  
  console.log(`Processing ${file}...`);
  
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error processing ${file}:`, error);
      return;
    }
    
    // Get file size
    const stats = fs.statSync(outputPath);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`✅ ${optimizedNames[index]} optimized (${fileSizeInMB}MB)`);
    
    // Check if this is the last file
    if (index === videoFiles.length - 1) {
      console.log('\n🎉 All videos optimized successfully!');
      console.log('📁 Optimized videos saved in:', outputDir);
    }
  });
}); 