import AccessoriesBrandProductPage, { ACCESSORIES_QUERY } from '../../../components/accessories/AccessoriesBrandProductPage';
import { GetStaticProps, GetStaticPaths } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { getBrandFromUrl, normalizeBrandForDatabase } from '../../../utils/brandUtils';
import { ErrorBoundary } from '../../../components/ErrorBoundary';

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-generate paths for popular brands
  const popularBrands = [
    'gucci', 'prada', 'balenciaga', 'louis-vuitton', 'fendi', 'valentino',
    'saint-laurent', 'bottega-veneta', 'hermes', 'chanel'
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
    const normalizedBrand = normalizeBrandForDatabase(brand);
    
    // Only fetch first page of products to reduce data size
    const { data } = await apolloClient.query({
      query: ACCESSORIES_QUERY,
      variables: { 
        brand: normalizedBrand,
        limit: 21, // First page only
        offset: 0
      },
      errorPolicy: 'all', // Handle errors gracefully
    });
    
    return {
      props: {
        initialAccessoriesData: data?.accessories || [],
        brand: normalizedBrand,
        apolloState: apolloClient.cache.extract(),
      },
      // Cache for 5 minutes
      revalidate: 300,
    };
  } catch (error) {
    console.error('Error loading brand data:', error);
    return {
      props: {
        initialAccessoriesData: [],
        brand: context.params?.brand as string,
        apolloState: null,
      },
      revalidate: 60, // Shorter cache on error
    };
  }
};

export default function AccessoriesBrandPage({ 
  initialAccessoriesData, 
  brand, 
  apolloState 
}: { 
  initialAccessoriesData: unknown[]; 
  brand: string;
  apolloState?: unknown;
}) {
  return (
    <ErrorBoundary>
      <AccessoriesBrandProductPage 
        brand={brand} 
        initialAccessoriesData={initialAccessoriesData}
        apolloState={apolloState}
      />
    </ErrorBoundary>
  );
} 