import PerfumeBrandProductPage, { PERFUMES_QUERY } from '../../../components/perfume/PerfumeBrandProductPage';
import { GetStaticProps, GetStaticPaths } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { getBrandFromUrl, normalizeBrandForDatabase } from '../../../utils/brandUtils';
import { ErrorBoundary } from '../../../components/ErrorBoundary';

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-generate paths for popular brands
  const popularBrands = [
    'chanel', 'dior', 'tom-ford', 'jo-malone', 'le-labo', 'creed',
    'roja-parfums', 'byredo', 'diptyque', 'atelier-cologne'
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
      query: PERFUMES_QUERY,
      variables: { 
        brand: brand,
        limit: 24, // First page only
        offset: 0
      },
      errorPolicy: 'all', // Handle errors gracefully
    });
    
    return {
      props: {
        initialPerfumeData: data?.perfumes || [],
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
        initialPerfumeData: [],
        brand: context.params?.brand as string,
        apolloState: null,
      },
      revalidate: 60, // Shorter cache on error
    };
  }
};

export default function PerfumeBrandPage({ 
  initialPerfumeData, 
  brand, 
  apolloState 
}: { 
  initialPerfumeData: unknown[]; 
  brand: string;
  apolloState?: unknown;
}) {
  return (
    <ErrorBoundary>
      <PerfumeBrandProductPage 
        brand={brand} 
        initialPerfumeData={initialPerfumeData}
        apolloState={apolloState}
      />
    </ErrorBoundary>
  );
} 