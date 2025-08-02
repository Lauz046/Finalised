import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    // Create a simple Apollo client for server-side use
    const { ApolloClient, InMemoryCache, HttpLink } = await import('@apollo/client');
    
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8090/query',
      fetchOptions: {
        timeout: 10000, // 10 seconds timeout
      },
    });

    const apolloClient = new ApolloClient({
      ssrMode: true,
      link: httpLink,
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          errorPolicy: 'all',
          fetchPolicy: 'network-only',
        },
      },
    });
    
    const { data } = await apolloClient.query({
      query: SNEAKER_QUERY,
      variables: { id },
      errorPolicy: 'all',
    });

    if (data?.sneaker) {
      return res.status(200).json({
        success: true,
        data: data.sneaker,
      });
    } else {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
  } catch (error: any) {
    console.error('Error fetching sneaker via REST API:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch product data',
      details: error.message,
    });
  }
} 