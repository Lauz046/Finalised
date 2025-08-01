const fs = require('fs');
const path = require('path');

// Script to help trim your new 1-minute video to 10 seconds
const herosectionDir = path.join(__dirname, '../public/herosection');
const optimizedDir = path.join(__dirname, '../public/herosection/optimized');

console.log('🎬 Video Trimming Helper\n');

// Check for new videos
const allVideos = fs.readdirSync(herosectionDir).filter(file => file.endsWith('.webm'));
const newVideos = allVideos.filter(video => !video.includes('StorySaver.to_'));

console.log('📁 Current Videos:');
allVideos.forEach(filename => {
  const filePath = path.join(herosectionDir, filename);
  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`  ${filename}: ${sizeInMB}MB`);
});

if (newVideos.length > 0) {
  console.log(`\n🆕 New Videos Found: ${newVideos.length}`);
  newVideos.forEach(video => {
    console.log(`  - ${video}`);
  });
  
  console.log('\n✂️ To trim your 1-minute video to 10 seconds:');
  console.log('\nOption 1: Online Tools (Recommended)');
  console.log('1. Go to: https://www.onlinevideoconverter.com/');
  console.log('2. Upload your video');
  console.log('3. Set duration to 10 seconds');
  console.log('4. Download as WebM format');
  console.log('5. Save as: hero-video-6.webm');
  
  console.log('\nOption 2: Manual Method');
  console.log('1. Use any video editor (Windows Movie Maker, iMovie, etc.)');
  console.log('2. Trim to 10 seconds');
  console.log('3. Export as WebM');
  console.log('4. Save to: public/herosection/optimized/hero-video-6.webm');
  
  console.log('\nOption 3: Install FFmpeg');
  console.log('1. Download FFmpeg: https://ffmpeg.org/download.html');
  console.log('2. Run: ffmpeg -i "your-video.webm" -t 10 -c:v libvpx-vp9 -crf 30 output.webm');
  
} else {
  console.log('\nℹ️ No new videos detected');
  console.log('💡 Add your 1-minute video to: public/herosection/');
  console.log('💡 Then run this script again');
}

console.log('\n📊 Current Optimization Status:');
const optimizedVideos = fs.readdirSync(optimizedDir).filter(file => file.endsWith('.webm'));
console.log(`  Optimized videos: ${optimizedVideos.length}/5`);

if (optimizedVideos.length === 5) {
  console.log('✅ All 5 videos are optimized');
} else {
  console.log(`⚠️ Need ${5 - optimizedVideos.length} more optimized videos`);
}

console.log('\n🎯 Target File Sizes for 10-second videos:');
console.log('  - hero-video-1.webm: ~1.5MB');
console.log('  - hero-video-2.webm: ~1.0MB');
console.log('  - hero-video-3.webm: ~1.2MB');
console.log('  - hero-video-4.webm: ~1.1MB');
console.log('  - hero-video-5.webm: ~0.5MB');
console.log('  - hero-video-6.webm: ~1.0MB (your new video)');

console.log('\n🚀 After trimming:');
console.log('1. Run: npm run test-performance');
console.log('2. Run: npm run dev');
console.log('3. Check browser console for performance metrics'); 