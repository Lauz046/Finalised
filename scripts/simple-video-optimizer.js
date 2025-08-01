const fs = require('fs');
const path = require('path');

// Simple video optimization script (no FFmpeg required)
const inputDir = path.join(__dirname, '../public/herosection');
const outputDir = path.join(__dirname, '../public/herosection/optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Video files to process
const videoFiles = [
  'StorySaver.to_AQMiiL2ymzY2G0kqVs2OLw37rR5PwqdeSPY4Op1sUmtSQSXL8NwtA7r00YqdE1AEMu0ELk9wQXa60avNhd4e5kt.webm',
  'StorySaver.to_AQNRVdeF2ejk-sqw5JUDMy_23uzXuD2m1jqUBnYxUodDN_38d8AFtBk-n4pjN13bvNcAiNFdx2EsLUHMFYoY3sx.webm',
  'StorySaver.to_AQObCzPuN2j23kjIwDyRbd4rgniYN7kM8ZAn_fO09Q_ZhVpRCGVQya6evieaDdlyqwx0hZOnX1q72VjoW2-PGhw.webm',
  'StorySaver.to_AQP8TheManZYkoMPUGyyyzhRfH5jlRZ8veRzG5zO9o3Jw4Pql8C71K27_MG7DFMr7x1MZ9NxIdYGo8Jd7wS4Hjc.webm',
  'StorySaver.to_AQOKbDbVhs6Jnnb0LVccp3FdKXqVba9a7ps5E53RcALtrDbCosTs8ub03_Gb0-IV7Ju9m0AIAoO-Zl0TCDu9w7i.webm'
];

console.log('🚀 Starting simple video optimization...');
console.log('📝 Note: This copies original videos. For true optimization, install FFmpeg.');

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
    
    // Copy the original file (no actual optimization without FFmpeg)
    fs.copyFileSync(inputPath, outputPath);
    
    // Get file size info
    const stats = fs.statSync(outputPath);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`✅ Copied: ${outputFilename} (${fileSizeInMB}MB)`);
    console.log(`💡 To optimize: Install FFmpeg and run the full optimization script`);
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
});

console.log('🎉 Simple video processing complete!');
console.log('📁 Videos copied to: public/herosection/optimized/');
console.log('🔧 For true optimization, install FFmpeg and run: npm run optimize-videos'); 