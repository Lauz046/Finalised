import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './Menu.module.css';
import { useProductContext } from '../../context/ProductContext';
import { getBrandUrl } from '../../utils/brandUtils';

const categories = [
  {
    key: 'sneaker',
    label: 'SNEAKERS',
    icon: '/menu/Sneaker icon.svg',
    whiteIcon: '/menu/White sneaker icon.svg',
  },
  {
    key: 'apparel',
    label: 'APPAREL',
    icon: '/menu/Apparel icon.svg',
    whiteIcon: '/menu/White apparel icon.svg',
  },
  {
    key: 'watch',
    label: 'WATCHES',
    icon: '/menu/Watch icon.svg',
    whiteIcon: '/menu/White watches icon.svg',
  },
  {
    key: 'perfume',
    label: 'PERFUME',
    icon: '/menu/Perfume icon.svg',
    whiteIcon: '/menu/White perfume icon.svg',
  },
  {
    key: 'accessories',
    label: 'ACCESSORIES',
    icon: '/menu/Accessories icon.svg',
    whiteIcon: '/menu/White accessories icon.svg',
  },
];

const mobileMenuCards = [
  {
    title: 'Sneakers',
    subtitle: 'Shop most hyped and luxury sneakers.',
    image: '/bentonew/sneaker.png',
    bg: '#e6e8ea',
    link: '/sneaker',
  },
  {
    title: 'Perfumes',
    subtitle: 'Bold scents for the standout you.',
    image: '/perfumeticker/bentoperfume.png',
    bg: '#e6e8ea',
    link: '/perfume',
  },
  {
    title: 'Apparel',
    subtitle: 'Elevated streetwear and designer fits.',
    image: '/apparel.png',
    bg: '#e6e8ea',
    link: '/apparel',
  },
  {
    title: 'Accessories',
    subtitle: 'Details that complete every iconic look.',
    image: '/bentonew/labubu.png',
    bg: '#e6e8ea',
    link: '/accessories',
  },
  {
    title: 'Watches',
    subtitle: 'Luxury timepieces built for the spotlight.',
    image: '/bentonew/Rolex.png',
    bg: '#e6e8ea',
    link: '/watch',
  },
  {
    title: 'Handbags',
    subtitle: 'One-of-one finds and ultra-luxury picks.',
    image: '/Bag.png',
    bg: '#e6e8ea',
    link: '/accessories',
  },
  {
    title: 'Beyond Ordinary',
    subtitle: 'Shop most hyped and luxury sneakers.',
    image: '/morph 2.png',
    bg: '#07202c',
    link: '/categories',
    dark: true,
  },
];

// Static set of images for the WATCHES preview grid (desktop).
const watchTickerImages: string[] = [
  '/watchticker/Arnold & Son Constant Force Tourbillon.jpg',
  '/watchticker/Bell & Ross.jpg',
  '/watchticker/Carl F Bucherer (2).png',
  '/watchticker/Carl F Bucherer.png',
  '/watchticker/De Bethune.jpg',
  '/watchticker/Glashütte.jpg',
  '/watchticker/Graham watches.jpg',
  '/watchticker/Jacob & Co.jpg',
  '/watchticker/Vacheron Constantin.png',
];

function useIsMobile(breakpoint = 700) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

const getProductImages = (products: any[]): string[] => {
  // Get the first image of every product, if it exists
  return products
    .map((p) => Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : undefined)
    .filter((img): img is string => typeof img === 'string');
};

type CategoryKey = 'sneaker' | 'apparel' | 'watch' | 'perfume' | 'accessories';

interface MenuDataType {
  sneaker: { brands: string[]; subcategories: string[]; products: any[]; genders?: string[] };
  perfume: { brands: string[]; subcategories: string[]; products: any[]; genders?: string[]; fragranceFamilies?: string[] };
  watch: { brands: string[]; subcategories: string[]; products: any[]; genders?: string[] };
  apparel: { brands: string[]; subcategories: string[]; products: any[]; genders?: string[] };
  accessories: { brands: string[]; subcategories: string[]; products: any[]; genders?: string[] };
}

const Menu = () => {
  const { menuData, isPreloaded } = useProductContext();
  const router = useRouter();
  const [data, setData] = useState<MenuDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('sneaker');
  const [loadedCategories, setLoadedCategories] = useState<Set<CategoryKey>>(new Set(['sneaker']));
  const isMobile = useIsMobile();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Use pre-loaded data if available, otherwise fetch
  useEffect(() => {
    if (isPreloaded && menuData) {
      setData(menuData as any);
      setLoading(false);
      console.log('🚀 Menu loaded instantly from pre-loaded data');
    } else {
      const loadMenuData = async () => {
        setLoading(true);
        try {
          const res = await fetch('http://localhost:8090/api/menu');
          if (!res.ok) throw new Error('Failed to fetch menu');
          const json = await res.json();
          setData(json);
          setLoading(false);
        } catch (e: any) {
          setError(e.message);
          setLoading(false);
        }
      };

      loadMenuData();
    }
  }, [isPreloaded, menuData]);

  // Lazy load category data when switching
  useEffect(() => {
    if (!loadedCategories.has(activeCategory)) {
      setLoadedCategories(prev => new Set([...prev, activeCategory]));
    }
  }, [activeCategory, loadedCategories]);

  // Setup intersection observer for lazy image loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observerRef.current?.unobserve(img);
              }
            }
          });
        },
        { rootMargin: '50px' }
      );

      return () => {
        observerRef.current?.disconnect();
      };
    }
  }, []);

  // Map backend menu data to frontend structure
  const processedMenuData: MenuDataType = useMemo(() => {
    if (!data) return {
      sneaker: { brands: [], subcategories: [], products: [], genders: [] },
      perfume: { brands: [], subcategories: [], products: [], genders: [], fragranceFamilies: [] },
      watch: { brands: [], subcategories: [], products: [], genders: [] },
      apparel: { brands: [], subcategories: [], products: [], genders: [] },
      accessories: { brands: [], subcategories: [], products: [], genders: [] },
    };
    return {
      sneaker: {
        brands: data.sneaker?.brands || [],
        subcategories: data.sneaker?.subcategories || [],
        products: data.sneaker?.products || [],
        genders: data.sneaker?.genders || [],
      },
      perfume: {
        brands: data.perfume?.brands || [],
        subcategories: data.perfume?.subcategories || [],
        products: data.perfume?.products || [],
        genders: data.perfume?.genders || [],
        fragranceFamilies: data.perfume?.fragranceFamilies || [],
      },
      watch: {
        brands: data.watch?.brands || [],
        subcategories: data.watch?.subcategories || [],
        products: data.watch?.products || [],
        genders: data.watch?.genders || [],
      },
      apparel: {
        brands: data.apparel?.brands || [],
        subcategories: data.apparel?.subcategories || [],
        products: data.apparel?.products || [],
        genders: data.apparel?.genders || [],
      },
      accessories: {
        brands: data.accessories?.brands || [],
        subcategories: data.accessories?.subcategories || [],
        products: data.accessories?.products || [],
        genders: data.accessories?.genders || [],
      },
    };
  }, [data]);

  const current = processedMenuData[activeCategory] || { brands: [], subcategories: [], products: [] };
  const productImages = getProductImages(current.products);

  // Special ordering for watch menu preview: show IDs 50-59 (ascending)
  // For watches we want to highlight the products whose IDs are 50-59. If fewer than
  // nine such products exist or they lack images, we’ll fill the remainder by
  // taking items #50-59 from the full image list, finally falling back to the first
  // nine watch images. This guarantees nine thumbnails while still prioritising
  // the desired ID range.

  // watchMenuImages logic removed – we now use a static set of images from /watchticker.

  if (loading) return <div className={styles.menuOverlay}><div>Loading menu...</div></div>;
  if (error) return <div className={styles.menuOverlay}><div>Error: {error}</div></div>;

  const handleBrandClick = (brand: string, category: string) => {
    // Create brand URL with consistent formatting
    const brandUrl = `/${category}/brand/${getBrandUrl(brand)}`;
    
    // Navigate instantly using Next.js router - no pre-fetching
    router.push(brandUrl);
  };

  if (isMobile) {
    return (
      <div className={styles.menuMobileOverlay}>
        <div className={styles.menuMobileList}>
          <a className={styles.menuMobileRow} href="/stash">
            <span>Stash</span>
            <span className={styles.menuMobileArrow}>&#8250;</span>
          </a>
          <a className={styles.menuMobileRow} href="/account">
            <span>Account</span>
            <span className={styles.menuMobileArrow}>&#8250;</span>
          </a>
          <div className={styles.menuMobileRow} style={{cursor:'default'}}>
            <span>Categories</span>
          </div>
        </div>
        <div className={styles.menuMobileCards}>
          {mobileMenuCards.map(card => (
            <a key={card.title} href={card.link} className={card.dark ? styles.menuMobileCardDark : styles.menuMobileCard} style={{background: card.bg}}>
              <div className={styles.menuMobileCardText}>
                <div className={styles.menuMobileCardTitle}>{card.title}</div>
                <div className={styles.menuMobileCardSubtitle}>{card.subtitle}</div>
              </div>
              <div className={styles.menuMobileCardImgWrap}>
                <Image src={card.image} alt={card.title} width={110} height={110} className={styles.menuMobileCardImg} />
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
    <div className={styles.menuOverlay}>
      <div className={styles.menuHeaderRow}>
        <div className={styles.menuHeaderInner} style={{ justifyContent: 'center' }}>
          <div className={styles.menuCategories}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key as CategoryKey)}
                className={
                  activeCategory === cat.key
                    ? `${styles.menuCategoryBtn} ${styles.menuCategoryBtnActive}`
                    : styles.menuCategoryBtn
                }
                aria-label={cat.label}
                style={activeCategory === cat.key ? { background: '#fff', color: '#0a2230' } : {}}
              >
                <Image
                  src={activeCategory === cat.key ? cat.whiteIcon : cat.icon}
                  alt={cat.label}
                  width={28}
                  height={28}
                  style={activeCategory === cat.key ? { filter: 'none' } : {}}
                />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
     
          {activeCategory === 'apparel' && (
            <div className={styles.menuApparelFinalLayout}>
                
              <div className={styles.menuApparelBrandList}>
              <div className={styles.menuApparelCategoryHeading}>Brands</div>
                                  {current.brands?.map((brand: string) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandClick(brand, 'apparel')}
                    className={styles.menuBrandItem}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                  >
                    {brand}
                  </button>
                ))}
                </div>
              <div className={styles.menuApparelCategoryList}>
                <div className={styles.menuApparelCategoryHeading}>Sub Category</div>
                {[...(current.genders || []), ...(current.subcategories || [])].map((cat: string) => (
                  <div key={cat} className={styles.menuBrandItem}>{cat}</div>
                ))}
              </div>
              <div className={styles.menuMainContent}>
          <div className={styles.menuSectionHeading}>Products</div>
          <div className={styles.menuProductGridCard}>
          <div className={styles.menuProductGrid}>
              {activeCategory === 'apparel' && productImages.length >= 71 ? (
                [1,15,20,25,30,40].map((idx) => (
                  productImages[idx] && (
                    <Image
                      key={productImages[idx] + idx}
                      src={productImages[idx]}
                      alt="Product"
                      width={120}
                      height={120}
                      className={styles.menuProductImg}
                    />
                  )
                ))
              ) : (
                productImages.slice(0, 6).map((img: string, idx: number) => (
                  <Image
                    key={img + idx}
                    src={img}
                    alt="Product"
                    width={120}
                    height={120}
                    className={styles.menuProductImg}
                  />
                ))
              )}
            </div>
          </div>
        </div>
            </div>
          )}
          {activeCategory === 'perfume' && (() => {
  const perfumeCurrent = current as MenuDataType['perfume'];
  return (
    <div className={styles.menuApparelFinalLayout}>
      <div className={styles.menuApparelBrandList}>
        {/* Fragrance Family (including subcategories) */}
        <div className={styles.menuApparelCategoryHeading}>Fragrance Family</div>
        {[...(perfumeCurrent.fragranceFamilies || []), ...(perfumeCurrent.subcategories || [])].map((family: string) => (
          <div key={family} className={styles.menuBrandItem}>{family}</div>
                ))}
              </div>
      <div className={styles.menuApparelCategoryList}>
        <div className={styles.menuApparelCategoryHeading}>Brands</div>
        {perfumeCurrent.brands?.map((brand: string) => (
          <button
            key={brand}
            onClick={() => handleBrandClick(brand, 'perfume')}
            className={styles.menuBrandItem}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
          >
            {brand}
          </button>
        ))}
      </div>
      <div className={styles.menuMainContent}>
        <div className={styles.menuSectionHeading}>Products</div>
        <div className={styles.menuProductGridCard}>
          <div className={styles.menuProductGrid}>
            {activeCategory === 'perfume' && productImages.length >= 71 ? (
              [10, 20, 30, 40,100,80].map((idx) => (
                productImages[idx] && (
                  <Image
                    key={productImages[idx] + idx}
                    src={productImages[idx]}
                    alt="Product"
                    width={120}
                    height={120}
                    className={styles.menuProductImg}
                  />
                )
              ))
            ) : (
              productImages.slice(0, 6).map((img: string, idx: number) => (
                <Image
                  key={img + idx}
                  src={img}
                  alt="Product"
                  width={120}
                  height={120}
                  className={styles.menuProductImg}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
})()}
          {activeCategory === 'accessories' && (
            <div className={styles.menuApparelFinalLayout}>
              <div className={styles.menuApparelBrandList}>
                <div className={styles.menuApparelCategoryHeading}>Subcategories</div>
                {[...(current.genders || []), ...(current.subcategories || [])].map((subcat: string) => (
                  <div key={subcat} className={styles.menuBrandItem}>{subcat}</div>
                ))}
              </div>
              <div className={styles.menuApparelCategoryList}>
                <div className={styles.menuApparelCategoryHeading}>Brands</div>
                {current.brands?.map((brand: string) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandClick(brand, 'accessories')}
                    className={styles.menuBrandItem}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                  >
                    {brand}
                  </button>
                ))}
              </div>
              <div className={styles.menuMainContent}>
                <div className={styles.menuSectionHeading}>Products</div>
                <div className={styles.menuProductGridCard}>
                  <div className={styles.menuProductGrid}>
                    {activeCategory === 'accessories' && productImages.length >= 71 ? (
                      [1,2,3,4,5,6].map((idx) => (
                        productImages[idx] && (
                          <Image
                            key={productImages[idx] + idx}
                            src={productImages[idx]}
                            alt="Product"
                            width={120}
                            height={120}
                            className={styles.menuProductImg}
                          />
                        )
                      ))
                    ) : (
                      productImages.slice(0, 6).map((img: string, idx: number) => (
                        <Image
                          key={img + idx}
                          src={img}
                          alt="Product"
                          width={120}
                          height={120}
                          className={styles.menuProductImg}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
              </div>
          )}
          {activeCategory === 'watch' && (
            <div className={styles.menuApparelFinalLayout}>
              <div className={styles.menuApparelBrandList}>
              <div className={styles.menuApparelCategoryHeading}>Brands</div>
                {current.brands?.map((brand: string) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandClick(brand, 'watch')}
                    className={styles.menuBrandItem}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                  >
                    {brand}
                  </button>
                ))}
              </div>
              <div className={styles.menuApparelCategoryList}>
                <div className={styles.menuApparelCategoryHeading}>Gender</div>
                {(current.genders || []).map((gender: string) => (
                  <div key={gender} className={styles.menuBrandItem}>{gender}</div>
                ))}
              </div>
              <div className={styles.menuMainContent}>
                <div className={styles.menuSectionHeading}>Products</div>
                <div className={styles.menuProductGridCard}>
                  <div className={styles.menuProductGrid} style={{ position: 'relative', top: '-20px' }}>
                    {watchTickerImages.slice(0, 6).map((img: string, idx: number) => (
                      <Image
                        key={img + idx}
                        src={img}
                        alt="Product"
                        width={140}
                        height={140}
                        className={styles.menuProductImg}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeCategory === 'sneaker' && (
            <div className={styles.menuApparelFinalLayout}>
              <div className={styles.menuApparelBrandList}>
              <div className={styles.menuApparelCategoryHeading}>Brands</div>
                                  {current.brands?.map((brand: string) => (
                    <button
                      key={brand}
                      onClick={() => handleBrandClick(brand, 'sneaker')}
                      className={styles.menuBrandItem}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                    >
                      {brand}
                    </button>
                  ))}
              </div>
              <div className={styles.menuMainContent}>
                <div className={styles.menuProductGridCard}>
                  <div className={styles.menuProductGridSneaker}>
                    {productImages.slice(0, 9).map((img: string, idx: number) => (
                      <Image
                        key={img + idx}
                        src={img}
                        alt="Product"
                        width={120}
                        height={120}
                        className={styles.menuProductImg}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.menuMainContent}>
          <div className={styles.menuSectionHeading}>Products</div>
          <div className={styles.menuProductGridCard}>
            <div className={styles.menuProductGrid}>
              {activeCategory === 'sneaker' && productImages.length >= 71 ? (
                [40, 50, 60, 70, 80 ,90,100, 120,140].map((idx) => (
                  productImages[idx] && (
                    <Image
                      key={productImages[idx] + idx}
                      src={productImages[idx]}
                      alt="Product"
                      width={120}
                      height={120}
                      className={styles.menuProductImg}
                    />
                  )
                ))
              ) : (
                productImages.slice(0, 4).map((img: string, idx: number) => (
                  <Image
                    key={img + idx}
                    src={img}
                    alt="Product"
                    width={120}
                    height={120}
                    className={styles.menuProductImg}
                  />
                ))
              )}
            </div>
          </div>
        </div>
     </>
  );
};

export default Menu; 