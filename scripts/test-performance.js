const fs = require('fs');
const path = require('path');

// Performance testing script for hero section
const herosectionDir = path.join(__dirname, '../public/herosection');
const optimizedDir = path.join(__dirname, '../public/herosection/optimized');

console.log('🔍 Testing Hero Section Performance...\n');

// Check original videos
console.log('📁 Original Videos:');
const originalVideos = fs.readdirSync(herosectionDir).filter(file => file.endsWith('.webm'));
let originalTotalSize = 0;

originalVideos.forEach(filename => {
  const filePath = path.join(herosectionDir, filename);
  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  originalTotalSize += stats.size;
  console.log(`  ${filename}: ${sizeInMB}MB`);
});

console.log(`  Total: ${(originalTotalSize / (1024 * 1024)).toFixed(2)}MB\n`);

// Check optimized videos
console.log('📁 Optimized Videos:');
const optimizedVideos = fs.readdirSync(optimizedDir).filter(file => file.endsWith('.webm'));
let optimizedTotalSize = 0;

optimizedVideos.forEach(filename => {
  const filePath = path.join(optimizedDir, filename);
  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  optimizedTotalSize += stats.size;
  console.log(`  ${filename}: ${sizeInMB}MB`);
});

console.log(`  Total: ${(optimizedTotalSize / (1024 * 1024)).toFixed(2)}MB\n`);

// Calculate optimization metrics
const sizeReduction = ((originalTotalSize - optimizedTotalSize) / originalTotalSize * 100).toFixed(1);
const sizeReductionMB = ((originalTotalSize - optimizedTotalSize) / (1024 * 1024)).toFixed(2);

console.log('📊 Performance Analysis:');
console.log(`  Original Size: ${(originalTotalSize / (1024 * 1024)).toFixed(2)}MB`);
console.log(`  Optimized Size: ${(optimizedTotalSize / (1024 * 1024)).toFixed(2)}MB`);
console.log(`  Size Reduction: ${sizeReduction}% (${sizeReductionMB}MB saved)`);

// Check if optimization is effective
if (optimizedTotalSize < originalTotalSize) {
  console.log('✅ Optimization is working!');
} else {
  console.log('⚠️ No size reduction detected');
}

// Check video count
console.log(`\n📹 Video Count:`);
console.log(`  Original: ${originalVideos.length} videos`);
console.log(`  Optimized: ${optimizedVideos.length} videos`);

if (optimizedVideos.length >= 5) {
  console.log('✅ All 5 videos are available');
} else {
  console.log(`⚠️ Missing ${5 - optimizedVideos.length} videos`);
}

// Check for 10-second videos (approximate)
console.log('\n⏱️ Video Duration Check:');
console.log('💡 To verify 10-second duration, check file sizes:');
console.log('   - 10-second videos should be ~1-2MB each');
console.log('   - 1-minute videos would be ~6-8MB each');

// Recommendations
console.log('\n🎯 Recommendations:');
if (optimizedTotalSize < originalTotalSize * 0.8) {
  console.log('✅ Good optimization - size reduced significantly');
} else {
  console.log('⚠️ Consider further optimization');
}

if (optimizedVideos.length === 5) {
  console.log('✅ All videos are ready');
} else {
  console.log('⚠️ Complete the video set');
}

console.log('\n🚀 Next Steps:');
console.log('1. Test the website: npm run dev');
console.log('2. Check browser console for performance metrics');
console.log('3. Monitor load times and memory usage'); 