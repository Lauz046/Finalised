import React, { useState } from 'react';
import styles from './Image360Viewer.module.css';

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

interface ViewerConfig {
  offset: number;
  min: number;
  max: number;
  wrap?: boolean;
}

const viewerConfigs: ViewerConfig[] = [
  { offset: 0, min: 0, max: 35 },
  { offset: 14, min: 14, max: 35 },
  { offset: 20, min: 20, max: 35 },
];

export const Image360Viewer: React.FC<{ images: string[]; lastImageRef?: React.Ref<HTMLImageElement> }> = ({ images, lastImageRef }) => {
  const isMobile = useIsMobile();
  const totalFrames = images.length;
  // Each viewer has its own frame state, starting at its offset
  const [frames, setFrames] = useState([0, 14, 20]);

  const handleSlider = (idx: number, value: number) => {
    setFrames(f => f.map((frame, i) => (i === idx ? value : frame)));
  };

  // On desktop, show only 3 viewers
  const desktopConfigs = viewerConfigs.slice(0, 3);

  return (
    <div className={styles.verticalStack}>
      {(isMobile ? viewerConfigs : desktopConfigs).map((cfg, idx) => {
        const frame = frames[idx];
        return (
          <div key={idx} className={styles.viewer360Wrap}>
            {/* Removed label text */}
            <img
              src={images[frame % totalFrames]}
              alt={`360 view frame ${frame + 1}`}
              className={styles.viewer360Img}
              ref={idx === (isMobile ? viewerConfigs.length - 1 : desktopConfigs.length - 1) && lastImageRef ? lastImageRef : undefined}
            />
            <input
              type="range"
              min={cfg.min}
              max={cfg.max}
              value={frames[idx]}
              onChange={e => handleSlider(idx, Number(e.target.value))}
              className={styles.slider}
            />
          </div>
        );
      })}
    </div>
  );
}; 