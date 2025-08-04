import ApparelBrandProductPage, { APPAREL_QUERY } from '../../../components/apparel/ApparelBrandProductPage';
import { GetStaticProps, GetStaticPaths } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { getBrandFromUrl, normalizeBrandForDatabase } from '../../../utils/brandUtils';
import { ErrorBoundary } from '../../../components/ErrorBoundary';

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-generate paths for popular brands
  const popularBrands = [
    'gucci', 'prada', 'balenciaga', 'louis-vuitton', 'fendi', 'valentino',
    'saint-laurent', 'bottega-veneta', 'stone-island', 'canada-goose'
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
      query: APPAREL_QUERY,
      variables: { 
        brand: brand,
        limit: 21, // First page only
        offset: 0
      },
      errorPolicy: 'all', // Handle errors gracefully
    });
    
    return {
      props: {
        initialApparelData: data?.apparel || [],
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
        initialApparelData: [],
        brand: context.params?.brand as string,
        apolloState: null,
      },
      revalidate: 60, // Shorter cache on error
    };
  }
};

export default function ApparelBrandPage({ 
  initialApparelData, 
  brand, 
  apolloState 
}: { 
  initialApparelData: unknown[]; 
  brand: string;
  apolloState?: unknown;
}) {
  return (
    <ErrorBoundary>
      <ApparelBrandProductPage 
        brand={brand} 
        initialApparelData={initialApparelData}
        apolloState={apolloState}
      />
    </ErrorBoundary>
  );
}