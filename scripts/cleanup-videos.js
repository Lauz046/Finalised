const fs = require('fs');
const path = require('path');

// Script to clean up original video files after optimization
const herosectionDir = path.join(__dirname, '../public/herosection');
const optimizedDir = path.join(__dirname, '../public/herosection/optimized');

// Original video files to remove (after optimization is complete)
const originalVideos = [
  'StorySaver.to_AQMiiL2ymzY2G0kqVs2OLw37rR5PwqdeSPY4Op1sUmtSQSXL8NwtA7r00YqdE1AEMu0ELk9wQXa60avNhd4e5kt.webm',
  'StorySaver.to_AQNRVdeF2ejk-sqw5JUDMy_23uzXuD2m1jqUBnYxUodDN_38d8AFtBk-n4pjN13bvNcAiNFdx2EsLUHMFYoY3sx.webm',
  'StorySaver.to_AQObCzPuN2j23kjIwDyRbd4rgniYN7kM8ZAn_fO09Q_ZhVpRCGVQya6evieaDdlyqwx0hZOnX1q72VjoW2-PGhw.webm',
  'StorySaver.to_AQP8TheManZYkoMPUGyyyzhRfH5jlRZ8veRzG5zO9o3Jw4Pql8C71K27_MG7DFMr7x1MZ9NxIdYGo8Jd7wS4Hjc.webm',
  'StorySaver.to_AQOKbDbVhs6Jnnb0LVccp3FdKXqVba9a7ps5E53RcALtrDbCosTs8ub03_Gb0-IV7Ju9m0AIAoO-Zl0TCDu9w7i.webm'
];

console.log('🧹 Starting video cleanup...');

// Check if optimized videos exist
const optimizedVideos = [
  'hero-video-1.webm',
  'hero-video-2.webm',
  'hero-video-3.webm',
  'hero-video-4.webm',
  'hero-video-5.webm'
];

let allOptimizedExist = true;
let totalSizeSaved = 0;

// Check if all optimized videos exist
optimizedVideos.forEach(filename => {
  const optimizedPath = path.join(optimizedDir, filename);
  if (!fs.existsSync(optimizedPath)) {
    console.log(`⚠️ Optimized video not found: ${filename}`);
    allOptimizedExist = false;
  }
});

if (!allOptimizedExist) {
  console.log('❌ Cannot cleanup - not all optimized videos exist');
  console.log('💡 Run optimization first: npm run trim-videos');
  process.exit(1);
}

// Remove original videos
originalVideos.forEach(filename => {
  const originalPath = path.join(herosectionDir, filename);
  
  if (fs.existsSync(originalPath)) {
    try {
      const stats = fs.statSync(originalPath);
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      totalSizeSaved += stats.size;
      
      fs.unlinkSync(originalPath);
      console.log(`🗑️ Removed: ${filename} (${fileSizeInMB}MB)`);
    } catch (error) {
      console.error(`❌ Error removing ${filename}:`, error.message);
    }
  } else {
    console.log(`ℹ️ Already removed: ${filename}`);
  }
});

const totalSizeSavedMB = (totalSizeSaved / (1024 * 1024)).toFixed(2);
console.log(`\n🎉 Cleanup complete!`);
console.log(`💾 Space saved: ${totalSizeSavedMB}MB`);
console.log(`📁 Original videos removed from: public/herosection/`);
console.log(`✅ Optimized videos remain in: public/herosection/optimized/`); 