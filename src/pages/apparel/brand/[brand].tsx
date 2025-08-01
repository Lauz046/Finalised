import ApparelBrandProductPage from '../../../components/apparel/ApparelBrandProductPage';
import { gql } from '@apollo/client';
import { GetStaticProps, GetStaticPaths } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { getBrandFromUrl } from '../../../utils/brandUtils';

const APPAREL_QUERY = gql`
  query Apparel($brand: String, $subcategory: String, $gender: String, $size: String, $sortOrder: String, $limit: Int, $offset: Int) {
    apparel(brand: $brand, subcategory: $subcategory, gender: $gender, size: $size, sortOrder: $sortOrder, limit: $limit, offset: $offset) {
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
  // Pre-generate paths for popular apparel brands
  const popularBrands = [
    'supreme', 'palace', 'off-white', 'balenciaga', 'gucci', 'louis-vuitton',
    'nike', 'adidas', 'stone-island', 'moncler', 'canada-goose', 'the-north-face'
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
      query: APPAREL_QUERY,
      variables: { 
        brand,
        limit: 21, // First page only
        offset: 0
      },
    });
    
    return {
      props: {
        initialApparelData: data.apparel || [],
        brand,
      },
      // Cache for 5 minutes
      revalidate: 300,
    };
  } catch (error) {
    console.error('Error loading brand data:', error);
    return {
      props: {
        initialApparelData: [],
        brand,
      },
      revalidate: 60, // Shorter cache on error
    };
  }
};

export default function ApparelBrandPage({ brand }: { brand: string }) {
  return <ApparelBrandProductPage brand={brand} />;
}