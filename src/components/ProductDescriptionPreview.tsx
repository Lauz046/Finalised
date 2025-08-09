import React from 'react';
import { useProductDescription, truncateDescription } from '../utils/productDescriptionUtils';

interface ProductDescriptionPreviewProps {
  productLink: string;
  productName?: string;
  brand?: string;
  maxLength?: number;
  className?: string;
}

export const ProductDescriptionPreview: React.FC<ProductDescriptionPreviewProps> = ({
  productLink,
  productName,
  brand,
  maxLength = 80,
  className = ''
}) => {
  const { description, loading } = useProductDescription(productLink, productName, brand);

  if (loading) {
    return (
      <div className={`description-preview-skeleton ${className}`}>
        <div className="skeleton-line"></div>
        <div className="skeleton-line" style={{ width: '70%' }}></div>
      </div>
    );
  }

  if (!description) {
    return (
      <div className={`description-preview ${className}`}>
        Experience premium quality and craftsmanship from {brand || 'luxury'} brands.
      </div>
    );
  }

  const truncatedText = truncateDescription(description.description, maxLength);

  return (
    <div className={`description-preview ${className}`} title={description.description}>
      {truncatedText}
    </div>
  );
};

// Inline styles for the preview component
const styles = `
  .description-preview {
    font-size: 12px;
    line-height: 1.4;
    color: #6b7280;
    margin: 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .description-preview-skeleton {
    margin: 4px 0;
  }

  .skeleton-line {
    height: 12px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 2px;
    margin-bottom: 4px;
  }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @media (max-width: 768px) {
    .description-preview {
      font-size: 11px;
      -webkit-line-clamp: 1;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
} 