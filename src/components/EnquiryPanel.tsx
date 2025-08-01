import React, { useEffect } from 'react';
import { useEnquiryPanel } from './EnquiryPanelContext';
import styles from './EnquiryPanel.module.css';
import LiveChat from './LiveChat';

const EnquiryPanel: React.FC = () => {
  const { isOpen, product, chatActive, closePanel, startChat } = useEnquiryPanel();
  
  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen || !product) return null;
  
  return (
    <>
      <div className={styles.overlay} onClick={closePanel} />
      <aside className={styles.panel}>
        <button className={styles.closeBtn} onClick={closePanel} aria-label="Close">×</button>
        <div className={styles.productInfo}>
          <img src={product.image} alt={product.name} className={styles.productImg} />
          <div className={styles.brand}>{product.brand}</div>
          <div className={styles.name}>{product.name}</div>
        </div>
        <hr className={styles.divider} />
        {!chatActive ? (
          <div className={styles.options}>
            <div className={styles.optionBox}>
              <div className={styles.optionTitle}>LIVE CHAT</div>
              <div className={styles.optionSub}>Speak directly to send your enquiry.</div>
              <button className={styles.optionBtn} onClick={startChat}>START CHAT</button>
            </div>
            <div className={styles.optionBox}>
              <div className={styles.optionTitle}>CONTACT OUR TEAM</div>
              <div className={styles.optionSub}>Speak to our representative for the product enquiry.</div>
              <button className={styles.optionBtn} style={{ background: '#fff', color: '#051f2d', border: '1.5px solid #051f2d' }}>1-800-555-0000</button>
            </div>
            <div className={styles.optionBox}>
              <div className={styles.optionTitle}>FIND A STORE</div>
              <div className={styles.optionSub}>List of the nearest store.</div>
              <button className={styles.optionBtn} disabled>AVAILABLE SOON</button>
            </div>
          </div>
        ) : (
          <LiveChat />
        )}
      </aside>
    </>
  );
};

export default EnquiryPanel; 