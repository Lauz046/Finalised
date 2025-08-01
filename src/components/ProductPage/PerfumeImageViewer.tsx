import React from 'react';
import styles from './Image360Viewer.module.css';

interface PerfumeImageViewerProps {
  images: string[];
  lastImageRef?: React.Ref<HTMLImageElement>;
}

export const PerfumeImageViewer: React.FC<PerfumeImageViewerProps> = ({ images, lastImageRef }) => {
  // Implement specific logic for perfume images
  let displayImages: string[] = [];
  
  if (images.length === 2) {
    // If there are 2 images, show both
    displayImages = images;
  } else if (images.length === 3) {
    // If there are 3 images, show first 2
    displayImages = images.slice(0, 2);
  } else if (images.length >= 4) {
    // If there are 4 or more images, show first and third
    displayImages = [images[0], images[2]];
  } else {
    // For any other case (0 or 1 image), show what's available
    displayImages = images;
  }

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
}; 