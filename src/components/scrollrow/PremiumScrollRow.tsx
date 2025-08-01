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

const shoes = [
  { src: '/scroll line/Air Jordan.png', name: 'Air Jordan' },
  { src: '/scroll line/SB DUNKS.png', name: 'SB Dunks' },
  { src: '/scroll line/AF1.png', name: 'AF1' },
  { src: '/scroll line/Yeezy.png', name: 'Yeezy' },
  { src: '/scroll line/Dunks.png', name: 'Dunks' },
  { src: '/scroll line/Samba.png', name: 'Samba' },
  { src: '/scroll line/ONC.png', name: 'ONC' },
];

const star = { src: '/scroll line/Star10.png', alt: 'Star' };

const PremiumScrollRow = () => {
  // Build the sneaker row: shoe, name (right of shoe), star, ...
  const sneakerRow = [];
  for (let i = 0; i < shoes.length; i++) {
    sneakerRow.push(
      <div className={styles.shoeItemSmall} key={`shoe-${i}`}>
        <Image 
          src={shoes[i].src} 
          alt={shoes[i].name} 
          width={72} 
          height={46} 
          priority 
          className={styles.shoeImage}
        />
        <span className={styles.shoeNameSmall}>{shoes[i].name}</span>
      </div>
    );
    sneakerRow.push(
      <div className={styles.starIcon} key={`star-${i}`}>
        <Image 
          src={star.src} 
          alt={star.alt} 
          width={22} 
          height={22} 
          priority 
          className={styles.starImage}
        />
      </div>
    );
  }
  const infiniteSneakerRow = [...sneakerRow, ...sneakerRow];

  return (
    <div className={styles.premiumScrollWrapper}>
      {/* Brand Row - smaller logos */}
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
      {/* Shoes Row with name to the right of the sneaker */}
      <div className={styles.marqueeWrapper}>
        <div className={`${styles.marquee} ${styles.right}`}>
          {infiniteSneakerRow}
        </div>
      </div>
    </div>
  );
};

export default PremiumScrollRow; 