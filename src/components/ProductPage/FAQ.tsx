import React, { useState } from 'react';
import styles from './FAQ.module.css';

const faqData = [
  {
    question: 'Are your products brand new and authentic?',
    answer: 'Yes — 100%. We only list brand-new, verified luxury products sourced directly from trusted vendors and outlets.',
  },
  {
    question: 'Can I trust the authenticity of the products?',
    answer: 'Absolutely. Each item is manually verified to ensure it meets our standards for luxury and legitimacy.',
  },
  {
    question: 'How do I get in touch if I have a question?',
    answer: 'You can reach out us anytime at support@houseofplutus.com - we personally handle every message so you\'re never left waiting for help.',
  },
];

export const FAQ: React.FC = () => {
  const [openSection, setOpenSection] = useState(true);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleSection = () => setOpenSection((prev) => !prev);
  const toggle = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.headerRow}
        onClick={toggleSection}
        aria-expanded={openSection}
        type="button"
      >
        <div className={styles.header}>FAQ</div>
        <span className={openSection ? styles.arrowOpen : styles.arrowClosed}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.arrowSvg}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      {openSection && faqData.map((item, idx) => {
        const open = openIndexes.includes(idx);
        return (
          <div key={idx} className={styles.item}>
            <div
              className={styles.summary}
              onClick={() => toggle(idx)}
              tabIndex={0}
              role="button"
              aria-expanded={open}
            >
              <span>{item.question}</span>
              <span className={open ? `${styles.arrow} ${styles.open}` : `${styles.arrow} ${styles.closed}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.arrow}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </div>
            {open && <p className={styles.answer}>{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}; 