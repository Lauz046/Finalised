import React, { useState, useRef, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Breadcrumbs } from './Breadcrumbs';
import { SizeGrid, SizePrice } from './SizeGrid';
import { ComparePrice } from './ComparePrice';
import { SizeChart } from './SizeChart';
import { PriceHistory } from './PriceHistory';
import { ProductDescription } from './ProductDescription';
import { FAQ } from './FAQ';
import { Recommendations } from './Recommendations';
import styles from './ProductPage.module.css';
import Navbar from '../nav/Navbar';
import { useStash } from '../StashContext';
import { useEnquiryPanel } from '../../components/EnquiryPanelContext';
import { StaticImageViewer } from './StaticImageViewer';
import { SneakerImageViewer } from './SneakerImageViewer';
import { PerfumeImageViewer } from './PerfumeImageViewer';
import { MobileImageViewer } from './MobileImageViewer';
import { MobileSizeOverlay } from './MobileSizeOverlay';
import { MobileSizeChartOverlay } from './MobileSizeChartOverlay';
import SearchOverlay from '../SearchOverlay';
import AddToStashButton from '../AddToStashButton';
import { initGSAP, safeAnimate } from '../../utils/gsapUtils';

interface ProductPageProps {
  productId: string;
  productType: 'sneaker' | 'perfume' | 'watch' | 'apparel' | 'accessories';
  product?: any; // generic for SSR
}



const ALL_SNEAKERS_QUERY = gql`
  query AllSneakers {
    sneakers {
      id
      brand
      productName
      images
      sizePrices { size price }
    }
  }
`;

export const ProductPage: React.FC<ProductPageProps> = ({ productId, productType, product: productProp }) => {
  // Queries for each category
  const SNEAKER_QUERY = gql`
    query Sneaker($id: ID!) {
      sneaker(id: $id) {
        id
        brand
        productName
        sizePrices { size price }
        images
        soldOut
        sellerName
        sellerUrl
        productLink
      }
    }
  `;
  const PERFUME_QUERY = gql`
    query Perfume($id: ID!) {
      perfume(id: $id) {
        id
        brand
        productName
        images
        price
        sellerName
        sellerUrl
        url
      }
    }
  `;
  const WATCH_QUERY = gql`
    query Watch($id: ID!) {
      watch(id: $id) {
        id
        brand
        productName
        images
        price
        sellerName
        sellerUrl
      }
    }
  `;
  const APPAREL_QUERY = gql`
    query Apparel($id: ID!) {
      apparel(id: $id) {
        id
        brand
        productName
        sizePrices { size price }
        images
        sellerName
        sellerUrl
      }
    }
  `;
  const ACCESSORIES_QUERY = gql`
    query Accessory($id: ID!) {
      accessory(id: $id) {
        id
        brand
        productName
        sizePrices { size price }
        images
        sellerName
        sellerUrl
      }
    }
  `;

  // Choose query and data key based on productType
  let QUERY, allQuery, dataKey, allKey;
  switch (productType) {
    case 'sneaker':
      QUERY = SNEAKER_QUERY;
      allQuery = ALL_SNEAKERS_QUERY;
      dataKey = 'sneaker';
      allKey = 'sneakers';
      break;
    case 'perfume':
      QUERY = PERFUME_QUERY;
      allQuery = gql`
        query AllPerfumes {
          perfumes {
            id
            brand
            title
            variants { price }
            images
          }
        }
      `;
      dataKey = 'perfume';
      allKey = 'perfumes';
      break;
    case 'watch':
      QUERY = WATCH_QUERY;
      allQuery = gql`
        query AllWatches {
          watches {
            id
            brand
            name
            salePrice
            images
          }
        }
      `;
      dataKey = 'watch';
      allKey = 'watches';
      break;
    case 'apparel':
      QUERY = APPAREL_QUERY;
      allQuery = gql`
        query AllApparel {
          apparel {
            id
            brand
            productName
            sizePrices { size price }
            images
          }
        }
      `;
      dataKey = 'apparel';
      allKey = 'apparel';
      break;
    case 'accessories':
      QUERY = ACCESSORIES_QUERY;
      allQuery = gql`
        query AllAccessories {
          accessories {
            id
            brand
            productName
            sizePrices { size price }
            images
          }
        }
      `;
      dataKey = 'accessory';
      allKey = 'accessories';
      break;
    default:
      QUERY = SNEAKER_QUERY;
      allQuery = ALL_SNEAKERS_QUERY;
      dataKey = 'sneaker';
      allKey = 'sneakers';
  }

  const { data, loading, error } = useQuery(QUERY, { variables: { id: productId }, skip: !!productProp });
  const { data: allData } = useQuery(allQuery);
  const [selectedSize, setSelectedSize] = useState<SizePrice | null>(null);
  useStash();
  const { openPanel } = useEnquiryPanel();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Mobile overlay states
  const [isMobileSizeOverlayOpen, setIsMobileSizeOverlayOpen] = useState(false);
  const [isMobileSizeChartOpen, setIsMobileSizeChartOpen] = useState(false);

  // --- ScrollTrigger logic ---
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastImageRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize GSAP and ScrollTrigger
  useEffect(() => {
    initGSAP();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const product = productProp || data?.[dataKey];
  if (!product) return <div>Product not found</div>;

  // ScrollTrigger logic - moved after product is defined
  useEffect(() => {
    // Only apply scroll triggers on desktop
    if (isMobile) return;
    
    if (typeof window === 'undefined') return;
    if (!leftColRef.current || !rightColRef.current || !containerRef.current || !lastImageRef.current) return;
    
    let cleanup: (() => void) | undefined;
    
    const setupScrollTriggers = async () => {
      const { gsap, ScrollTrigger } = await initGSAP();
      if (!gsap || !ScrollTrigger) {
        console.warn('GSAP not available, using fallback scroll behavior');
        return;
      }
      
      const leftCol = leftColRef.current;
      const rightCol = rightColRef.current;
      const container = containerRef.current;
      const lastImg = lastImageRef.current;

      if (!leftCol || !rightCol || !container || !lastImg) return;

      // Check if product has only one image
      const hasSingleImage = product?.images?.length === 1;
      
      if (hasSingleImage) {
        // For single image products: pin only the left column (image) until size chart is reached
        const sizeChartElement = rightCol.querySelector('[data-size-chart]');
        
        if (sizeChartElement) {
          // Pin only the left column (image) while right column scrolls
          const singleImagePin = (ScrollTrigger as any).create({
            trigger: container,
            start: 'top 120px',
            endTrigger: sizeChartElement,
            end: 'top 200px',
            pin: leftCol,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
              leftCol?.classList.add('leftSticky');
            },
            onLeave: () => {
              leftCol?.classList.remove('leftSticky');
            },
            onEnterBack: () => {
              leftCol?.classList.add('leftSticky');
            },
            onLeaveBack: () => {
              leftCol?.classList.remove('leftSticky');
            },
          });
          
          return () => {
            singleImagePin && singleImagePin.kill();
          };
        }
      } else {
        // Original logic for multiple images
        // Pin the right column until the last image hits the top, then pin the left column
        let rightPin, leftPin;
        // Pin rightCol while scrolling through leftCol (images)
        rightPin = (ScrollTrigger as any).create({
          trigger: container,
          start: 'top 120px',
          endTrigger: lastImg,
          end: 'top 200px', // 120px offset for header
          pin: rightCol,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            rightCol?.classList.add('rightSticky');
            leftCol?.classList.add('leftSticky');
          },
          onLeave: () => {
            rightCol?.classList.remove('rightSticky');
          },
          onEnterBack: () => {
            rightCol?.classList.add('rightSticky');
          },
          onLeaveBack: () => {
            leftCol?.classList.remove('leftSticky');
          },
        });
        // Pin leftCol after last image is reached, let rightCol scroll
        leftPin = (ScrollTrigger as any).create({
            trigger: lastImg,
            start: 'top 180px',
            end: () => `+=${rightCol.offsetHeight - window.innerHeight - 200}`,
            pin: leftCol,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
              leftCol?.classList.add('leftSticky');
            },
            onLeave: () => {
              leftCol?.classList.remove('leftSticky');
            },
            onEnterBack: () => {
              leftCol?.classList.add('leftSticky');
            },
            onLeaveBack: () => {
              leftCol?.classList.remove('leftSticky');
            },
          });
        return () => {
          rightPin && rightPin.kill();
          leftPin && leftPin.kill();
        };
      }
    };

    setupScrollTriggers().then((cleanupFn) => {
      cleanup = cleanupFn;
    });
    
    return () => {
      cleanup?.();
    };
  }, [data, isMobile, product]);
  // --- End ScrollTrigger logic ---

  // Get recommendations from all products
  const allProducts = allData?.[allKey] || [];
  const recommendations = allProducts
    .filter((p: any) => p.id !== product.id)
    .slice(0, 6)
    .map((p: any) => {
      const name = p.productName || p.name || p.title;
      const price = p.price || p.salePrice || (p.sizePrices && p.sizePrices[0]?.price) || (p.variants && p.variants[0]?.price);
      return {
        id: p.id,
        image: p.images[0],
        name,
        brand: p.brand,
        price,
      };
    });

  // For now, use placeholder sellers and recommendations

  const mockDescription = product.description || 'With crisp detailing and nostalgic blue accents, this 2024 release captures the essence of vintage basketball with a modern edge.';

  const _currentSize = selectedSize || (product.sizePrices ? product.sizePrices[0] : null);



  const display = getDisplayFields(product, productType);

  // Mobile overlay handlers
  const handleMobileSizeClick = () => {
    setIsMobileSizeOverlayOpen(true);
  };

  const handleMobileSizeChartClick = () => {
    setIsMobileSizeChartOpen(true);
  };

  return (
    <>
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <div className={`${styles.container} product-page`} ref={containerRef}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: productType.charAt(0).toUpperCase() + productType.slice(1), href: `/${productType}` },
            { label: product.brand }
          ]}
        />
        <div
          className={styles.leftCol + ' leftSticky'}
          ref={leftColRef}
        >
          {/* Mobile Image Viewer */}
          <MobileImageViewer images={product.images} lastImageRef={lastImageRef} productType={productType} />
          
          {/* Desktop Image Viewers */}
          {productType === 'sneaker' ? (
            <SneakerImageViewer images={product.images} lastImageRef={lastImageRef} />
          ) : productType === 'perfume' ? (
            <PerfumeImageViewer images={product.images} lastImageRef={lastImageRef} />
          ) : (
            <StaticImageViewer images={product.images} lastImageRef={lastImageRef} />
          )}
        </div>
        <div
          className={styles.rightCol + ' rightSticky'}
          ref={rightColRef}
        >
          <div className={styles.brandName}>{product.brand}</div>
          <h1 className={styles.title}>{display.name}</h1>
          <AddToStashButton
            product={{
              id: product.id,
              name: display.name,
              brand: product.brand,
              price: display.price,
              image: product.images[0],
              category: product.category || productType,
              productType: productType
            }}
          />
          <button className={styles.enquireBtn} onClick={() => openPanel({
            id: product.id,
            name: display.name,
            brand: product.brand,
            image: product.images[0],
          })}>
            Enquire Now
          </button>
          {product.sizePrices && (
            <SizeGrid 
              sizes={product.sizePrices} 
              onSelect={setSelectedSize} 
              selectedSize={selectedSize}
              onMobileSizeClick={handleMobileSizeClick}
              onMobileSizeChartClick={handleMobileSizeChartClick}
            />
          )}
          {productType === 'watch' ? (
            <ComparePrice
              sellerName={product.sellerName || undefined}
              sellerLogo={product.sellerUrl || undefined}
              price={display.price}
              onClick={() =>
                openPanel({
                  id: product.id,
                  name: display.name,
                  brand: product.brand,
                  image: product.images[0],
                })
              }
            />
          ) : (
            <ComparePrice
              sellerName={product.sellerName || undefined}
              sellerLogo={product.sellerUrl || undefined}
              productPageUrl={product.productLink || product.link || product.url}
              price={display.price}
            />
          )}
          {product.sizePrices && productType === 'sneaker' && <SizeChart />}
          <PriceHistory />
          <ProductDescription description={mockDescription} />
          <FAQ />
        </div>
      </div>
      <div className={styles.recommendationsRow}>
        <Recommendations
          products={recommendations}
          currentBrand={product.brand}
          productType={productType}
        />
      </div>

      {/* Mobile Overlays */}
      {product.sizePrices && (
        <MobileSizeOverlay
          isOpen={isMobileSizeOverlayOpen}
          onClose={() => setIsMobileSizeOverlayOpen(false)}
          sizes={product.sizePrices}
          selectedSize={selectedSize}
          onSelect={setSelectedSize}
          onSizeChartClick={handleMobileSizeChartClick}
        />
      )}
      
      <MobileSizeChartOverlay
        isOpen={isMobileSizeChartOpen}
        onClose={() => setIsMobileSizeChartOpen(false)}
      />
    </>
  );
};

function getDisplayFields(product: any, type: string) {
  const name = product.productName || product.name || product.title;
  const price = product.price || product.salePrice || (product.sizePrices && product.sizePrices[0]?.price) || (product.variants && product.variants[0]?.price);
  return { name, price };
} 