import React from 'react';
import Image from 'next/image';
import styles from './PremiumScrollRow.module.css';

const brands = [
  { src: '/scroll line/Rolex.png', alt: 'Rolex' },
  { src: '/scroll line/dior.png', alt: 'Dior' },
  { src: '/scroll line/adidas.png', alt: 'Adidas' },
  { src: '/scroll line/Acne studios.png', alt: 'Acne Studios' },
  { src: '/scroll line/Nike.png', alt: 'Nike' },
  { src: '/scroll line/pandora.png', alt: 'Pandora' },
  { src: '/scroll line/LV.png', alt: 'Louis Vuitton' },
  { src: '/scroll line/crocs.png', alt: 'Crocs' },
  { src: '/scroll line/fendi.png', alt: 'Fendi' },
  { src: '/scroll line/chole.png', alt: 'Chloé' },
  { src: '/scroll line/Palm Angels.png', alt: 'Palm Angels' },
  { src: '/scroll line/Chanel.png', alt: 'Chanel' },
  { src: '/scroll line/Hermes.png', alt: 'Hermès' },
  { src: '/scroll line/Prada.png', alt: 'Prada' },
  { src: '/scroll line/Balenciaga.png', alt: 'Balenciaga' },
  { src: '/scroll line/Clarks.png', alt: 'Clarks' },
];

const icons = [
  { src: '/scroll line/Sneaker filled.png', alt: 'Sneaker' },
  { src: '/scroll line/Casio Wristwatch Vector Illustration 1.png', alt: 'Watch' },
  { src: '/scroll line/T-shirt vector.png', alt: 'T-shirt' },
  { src: '/scroll line/Prada bag vector.png', alt: 'Bag' },
  { src: '/scroll line/Cap vector.png', alt: 'Cap' },
  { src: '/scroll line/Sunglasses vector.png', alt: 'Sunglasses' },
  { src: '/scroll line/Shorts vector.png', alt: 'Shorts' },
  { src: '/scroll line/Labubu vector.png', alt: 'Labubu' },
  { src: '/scroll line/Creed perfume vector.png', alt: 'Perfume' },
];

const star = { src: '/scroll line/Star.png', alt: 'Star' };
const horn = { src: '/scroll line/Plutus horn.png', alt: 'Plutus Horn' };

const PremiumIconRow = () => {
  // Build the alternating icon row: icon, star, icon, horn, icon, star, icon, horn, ...
  const iconRow = [];
  for (let i = 0; i < icons.length; i++) {
    iconRow.push(
      <div className={styles.iconItem} key={`icon-${i}`}>
        <Image 
          src={icons[i].src} 
          alt={icons[i].alt} 
          width={40} 
          height={40} 
          priority 
          className={styles.iconImage}
        />
      </div>
    );
    // Alternate between star and horn
    const betweenIcon = i % 2 === 0 ? star : horn;
    iconRow.push(
      <div className={styles.iconItem} key={`between-${i}`}>
        <Image 
          src={betweenIcon.src} 
          alt={betweenIcon.alt} 
          width={24} 
          height={24} 
          priority 
          className={styles.betweenIcon}
        />
      </div>
    );
  }
  // Infinite marquee
  const infiniteIcons = [...iconRow, ...iconRow];

  return (
    <div className={styles.premiumScrollWrapper}>
      {/* Brand Row - same as before */}
      <div className={styles.marqueeWrapper}>
        <div className={`${styles.marquee} ${styles.left}`}>
          {[...brands, ...brands].map((brand, idx) => (
            <div className={styles.brandLogoSmall} key={idx}>
              <Image 
                src={brand.src} 
                alt={brand.alt} 
                width={70} 
                height={28} 
                priority 
                className={styles.brandImage}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Icon Row */}
      <div className={styles.marqueeWrapper}>
        <div className={`${styles.marquee} ${styles.right}`}>
          {infiniteIcons}
        </div>
      </div>
    </div>
  );
};

export default PremiumIconRow; 