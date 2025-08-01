import PerfumeBrandProductPage from '../../../components/perfume/PerfumeBrandProductPage';
import { gql } from '@apollo/client';
import { GetStaticProps, GetStaticPaths } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import { getBrandFromUrl } from '../../../utils/brandUtils';

const PERFUMES_QUERY = gql`
  query Perfumes($brand: String, $fragranceFamily: String, $concentration: String, $subcategory: String, $size: String, $sortOrder: String, $limit: Int, $offset: Int) {
    perfumes(brand: $brand, fragranceFamily: $fragranceFamily, concentration: $concentration, subcategory: $subcategory, size: $size, sortOrder: $sortOrder, limit: $limit, offset: $offset) {
      id
      brand
      title
      fragranceFamily
      concentration
      subcategory
      variants { size price }
      images
      url
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-generate paths for popular perfume brands
  const popularBrands = [
    'chanel', 'dior', 'hermes', 'tom-ford', 'jo-malone', 'byredo',
    'le-labo', 'creed', 'roja-parfums', 'amouage', 'xerjoff', 'kilian'
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
      query: PERFUMES_QUERY,
      variables: { 
        brand,
        limit: 21, // First page only
        offset: 0
      },
    });
    
    return {
      props: {
        initialPerfumeData: data.perfumes || [],
        brand,
      },
      // Cache for 5 minutes
      revalidate: 300,
    };
  } catch (error) {
    console.error('Error loading brand data:', error);
    return {
      props: {
        initialPerfumeData: [],
        brand,
      },
      revalidate: 60, // Shorter cache on error
    };
  }
};

export default function PerfumeBrandPage({ brand }: { brand: string }) {
  return <PerfumeBrandProductPage brand={brand} />;
} 