import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import { ProductPage } from '../../components/ProductPage/ProductPage';
import { gql } from '@apollo/client';

const WATCH_QUERY = gql`
  query Watch($id: ID!) {
    watch(id: $id) {
      id
      brand
      name
      color
      salePrice
      marketPrice
      images
      link
      sellerName
      sellerUrl
      gender
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const { id } = context.params!;
  const { data } = await apolloClient.query({
    query: WATCH_QUERY,
    variables: { id },
  });

  return {
    props: {
      product: data.watch,
      productId: id,
      productType: 'watch',
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default function WatchProductSSRPage(props: any) {
  return <ProductPage {...props} />;
} 