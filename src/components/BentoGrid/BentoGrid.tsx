import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BentoGrid.module.css';
// Removed unused import to fix TypeScript error

interface ProductCard {
  id: string;
  brand: string;
  productName?: string;
  title?: string;
  name?: string;
  images: string[];
  price?: number;
  salePrice?: number;
  marketPrice?: number;
}

interface BentoGridProps {
  sneakers?: ProductCard[];
}

const BentoGrid: React.FC<BentoGridProps> = () => {
  // Removed unused variables to fix TypeScript errors

  // Get products for each category from preloaded data (for subtle enhancement)
  // Removed unused variables to fix TypeScript errors

  return (
    <div className={styles.bentoGrid}>
      {/* Apparel (large left) */}
      <Link href="/apparel" className={styles.apparel + ' ' + styles.bentoCell} style={{cursor:'pointer', position:'relative', display: 'block', textDecoration: 'none'}}>
        <span className={styles.labelApparel}>APPAREL</span>
        <Image className={styles.imgApparel} src="/apparel.png" alt="Apparel" width={600} height={600} priority />
      </Link>
      
      {/* Sneakers (top right) */}
      <Link href="/sneaker" className={`${styles.sneakers} ${styles.bentoCell}`} style={{cursor:'pointer', position:'relative', display: 'block', textDecoration: 'none'}}>
        <span className={styles.labelSneakers}>SNEAKERS</span>
        <div style={{display:'flex', flexDirection:'row', gap: '12px', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', padding:'24px 0'}}>
          <Image className={styles.imgSneakers} src="/bentonew/sneaker.png" alt="Sneakers" width={400} height={600} priority />
        </div>
      </Link>
      
      {/* Watches (middle right) */}
      <Link href="/watch" className={styles.watches + ' ' + styles.bentoCell} style={{cursor:'pointer', position:'relative', display: 'block', textDecoration: 'none'}}>
        <span className={styles.labelWatches}>WATCHES</span>
        <Image className={styles.imgWatches} src="/bentonew/Rolex.png" alt="Watches" width={300} height={300} priority />
      </Link>
      
      {/* Handbags (middle right) - redirect to accessories */}
      <Link href="/accessories" className={styles.handbags + ' ' + styles.bentoCell} style={{cursor:'pointer', position:'relative', display: 'block', textDecoration: 'none'}}>
        <span className={styles.labelHandbags}>HANDBAGS</span>
        <Image className={styles.imgHandbags} src="/Bag.png" alt="Handbags" width={400} height={300} priority />
      </Link>
      
      {/* Accessories (bottom left, only labubu.png, larger) */}
      <Link href="/accessories" className={styles.accessories + ' ' + styles.bentoCell} style={{cursor:'pointer', position:'relative', display: 'block', textDecoration: 'none'}}>
        <span className={styles.labelAccessories}>ACCESSORIES</span>
        <Image className={styles.imgAccessories} src="/bentonew/labubu.png" alt="Accessory" width={400} height={600} priority />
      </Link>
      
      {/* Perfumes (bottom right) */}
      <Link href="/perfume" className={styles.perfumes + ' ' + styles.bentoCell} style={{cursor:'pointer', position:'relative', display: 'block', textDecoration: 'none'}}>
        <span className={styles.labelPerfumes}>PERFUMES</span>
        <Image className={styles.imgPerfumes} src="/perfumeticker/bentoperfume.png" alt="Perfumes" width={500} height={400} priority />
      </Link>
    </div>
  );
};

export default BentoGrid; 