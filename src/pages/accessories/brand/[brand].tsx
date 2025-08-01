import AccessoriesBrandProductPage from '../../../components/accessories/AccessoriesBrandProductPage';
import { gql } from '@apollo/client';
import { GetStaticProps, GetStaticPaths } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { getBrandFromUrl } from '../../../utils/brandUtils';

const ACCESSORIES_QUERY = gql`
  query Accessories($brand: String, $subcategory: String, $gender: String, $size: String, $sortOrder: String, $limit: Int, $offset: Int) {
    accessories(brand: $brand, subcategory: $subcategory, gender: $gender, size: $size, sortOrder: $sortOrder, limit: $limit, offset: $offset) {
      id
      brand
      productName
      subcategory
      gender
      sizePrices { size price }
      images
      productLink
      inStock
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-generate paths for popular accessories brands
  const popularBrands = [
    'louis-vuitton', 'gucci', 'hermes', 'chanel', 'prada', 'fendi',
    'goyard', 'moynat', 'delvaux', 'valextra', 'bottega-veneta', 'saint-laurent'
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
      query: ACCESSORIES_QUERY,
      variables: { 
        brand,
        limit: 21, // First page only
        offset: 0
      },
    });
    
    return {
      props: {
        initialAccessoriesData: data.accessories || [],
        brand,
      },
      // Cache for 5 minutes
      revalidate: 300,
    };
  } catch (error) {
    console.error('Error loading brand data:', error);
    return {
      props: {
        initialAccessoriesData: [],
        brand,
      },
      revalidate: 60, // Shorter cache on error
    };
  }
};

export default function AccessoriesBrandPage({ brand }: { brand: string }) {
  return <AccessoriesBrandProductPage brand={brand} />;
} 