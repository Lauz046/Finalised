import SneakerBrandProductPage, { SNEAKERS_QUERY } from '../../../components/sneaker/SneakerBrandProductPage';
import { GetStaticProps, GetStaticPaths } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { getBrandFromUrl } from '../../../utils/brandUtils';

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
  const apolloClient = initializeApollo();
  const brandUrl = context.params?.brand as string;
  const brand = getBrandFromUrl(brandUrl);
  
  try {
    // Only fetch first page of products to reduce data size
    const { data } = await apolloClient.query({
      query: SNEAKERS_QUERY,
      variables: { 
        brand,
        limit: 21, // First page only
        offset: 0
      },
    });
    
    return {
      props: {
        initialSneakerData: data.sneakers || [],
        brand,
      },
      // Cache for 5 minutes
      revalidate: 300,
    };
  } catch (error) {
    console.error('Error loading brand data:', error);
    return {
      props: {
        initialSneakerData: [],
        brand,
      },
      revalidate: 60, // Shorter cache on error
    };
  }
};

export default function SneakerBrandPage({ initialSneakerData, brand }: { initialSneakerData: any[]; brand: string }) {
  return <SneakerBrandProductPage brand={brand} initialSneakerData={initialSneakerData} />;
}