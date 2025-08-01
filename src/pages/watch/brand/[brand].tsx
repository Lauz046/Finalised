import WatchBrandProductPage from '../../../components/watch/WatchBrandProductPage';
import { gql } from '@apollo/client';

const WATCHES_QUERY = gql`
  query Watches($brand: String, $color: String, $gender: String, $sortOrder: String, $limit: Int, $offset: Int) {
    watches(brand: $brand, color: $color, gender: $gender, sortOrder: $sortOrder, limit: $limit, offset: $offset) {
      id
      brand
      name
      color
      salePrice
      marketPrice
      images
      gender
    }
  }
`;
import { GetStaticProps, GetStaticPaths } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { getBrandFromUrl } from '../../../utils/brandUtils';

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-generate paths for popular watch brands
  const popularBrands = [
    'rolex', 'omega', 'cartier', 'patek-philippe', 'audemars-piguet', 'richard-mille',
    'casio', 'seiko', 'citizen', 'timex', 'swatch', 'tag-heuer'
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
      query: WATCHES_QUERY,
      variables: { 
        brand,
        limit: 21, // First page only
        offset: 0
      },
    });
    
    return {
      props: {
        initialWatchData: data.watches || [],
        brand,
      },
      // Cache for 5 minutes
      revalidate: 300,
    };
  } catch (error) {
    console.error('Error loading brand data:', error);
    return {
      props: {
        initialWatchData: [],
        brand,
      },
      revalidate: 60, // Shorter cache on error
    };
  }
};

export default function WatchBrandPage({ brand }: { brand: string }) {
  return <WatchBrandProductPage brand={brand} />;
} 