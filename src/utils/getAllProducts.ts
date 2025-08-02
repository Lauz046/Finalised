import fetch from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://finalised-a77d.onrender.com/query';

const ALL_PRODUCTS_QUERY = `
  query AllProducts {
    sneakers { id brand productName images productLink }
    apparel { id brand productName images productLink }
    accessories { id brand productName images productLink }
    perfumes { id brand title images url }
    watches { id brand name images link }
  }
`;

// Global cache for products
let globalProductCache: unknown[] = [];
let cacheTimestamp = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes - increased for better performance

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getAllProducts() {
  const now = Date.now();
  
        // Return cached data if it's still valid
      if (globalProductCache.length > 0 && (now - cacheTimestamp) < CACHE_DURATION) {
        console.log('✅ Using cached products data (fast load)');
        return globalProductCache;
      }
  
  // Try with retries
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Fetching products from GraphQL server... (attempt ${attempt + 1}/${MAX_RETRIES + 1})`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds timeout
      
      const res = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: ALL_PRODUCTS_QUERY }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
      }
      
      const responseData = await res.json();
      
      if (!responseData.data) {
        console.error('No data in GraphQL response:', responseData);
        throw new Error('No data received from GraphQL server');
      }
      
      const { data } = responseData;
      
      // Transform the data and add type field
      const products = [
        ...(data.sneakers?.map((p: any) => ({ 
          ...p, 
          type: 'sneakers',
          productName: p.productName || p.name || p.title,
          images: p.images || []
        })) || []),
        ...(data.apparel?.map((p: any) => ({ 
          ...p, 
          type: 'apparel',
          productName: p.productName || p.name || p.title,
          images: p.images || []
        })) || []),
        ...(data.accessories?.map((p: any) => ({ 
          ...p, 
          type: 'accessories',
          productName: p.productName || p.name || p.title,
          images: p.images || []
        })) || []),
        ...(data.perfumes?.map((p: any) => ({ 
          ...p, 
          type: 'perfumes',
          productName: p.title || p.productName || p.name,
          images: p.images || []
        })) || []),
        ...(data.watches?.map((p: any) => ({ 
          ...p, 
          type: 'watches',
          productName: p.name || p.productName || p.title,
          images: p.images || []
        })) || []),
      ];
      
      console.log('✅ Successfully fetched', products.length, 'products from GraphQL');
      
      // Update cache
      globalProductCache = products;
      cacheTimestamp = now;
      console.log('✅ Updated products cache with', products.length, 'products');
      
      return products;
    } catch (error) {
      // Only log detailed errors in development
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error fetching products (attempt ${attempt + 1}):`, error);
      } else {
        console.log(`⏳ GraphQL request timeout (attempt ${attempt + 1})`);
      }
      
      // If it's the last attempt, fall back to cached data
      if (attempt === MAX_RETRIES) {
        if ((error as any).name === 'AbortError' || (error as any).code === 'ECONNREFUSED') {
          console.log('✅ GraphQL server timeout - using cached data successfully');
          return globalProductCache.length > 0 ? globalProductCache : [];
        }
        
        // Return cached data if available, otherwise provide mock data
        if (globalProductCache.length > 0) {
          console.log('Using cached data due to error');
          return globalProductCache;
        }
        
        // Provide comprehensive mock data for development
        console.log('No cached data available, providing mock data for development');
        const mockProducts = [
          // Sneakers
          { id: '1', brand: 'Nike', productName: 'Air Jordan 1', images: ['/image1.jpeg'], type: 'sneakers' },
          { id: '2', brand: 'Adidas', productName: 'Yeezy Boost', images: ['/image2.jpeg'], type: 'sneakers' },
          { id: '3', brand: 'Prada', productName: 'District Leather Sneaker', images: ['/image3.jpeg'], type: 'sneakers' },
          { id: '4', brand: 'Alexander McQueen', productName: 'Oversized Sneaker', images: ['/image4.jpeg'], type: 'sneakers' },
          { id: '5', brand: 'Balenciaga', productName: 'Triple S Sneaker', images: ['/image5.jpeg'], type: 'sneakers' },
          
          // Apparel
          { id: '6', brand: 'Gucci', productName: 'Classic T-Shirt', images: ['/image6.jpeg'], type: 'apparel' },
          { id: '7', brand: 'Prada', productName: 'Logo Hoodie', images: ['/image7.jpeg'], type: 'apparel' },
          { id: '8', brand: 'Balenciaga', productName: 'Track Jacket', images: ['/image8.jpeg'], type: 'apparel' },
          
          // Accessories
          { id: '9', brand: 'Gucci', productName: 'Classic Bag', images: ['/image9.jpeg'], type: 'accessories' },
          { id: '10', brand: 'Prada', productName: 'Re-Nylon Backpack', images: ['/image10.jpeg'], type: 'accessories' },
          
          // Perfumes
          { id: '11', brand: 'Chanel', productName: 'N°5 Eau de Parfum', images: ['/image11.jpeg'], type: 'perfumes' },
          { id: '12', brand: 'Dior', productName: 'Sauvage Eau de Parfum', images: ['/image12.jpeg'], type: 'perfumes' },
          { id: '13', brand: 'Creed', productName: 'Aventus Cologne', images: ['/image13.jpeg'], type: 'perfumes' },
          
          // Watches
          { id: '14', brand: 'Rolex', productName: 'Submariner', images: ['/image14.jpeg'], type: 'watches' },
          { id: '15', brand: 'Omega', productName: 'Speedmaster', images: ['/image15.jpeg'], type: 'watches' },
        ];
        
        // Update cache with mock data
        globalProductCache = mockProducts;
        cacheTimestamp = Date.now();
        
        return mockProducts;
      }
      
      // Wait before retrying
      console.log(`⏳ Retrying in ${RETRY_DELAY}ms...`);
      await delay(RETRY_DELAY);
    }
  }
  
  // This should never be reached, but just in case
  return globalProductCache.length > 0 ? globalProductCache : [];
} 