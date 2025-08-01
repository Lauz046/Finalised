import React, { useEffect, useRef } from 'react';
import styles from './apparel/ApparelProductGrid.module.css';
import Link from 'next/link';
import Image from 'next/image';

function normalizeType(type: string) {
  if (!type) return '';
  const map: Record<string, string> = {
    sneakers: 'Sneaker',
    watches: 'Watch',
    perfumes: 'Perfume',
    apparel: 'Apparel',
    accessories: 'Accessory',
  };
  return map[type] || type;
}

function getPrice(product: any) {
  if (product.type === 'Sneaker' && product.sizePrices && product.sizePrices.length > 0) {
    const prices = product.sizePrices.map((sp: any) => sp.price).filter((p: any) => typeof p === 'number');
    return prices.length ? Math.min(...prices) : undefined;
  }
  if (product.type === 'Watch' && typeof product.salePrice === 'number') {
    return product.salePrice;
  }
  if (product.type === 'Perfume' && product.variants && product.variants.length > 0) {
    const prices = product.variants.map((v: any) => v.price).filter((p: any) => typeof p === 'number');
    return prices.length ? Math.min(...prices) : undefined;
  }
  if (product.type === 'Apparel' && product.sizePrices && product.sizePrices.length > 0) {
    const prices = product.sizePrices.map((sp: any) => sp.price).filter((p: any) => typeof p === 'number');
    return prices.length ? Math.min(...prices) : undefined;
  }
  if (product.type === 'Accessory' && product.sizePrices && product.sizePrices.length > 0) {
    const prices = product.sizePrices.map((sp: any) => sp.price).filter((p: any) => typeof p === 'number');
    return prices.length ? Math.min(...prices) : undefined;
  }
  return undefined;
}

function getHref(product: any) {
  if (product.type === 'Sneaker') return `/sneaker/${product.id}`;
  if (product.type === 'Watch') return `/watch/${product.id}`;
  if (product.type === 'Perfume') return `/perfume/${product.id}`;
  if (product.type === 'Apparel') return `/apparel/${product.id}`;
  if (product.type === 'Accessory') return `/accessories/${product.id}`;
  return '#';
}

function getTitle(product: any) {
  const title = product.productName || product.name || product.title || '';
  const words = title.split(' ');
  if (words.length > 5) {
    return words.slice(0, 5).join(' ');
  }
  return title;
}

function getBrand(product: any) {
  return product.brand || '';
}

function getImage(product: any) {
  if (product.images && product.images.length > 0) {
    const imageUrl = product.images[0];
    // Check if it's an external URL that might be slow
    if (imageUrl && imageUrl.startsWith('http')) {
      // For external images, use a fallback if they're slow
      return imageUrl;
    }
    return imageUrl;
  }
  return '/image1.jpeg';
}


import ProductGridSkeleton from './ProductGridSkeleton';

const UniversalProductGrid: React.FC<{ products: any[]; loading?: boolean; isMobile?: boolean }> = ({ products, loading = false, isMobile = false }) => {
  // Format price with proper currency
  const formatPrice = (price: number) => {
    return `Rs. ${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)}`;
  };

  // Image loading timeout handler
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.opacity = '1';
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/image1.jpeg';
    target.style.opacity = '1';
  };

  if (loading) {
    return <ProductGridSkeleton count={8} />;
  }
  
  const normalizedProducts = products.map(p => ({ ...p, type: normalizeType(p.type) }));
  
  return (
    <div className={isMobile ? styles.gridMobile : styles.grid}>
      {normalizedProducts.map(product => {
        const imgSrc = getImage(product);
        const price = getPrice(product);
        return (
          <Link href={getHref(product)} key={product.id} className={styles.card}>
            <div className={styles.imageContainer}>
                              <Image
                  src={imgSrc}
                  alt={getTitle(product)}
                  width={300}
                  height={300}
                  className={styles.image}
                  loading="lazy"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  style={{
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                />
            </div>
            <div className={styles.content}>
              <div className={styles.brand}>{getBrand(product)}</div>
              <div className={styles.name} title={getTitle(product)}>
                {getTitle(product)}
              </div>
              <div className={styles.price}>
                {typeof price === 'number' ? formatPrice(price) : '-'}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default UniversalProductGrid; 