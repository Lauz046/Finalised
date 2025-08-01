import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./infinitescroll.module.css";

const InfiniteCardSection: React.FC = () => {
  return (
    <section className={styles.sectionCustom}>
      <h2 className={styles.sectionTitle}>
        Fragrance For Every Style
      </h2>
      <div className={styles.cardsRow}>
        {/* Desktop: Left Card */}
        <Link href="/perfume?filter=designer" legacyBehavior>
          <a className={styles.cardTiltLeft}>
            <Image src="/image1.jpeg" alt="Designer Perfumes" fill className={styles.cardImageStatic} />
            <div className={styles.cardCta}>Designer Perfumes</div>
          </a>
        </Link>
        {/* Desktop: Middle Card (Perfume Image) */}
        <div className={styles.cardCenter}>
          <Image src="/PERFUMES_FRAGRANCE_WOF__ANIMATION.png" alt="Perfume Collection" fill className={styles.cardImageStatic} />
        </div>
        {/* Desktop: Right Card */}
        <Link href="/perfume?filter=niche" legacyBehavior>
          <a className={styles.cardTiltRight}>
            <Image src="/image7.jpeg" alt="Niche Perfumes" fill className={styles.cardImageStatic} />
            <div className={styles.cardCta}>Niche Perfumes</div>
          </a>
        </Link>
        
        {/* Mobile: Top Center Card */}
        <div className={styles.cardTopCenter}>
          <Image src="/PERFUMES_FRAGRANCE_WOF__ANIMATION.png" alt="Perfume Collection" fill className={styles.cardImageStatic} />
        </div>
        {/* Mobile: Bottom Row */}
        <div className={styles.bottomRow}>
          {/* Mobile: Left Card */}
          <Link href="/perfume?filter=designer" legacyBehavior>
            <a className={styles.cardBottomLeft}>
              <Image src="/image1.jpeg" alt="Designer Perfumes" fill className={styles.cardImageStatic} />
              <div className={styles.cardCta}>Designer Perfumes</div>
            </a>
          </Link>
          {/* Mobile: Right Card */}
          <Link href="/perfume?filter=niche" legacyBehavior>
            <a className={styles.cardBottomRight}>
              <Image src="/image7.jpeg" alt="Niche Perfumes" fill className={styles.cardImageStatic} />
              <div className={styles.cardCta}>Niche Perfumes</div>
            </a>
          </Link>
        </div>
      </div>
      <Link href="/perfume" legacyBehavior>
        <a className={styles.ctaMain}>Explore the Collection</a>
      </Link>
    </section>
  );
};

export default InfiniteCardSection;
