import React from 'react';
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
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.header}>FAQ</div>
      </div>
      {faqData.map((item, idx) => (
        <div key={idx} className={styles.item}>
          <div className={styles.summary}>
            <span>{item.question}</span>
          </div>
          <p className={styles.answer}>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}; 