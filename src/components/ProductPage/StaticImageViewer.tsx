import React from 'react';
import styles from './Image360Viewer.module.css';

interface StaticImageViewerProps {
  images: string[];
  lastImageRef?: React.Ref<HTMLImageElement>;
}

export const StaticImageViewer: React.FC<StaticImageViewerProps> = ({ images, lastImageRef }) => {
  // Show up to 4 images, all static
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
}; 