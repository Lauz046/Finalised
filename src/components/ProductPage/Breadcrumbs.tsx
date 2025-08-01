import React from 'react';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; className?: string }> = ({ items, className }) => (
  <div className={styles.breadcrumbsBar + (className ? ' ' + className : '')}>
    {items.map((item, idx) => (
      <span key={idx} className={styles.breadcrumbItem}>
        {item.href ? <a href={item.href}>{item.label}</a> : item.label}
        {idx < items.length - 1 && (
          <span className={styles.breadcrumbSep}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.arrowIcon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        )}
      </span>
    ))}
  </div>
); 