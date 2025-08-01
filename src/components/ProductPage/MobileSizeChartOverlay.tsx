import React from 'react';
import styles from './MobileSizeChartOverlay.module.css';

const sizeChartRows = [
  { usm: '3', usw: '5', uk: '3', eu: '35.5' },
  { usm: '4', usw: '5.5', uk: '3.5', eu: '36' },
  { usm: '4.5', usw: '6', uk: '4', eu: '36.5' },
  { usm: '5', usw: '6.5', uk: '3', eu: '37.5' },
  { usm: '5.5', usw: '7', uk: '4.5', eu: '38' },
  { usm: '6', usw: '7.5', uk: '5', eu: '38.5' },
  { usm: '6.5', usw: '8', uk: '5.5', eu: '39' },
  { usm: '7', usw: '8.5', uk: '6', eu: '40' },
  { usm: '7.5', usw: '9', uk: '6.5', eu: '40.5' },
  { usm: '8', usw: '9.5', uk: '7', eu: '41' },
  { usm: '8.5', usw: '10', uk: '7.5', eu: '42' },
  { usm: '9', usw: '10.5', uk: '8', eu: '42.5' },
  { usm: '9.5', usw: '11', uk: '8.5', eu: '43' },
  { usm: '10', usw: '11.5', uk: '9', eu: '44' },
  { usm: '10.5', usw: '12', uk: '9.5', eu: '44.5' },
  { usm: '11', usw: '12.5', uk: '10', eu: '45' },
  { usm: '11.5', usw: '13', uk: '10.5', eu: '45.5' },
  { usm: '12', usw: '13.5', uk: '11', eu: '46' },
  { usm: '12.5', usw: '14', uk: '11.5', eu: '46.5' },
  { usm: '13', usw: '14.5', uk: '12', eu: '47' },
];

interface MobileSizeChartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSizeChartOverlay: React.FC<MobileSizeChartOverlayProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.closeIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.closeIcon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className={styles.title}>Size Chart</h3>
        </div>

        <div className={styles.sizeChartContent}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>US(M)</th>
                  <th>US(W)</th>
                  <th>UK</th>
                  <th>EU</th>
                </tr>
              </thead>
              <tbody>
                {sizeChartRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.usm}</td>
                    <td>{row.usw}</td>
                    <td>{row.uk}</td>
                    <td>{row.eu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}; 