import React, { useState } from 'react';
import HornLoader from '../components/loading/HornLoader';

const HornDemo = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [duration, setDuration] = useState(2000);

  const handleShowLoader = () => {
    setShowLoader(true);
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  if (showLoader) {
    return (
      <HornLoader 
        onComplete={handleLoaderComplete}
        duration={duration}
      />
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#051F2D',
      padding: '2rem'
    }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: '300' }}>
        Horn Loader Demo
      </h1>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        alignItems: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
          <label style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            Duration: {duration}ms
          </label>
          <input 
            type="range" 
            min="1000" 
            max="5000" 
            step="500"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <button 
          onClick={handleShowLoader}
          style={{
            padding: '1rem 2rem',
            background: '#051F2D',
            border: 'none',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            marginTop: '1rem',
            transition: 'all 0.3s ease'
          }}
        >
          Show Horn Loader
        </button>
      </div>

      <div style={{ 
        marginTop: '3rem', 
        textAlign: 'center', 
        opacity: 0.7,
        maxWidth: '600px'
      }}>
        <p style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
          This premium horn loader features ultra-smooth frame-by-frame animation, 
          followed by an elegant brand reveal. After the horn builds, your blue 
          PLUTUS logo appears with the tagline "Luxury Defines Here" in Times New Roman. 
          The animation includes premium effects like logo glow and animated underlines.
        </p>
      </div>
    </div>
  );
};

export default HornDemo; 