import fetch from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || 'http://localhost:8090/query';

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
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getAllProducts() {
  const now = Date.now();
  
  // Return cached data if it's still valid
  if (globalProductCache.length > 0 && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('Using cached products data');
    return globalProductCache;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds
    
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ALL_PRODUCTS_QUERY }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      throw new Error(`GraphQL request failed: ${res.status}`);
    }
    
    const { data } = await res.json();
    if (!data) return globalProductCache; // Return cached data if new request fails
    
    const products = [
      ...(data.sneakers?.map((p: unknown) => ({ ...(p as any), type: 'sneakers' })) || []),
      ...(data.apparel?.map((p: unknown) => ({ ...(p as any), type: 'apparel' })) || []),
      ...(data.accessories?.map((p: unknown) => ({ ...(p as any), type: 'accessories' })) || []),
      ...(data.perfumes?.map((p: unknown) => ({ ...(p as any), type: 'perfumes' })) || []),
      ...(data.watches?.map((p: unknown) => ({ ...(p as any), type: 'watches' })) || []),
    ];
    
    // Update cache
    globalProductCache = products;
    cacheTimestamp = now;
    console.log('Updated products cache with', products.length, 'products');
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return cached data if available, otherwise empty array
    return globalProductCache.length > 0 ? globalProductCache : [];
  }
} 