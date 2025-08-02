import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import { ProductPage } from '../../components/ProductPage/ProductPage';
import { gql } from '@apollo/client';

const SNEAKER_QUERY = gql`
  query Sneaker($id: ID!) {
    sneaker(id: $id) {
      id
      brand
      productName
      sizePrices { size price }
      images
      soldOut
      sellerName
      sellerUrl
      productLink
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apolloClient = initializeApollo();
    const { id } = context.params!;
    
    const { data } = await apolloClient.query({
      query: SNEAKER_QUERY,
      variables: { id },
      errorPolicy: 'all',
    });

    return {
      props: {
        product: data.sneaker, // Changed from 'sneaker' to 'product'
        productId: id,
        productType: 'sneaker',
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  } catch (error) {
    console.error('Error fetching sneaker data:', error);
    
    // Return fallback props to prevent complete page failure
    return {
      props: {
        product: null, // Changed from 'sneaker' to 'product'
        productId: context.params?.id || '',
        productType: 'sneaker',
        initialApolloState: {},
        error: 'Failed to load product data',
      },
    };
  }
};

export default function SneakerProductSSRPage(props: any) {
  return <ProductPage {...props} />;
} 