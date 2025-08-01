import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import { ProductPage } from '../../components/ProductPage/ProductPage';
import { gql } from '@apollo/client';

const ACCESSORY_QUERY = gql`
  query Accessory($id: ID!) {
    accessory(id: $id) {
      id
      brand
      productName
      subcategory
      gender
      sizePrices { size price }
      images
      inStock
      productLink
      sellerName
      sellerUrl
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const { id } = context.params!;
  const { data } = await apolloClient.query({
    query: ACCESSORY_QUERY,
    variables: { id },
  });

  return {
    props: {
      product: data.accessory,
      productId: id,
      productType: 'accessories',
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default function AccessoriesProductSSRPage(props: any) {
  return <ProductPage {...props} />;
} 