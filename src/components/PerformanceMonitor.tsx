import React, { useEffect, useState } from 'react';
import { useProductContext } from '../context/ProductContext';

const PerformanceMonitor: React.FC = () => {
  const { loadTime, isPreloaded, loading } = useProductContext();
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    // Show monitor in development
    if (process.env.NODE_ENV === 'development') {
      setShowMonitor(true);
    }
  }, []);

  if (!showMonitor) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      background: '#22304a',
      color: '#fff',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      minWidth: '200px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        🚀 Performance Monitor
      </div>
      <div style={{ fontSize: '11px', opacity: 0.8 }}>
        <div>Status: {isPreloaded ? '✅ Pre-loaded' : loading ? '⏳ Loading...' : '❌ Not loaded'}</div>
        <div>Load Time: {loadTime > 0 ? `${loadTime.toFixed(2)}ms` : 'N/A'}</div>
        <div>Cache: {isPreloaded ? '✅ Active' : '❌ Inactive'}</div>
      </div>
      <button 
        onClick={() => setShowMonitor(false)}
        style={{
          position: 'absolute',
          top: 4,
          right: 4,
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default PerformanceMonitor; 