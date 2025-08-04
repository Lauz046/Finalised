import WatchBrandProductPage, { WATCHES_QUERY } from '../../../components/watch/WatchBrandProductPage';
import { GetStaticProps, GetStaticPaths } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { getBrandFromUrl, normalizeBrandForDatabase } from '../../../utils/brandUtils';
import { ErrorBoundary } from '../../../components/ErrorBoundary';

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-generate paths for popular brands
  const popularBrands = [
    'rolex', 'omega', 'patek-philippe', 'audemars-piguet', 'richard-mille',
    'tag-heuer', 'cartier', 'breitling', 'hublot', 'panerai'
  ];

  const paths = popularBrands.map((brand) => ({
    params: { brand },
  }));

  return {
    paths,
    fallback: 'blocking', // Generate other brands on-demand
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const apolloClient = initializeApollo();
    const brandUrl = context.params?.brand as string;
    const brand = getBrandFromUrl(brandUrl);
    
    // Only fetch first page of products to reduce data size
    const { data } = await apolloClient.query({
      query: WATCHES_QUERY,
      variables: { 
        brand: brand, // Use exact brand name from database mapping
        limit: 21, // First page only
        offset: 0
      },
      errorPolicy: 'all', // Handle errors gracefully
    });
    
    return {
      props: {
        initialWatchData: data?.watches || [],
        brand: brand,
        apolloState: apolloClient.cache.extract(),
      },
      // Cache for 5 minutes
      revalidate: 300,
    };
  } catch (error) {
    console.error('Error loading brand data:', error);
    return {
      props: {
        initialWatchData: [],
        brand: context.params?.brand as string,
        apolloState: null,
      },
      revalidate: 60, // Shorter cache on error
    };
  }
};

export default function WatchBrandPage({ 
  initialWatchData, 
  brand, 
  apolloState 
}: { 
  initialWatchData: unknown[]; 
  brand: string;
  apolloState?: unknown;
}) {
  return (
    <ErrorBoundary>
      <WatchBrandProductPage 
        brand={brand} 
        initialWatchData={initialWatchData}
        apolloState={apolloState}
      />
    </ErrorBoundary>
  );
} 