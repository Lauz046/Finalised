import SneakerBrandProductPage, { SNEAKERS_QUERY } from '../../../components/sneaker/SneakerBrandProductPage';
import { GetStaticProps, GetStaticPaths } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { getBrandFromUrl, normalizeBrandForDatabase } from '../../../utils/brandUtils';
import { ErrorBoundary } from '../../../components/ErrorBoundary';

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-generate paths for popular brands
  const popularBrands = [
    'nike', 'adidas', 'jordan', 'yeezy', 'balenciaga', 'gucci', 'louis-vuitton',
    'air-jordan', 'new-balance', 'converse', 'vans', 'puma', 'reebok'
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
      query: SNEAKERS_QUERY,
      variables: { 
        brand: normalizedBrand,
        limit: 21, // First page only
        offset: 0
      },
      errorPolicy: 'all', // Handle errors gracefully
    });
    
    return {
      props: {
        initialSneakerData: data?.sneakers || [],
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
        initialSneakerData: [],
        brand: context.params?.brand as string,
        apolloState: null,
      },
      revalidate: 60, // Shorter cache on error
    };
  }
};

export default function SneakerBrandPage({ 
  initialSneakerData, 
  brand, 
  apolloState 
}: { 
  initialSneakerData: unknown[]; 
  brand: string;
  apolloState?: unknown;
}) {
  return (
    <ErrorBoundary>
      <SneakerBrandProductPage 
        brand={brand} 
        initialSneakerData={initialSneakerData}
        apolloState={apolloState}
      />
    </ErrorBoundary>
  );
}