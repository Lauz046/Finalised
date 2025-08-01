import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgressiveLoaderProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  onLoad?: () => void;
}

const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({
  children,
  delay = 0,
  className = '',
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      onLoad?.();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onLoad]);

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          className={className}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Preloader for critical content
export const CriticalPreloader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProgressiveLoader delay={100}>
      {children}
    </ProgressiveLoader>
  );
};

// Secondary content loader
export const SecondaryLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProgressiveLoader delay={300}>
      {children}
    </ProgressiveLoader>
  );
};

// Tertiary content loader
export const TertiaryLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProgressiveLoader delay={500}>
      {children}
    </ProgressiveLoader>
  );
};

// Background content loader
export const BackgroundLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProgressiveLoader delay={800}>
      {children}
    </ProgressiveLoader>
  );
};

export default ProgressiveLoader; 