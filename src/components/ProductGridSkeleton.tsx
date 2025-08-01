import React from 'react';

const skeletonCardStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)',
  
  minHeight: 320,
  width: '100%',
  margin: '24px 0 24px 0',
  animation: 'skeleton-loading 1.2ss infinite linear',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const shimmerStyle: React.CSSProperties = {
  width: 120,
  height: 120,
  borderRadius: 8,
  background: '#e0e0e0',
  marginBottom: 16,
};

const textStyle: React.CSSProperties = {
  width: '70%',
  height: 18,
  background: '#e0e0e0',

  margin: '8px 0',
};

const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 10 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={skeletonCardStyle}>
        <div style={shimmerStyle} />
        <div style={textStyle} />
        <div style={{ ...textStyle, width: '40%' }} />
      </div>
    ))}
    <style>{`
      @keyframes skeleton-loading {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
    `}</style>
  </div>
);

export default ProductGridSkeleton;
