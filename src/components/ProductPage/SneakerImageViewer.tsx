import React, { useState } from 'react';
import styles from './Image360Viewer.module.css';

interface SneakerImageViewerProps {
  images: string[];
  lastImageRef?: React.Ref<HTMLImageElement>;
}

export const SneakerImageViewer: React.FC<SneakerImageViewerProps> = ({ images, lastImageRef }) => {
  const totalImages = images.length;
  const [currentFrame, setCurrentFrame] = useState(0);

  // Case 1: Only 1 image - show static image
  if (totalImages === 1) {
    return (
      <div className={styles.verticalStack}>
        <div className={styles.viewer360Wrap}>
          <img
            src={images[0]}
            alt="Product image"
            className={styles.viewer360Img}
            ref={lastImageRef}
          />
        </div>
      </div>
    );
  }

  // Case 2: 2-5 images - show up to 4 static images
  if (totalImages >= 2 && totalImages <= 5) {
    const displayImages = images.slice(0, 4);
    return (
      <div className={styles.verticalStack}>
        {displayImages.map((img, idx) => (
          <div key={idx} className={styles.viewer360Wrap}>
            <img
              src={img}
              alt={`Product image ${idx + 1}`}
              className={styles.viewer360Img}
              ref={idx === displayImages.length - 1 && lastImageRef ? lastImageRef : undefined}
            />
          </div>
        ))}
      </div>
    );
  }

  // Case 3: 6+ images - show 4 frames: one 360 viewer + 3 static frames
  if (totalImages >= 6) {
    // Calculate static frame positions (12, 20, 30 or similar distribution)
    const frame1 = Math.floor(totalImages * 0.33); // ~33% of total
    const frame2 = Math.floor(totalImages * 0.66); // ~66% of total  
    const frame3 = totalImages - 1; // Last frame

    return (
      <div className={styles.verticalStack}>
        {/* First frame - 360 viewer with slider */}
        <div className={styles.viewer360Wrap}>
          <img
            src={images[currentFrame % totalImages]}
            alt={`360 view frame ${currentFrame + 1}`}
            className={styles.viewer360Img}
          />
          <input
            type="range"
            min={0}
            max={totalImages - 1}
            value={currentFrame}
            onChange={e => setCurrentFrame(Number(e.target.value))}
            className={styles.slider}
          />
        </div>

        {/* Second frame - static at ~33% position */}
        <div className={styles.viewer360Wrap}>
          <img
            src={images[frame1]}
            alt={`Product image at frame ${frame1 + 1}`}
            className={styles.viewer360Img}
          />
        </div>

        {/* Third frame - static at ~66% position */}
        <div className={styles.viewer360Wrap}>
          <img
            src={images[frame2]}
            alt={`Product image at frame ${frame2 + 1}`}
            className={styles.viewer360Img}
          />
        </div>

        {/* Fourth frame - static at last position */}
        <div className={styles.viewer360Wrap}>
          <img
            src={images[frame3]}
            alt={`Product image at frame ${frame3 + 1}`}
            className={styles.viewer360Img}
            ref={lastImageRef}
          />
        </div>
      </div>
    );
  }

  // Fallback for any other case
  return (
    <div className={styles.verticalStack}>
      <div className={styles.viewer360Wrap}>
        <img
          src={images[0]}
          alt="Product image"
          className={styles.viewer360Img}
          ref={lastImageRef}
        />
      </div>
    </div>
  );
}; 