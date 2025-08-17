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
import { initGSAP } from '../../utils/gsapUtils';

interface ProductPageProps {
  productId: string;
  productType: 'sneaker' | 'perfume' | 'watch' | 'apparel' | 'accessories';
  product?: ProductData; // generic for SSR
}

interface ProductData {
  id: string;
  brand: string;
  productName?: string;
  name?: string;
  title?: string;
  images: string[];
  sizePrices?: SizePrice[];
  price?: number;
  salePrice?: number;
  marketPrice?: number | string | null;
  variants?: Array<{ price: number }>;
  sellerName?: string;
  sellerUrl?: string;
  productLink?: string;
  url?: string;
  link?: string;
  soldOut?: boolean;
  category?: string;
  description?: string;
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

// Move all queries outside the component to prevent hooks order issues
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

// Additional queries for all products
const ALL_PERFUMES_QUERY = gql`
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

const ALL_WATCHES_QUERY = gql`
  query AllWatches {
    watches {
      id
      brand
      name
      salePrice
      marketPrice
      images
    }
  }
`;

const ALL_APPAREL_QUERY = gql`
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

const ALL_ACCESSORIES_QUERY = gql`
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

export const ProductPage: React.FC<ProductPageProps> = ({ productId, productType, product: productProp }) => {

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
      allQuery = ALL_PERFUMES_QUERY;
      dataKey = 'perfume';
      allKey = 'perfumes';
      break;
    case 'watch':
      QUERY = WATCH_QUERY;
      allQuery = ALL_WATCHES_QUERY;
      dataKey = 'watch';
      allKey = 'watches';
      break;
    case 'apparel':
      QUERY = APPAREL_QUERY;
      allQuery = ALL_APPAREL_QUERY;
      dataKey = 'apparel';
      allKey = 'apparel';
      break;
    case 'accessories':
      QUERY = ACCESSORIES_QUERY;
      allQuery = ALL_ACCESSORIES_QUERY;
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

  // ScrollTrigger logic - moved to top to avoid conditional hooks
  useEffect(() => {
    if (!containerRef.current || !leftColRef.current || !rightColRef.current || !lastImageRef.current) return;

    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    const lastImg = lastImageRef.current;

    let cleanup: (() => void) | undefined;

    const setupScrollTriggers = async () => {
      // Check if we're on mobile - disable ScrollTrigger on mobile
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // On mobile, remove any sticky positioning and return early
        leftCol.classList.remove('leftSticky');
        rightCol.classList.remove('rightSticky');
        return () => {};
      }

      // Only proceed with ScrollTrigger on desktop
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { gsap } = await import('gsap');
      gsap.registerPlugin(ScrollTrigger);

      const product = productProp || data?.[dataKey];
      if (!product) return;

      if (product.images.length === 1) {
        // Single image: pin right column until product description comes into view, then move both together
        const rightPin = (ScrollTrigger as any).create({
          trigger: container,
          start: 'top 120px',
          end: 'bottom 200px', // End when container bottom reaches viewport
          pin: rightCol,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            rightCol?.classList.add('rightSticky');
          },
          onLeave: () => {
            rightCol?.classList.remove('rightSticky');
          },
          onEnterBack: () => {
            rightCol?.classList.add('rightSticky');
          },
          onLeaveBack: () => {
            rightCol?.classList.remove('rightSticky');
          },
        });

        // Create a trigger for when product description comes into view
        const productDescTrigger = (ScrollTrigger as any).create({
          trigger: '.product-description', // Target product description section
          start: 'top 80%', // When product description is 80% up the viewport
          end: 'bottom 20%',
          onEnter: () => {
            // When product description comes into view, unpin and let both sections scroll together
            if (rightPin) rightPin.kill();
            rightCol?.classList.remove('rightSticky');
          },
          onLeave: () => {
            // Re-pin when product description leaves view
            rightCol?.classList.add('rightSticky');
          },
        });

        return () => {
          if (rightPin) rightPin.kill();
          if (productDescTrigger) productDescTrigger.kill();
        };
      } else {
        // Original logic for multiple images
        // Pin the right column until the last image hits the top, then pin the left column
        const rightPin = (ScrollTrigger as any).create({
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
        const leftPin = (ScrollTrigger as any).create({
            trigger: lastImg,
            start: 'top 180px',
            end: () => `+=${(rightCol as HTMLElement).offsetHeight - window.innerHeight - 200}`,
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
          if (rightPin) rightPin.kill();
          if (leftPin) leftPin.kill();
        };
      }
    };

    setupScrollTriggers().then((cleanupFn) => {
      cleanup = cleanupFn;
    });
    
    return () => {
      cleanup?.();
    };
  }, [productProp, data, dataKey]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message || 'Unknown error'}</div>;

  const product = productProp || data?.[dataKey];
  if (!product) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h2>Product Not Found</h2>
        <p>The product you&apos;re looking for could not be loaded.</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Get recommendations from all products
  const allProducts = allData?.[allKey] || [];
  const recommendations = allProducts
    .filter((p: unknown) => (p as ProductData)?.id !== product.id)
    .slice(0, 6)
    .map((p: unknown) => {
      const pAny = p as ProductData;
      const name = pAny.productName || pAny.name || pAny.title || 'Unknown Product';
      
      // For watches, use the same price calculation as the listing page
      let price: number;
      if (productType === 'watch' && (pAny.salePrice || pAny.marketPrice)) {
        const priceToUse = pAny.salePrice || pAny.marketPrice;
        price = calculateWatchPrice(priceToUse);
      } else {
        price = pAny.price || pAny.salePrice || (pAny.sizePrices && pAny.sizePrices[0]?.price) || (pAny.variants && pAny.variants[0]?.price) || 0;
      }
      
      return {
        id: pAny.id,
        image: pAny.images[0] || '',
        name,
        brand: pAny.brand,
        price,
      };
    });

  // Get product link for description
  const productLink = product.productLink || product.link || product.url || '';

  const display = getDisplayFields(product);

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
              image: product.images[0] || '',
              category: product.category || productType,
              productType: productType
            }}
          />
          <button className={styles.enquireBtn} onClick={() => openPanel({
            id: product.id,
            name: display.name,
            brand: product.brand,
            image: product.images[0] || '',
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
                  image: product.images[0] || '',
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
          <ProductDescription 
            productLink={productLink}
            productName={display.name}
            brand={product.brand}
            category={productType}
          />
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

// Calculate price from AED to INR with 10% markup (for watches)
const calculateWatchPrice = (aedPrice: number | null | undefined | string) => {
  let numericPrice: number;
  
  if (typeof aedPrice === 'string') {
    // Handle string format like "AED5,800.00"
    const match = aedPrice.match(/AED([\d,]+\.?\d*)/);
    if (match) {
      // Remove commas and convert to number
      numericPrice = parseFloat(match[1].replace(/,/g, ''));
    } else {
      // Try direct parsing if no AED prefix
      numericPrice = parseFloat(aedPrice.replace(/,/g, ''));
    }
  } else {
    numericPrice = aedPrice as number;
  }
  
  if (!numericPrice || numericPrice <= 0 || isNaN(numericPrice)) return 0;
  
  // Convert AED to INR and add 10% markup
  const aedToInrRate = 24; // Current approximate rate
  const basePrice = numericPrice * aedToInrRate;
  const markup = basePrice * 0.1; // 10% markup
  return basePrice + markup;
};

function getDisplayFields(product: ProductData) {
  const name = product.productName || product.name || product.title || 'Unknown Product';
  
  // For watches, use the same price calculation as the listing page
  if (product.salePrice || product.marketPrice) {
    const priceToUse = product.salePrice || product.marketPrice;
    const calculatedPrice = calculateWatchPrice(priceToUse);
    return { name, price: calculatedPrice };
  }
  
  // For other products, use existing logic
  const price = product.price || product.salePrice || (product.sizePrices && product.sizePrices[0]?.price) || (product.variants && product.variants[0]?.price) || 0;
  return { name, price };
} 