import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import { ProductPage } from '../../components/ProductPage/ProductPage';
import { gql } from '@apollo/client';

const PERFUME_QUERY = gql`
  query Perfume($id: ID!) {
    perfume(id: $id) {
      id
      brand
      title
      fragranceFamily
      concentration
      subcategory
      variants { size price }
      images
      url
      sellerName
      sellerUrl
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const { id } = context.params!;
  const { data } = await apolloClient.query({
    query: PERFUME_QUERY,
    variables: { id },
  });

  return {
    props: {
      product: data.perfume,
      productId: id,
      productType: 'perfume',
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default function PerfumeProductSSRPage(props: any) {
  return <ProductPage {...props} />;
} 