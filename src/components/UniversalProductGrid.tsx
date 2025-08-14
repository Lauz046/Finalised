import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './UniversalProductGrid.module.css';

interface Product {
  id: string;
  brand: string;
  productName?: string;
  name?: string;
  title?: string;
  images?: string[];
  price?: number;
  salePrice?: number;
  sizePrices?: Array<{ size: string; price: number }>;
  variants?: Array<{ price: number }>;
  productLink?: string;
  url?: string;
  link?: string;
  type?: string;
}

interface UniversalProductGridProps {
  products: Product[];
  category?: string;
  loading?: boolean;
}

// Utility function to limit product names - 5 words for desktop, 4 for mobile/tablet (no ellipsis)
const truncateProductName = (name: string, isMobile: boolean = false, isTablet: boolean = false, brand?: string): string => {
  if (!name) return '';
  
  // Remove brand name from the beginning of product name
  let cleanName = name;
  if (brand && name.toLowerCase().startsWith(brand.toLowerCase())) {
    cleanName = name.substring(brand.length).trim();
    // Remove any leading punctuation or spaces
    cleanName = cleanName.replace(/^[\s\-_.,]+/, '');
  }
  
  // Limit to 5 words on desktop, 4 words on mobile
  const words = cleanName.split(' ');
  const maxWords = (isMobile || isTablet) ? 4 : 5;
  if (words.length <= maxWords) return cleanName;
  return words.slice(0, maxWords).join(' ');
};

const UniversalProductGrid: React.FC<UniversalProductGridProps> = ({ 
  products, 
  category, 
  loading = false 
}) => {
  // Detect screen size for responsive word limits
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  // Format price with proper currency
  const formatPrice = (price: number) => {
    return `Rs. ${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)}`;
  };

  const getProductName = (product: Product): string => {
    return product.productName || product.name || product.title || 'Unknown Product';
  };

  const getProductPrice = (product: Product): number => {
    // Check for direct price first
    if (product.price && product.price > 0) return product.price;
    if (product.salePrice && product.salePrice > 0) return product.salePrice;
    
    // Check for sizePrices (get the first available price)
    if (product.sizePrices && product.sizePrices.length > 0) {
      const firstPrice = product.sizePrices[0]?.price;
      if (firstPrice && firstPrice > 0) return firstPrice;
    }
    
    // Check for variants
    if (product.variants && product.variants.length > 0) {
      const firstVariantPrice = product.variants[0]?.price;
      if (firstVariantPrice && firstVariantPrice > 0) return firstVariantPrice;
    }
    
    // If no price found, try to get from any available price field
    const allPrices = [
      product.price,
      product.salePrice,
      ...(product.sizePrices?.map(sp => sp.price) || []),
      ...(product.variants?.map(v => v.price) || [])
    ].filter((p): p is number => p !== undefined && p > 0);
    
    return allPrices.length > 0 ? Math.min(...allPrices) : 0;
  };

  const getProductLink = (product: Product): string => {
    // For search page, use the product type to determine the correct category path
    if (category === 'search' && product.type) {
      return `/${product.type.toLowerCase()}/${product.id}`;
    }
    // Always use our internal product pages, not external URLs
    return `/${category || 'sneaker'}/${product.id}`;
  };

  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonBrand} />
              <div className={styles.skeletonName} />
              <div className={styles.skeletonPrice} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => {
        const productName = getProductName(product);
        const productPrice = getProductPrice(product);
        const productLink = getProductLink(product);
        
        return (
          <Link 
            key={product.id} 
            href={productLink}
            className={styles.card}
          >
            <div className={styles.imageContainer}>
              <Image
                src={product.images?.[0] || '/nav/Plutus logo blue.svg'}
                alt={productName}
                width={300}
                height={300}
                className={styles.image}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/nav/Plutus logo blue.svg';
                }}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.brand}>{product.brand}</div>
              <div className={styles.name} title={productName}>
                {truncateProductName(productName, isMobile, isTablet, product.brand)}
              </div>
              <div className={styles.price}>
                {productPrice > 0 ? formatPrice(productPrice) : 'Price on request'}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default UniversalProductGrid; 