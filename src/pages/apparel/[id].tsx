import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import { ProductPage } from '../../components/ProductPage/ProductPage';
import { gql } from '@apollo/client';

const APPAREL_QUERY = gql`
  query ApparelItem($id: ID!) {
    apparelItem(id: $id) {
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
    query: APPAREL_QUERY,
    variables: { id },
  });

  return {
    props: {
      product: data.apparelItem,
      productId: id,
      productType: 'apparel',
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default function ApparelProductSSRPage(props: any) {
  return <ProductPage {...props} />;
} 