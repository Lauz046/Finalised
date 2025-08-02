import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { useMemo } from 'react';
import { RetryLink } from '@apollo/client/link/retry';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      
      // For database connection errors, log but don't throw
      if (message.includes('prepared statement') || message.includes('connection')) {
        console.log('Database connection error detected, will retry automatically...');
        
        // Force a fresh connection by clearing the cache for this operation
        if (apolloClient) {
          apolloClient.cache.evict({ fieldName: path?.[0] as string });
          apolloClient.cache.gc();
        }
      }
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8090/query',
    credentials: 'same-origin',
    fetchOptions: {
      timeout: 30000, // 30 seconds timeout
    },
    // Remove problematic headers that cause fetch errors
  });

  // Retry link for better error handling
  const retryLink = new RetryLink({
    delay: {
      initial: 500,
      max: 5000,
      jitter: true
    },
    attempts: {
      max: 3,
      retryIf: (error, _operation) => {
        // Retry on network errors and specific database errors
        return !!error && (
          error.networkError !== null ||
          (error.graphQLErrors && error.graphQLErrors.some((e: any) => 
            e.message.includes('prepared statement') || 
            e.message.includes('connection') ||
            e.message.includes('pq:')
          ))
        );
      }
    }
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, retryLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            sneakers: {
              merge: false, // Disable automatic merging for better performance
            },
            sneaker: {
              merge: false, // Disable merging for individual sneaker queries
            },
            apparel: {
              merge: false,
            },
            accessories: {
              merge: false,
            },
            perfumes: {
              merge: false,
            },
            watches: {
              merge: false,
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
      },
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-first',
      },
    },
    // Add connection pooling settings
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
}

export function initializeApollo(initialState: unknown = null) {
  const client = apolloClient ?? createApolloClient();
  
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    try {
      // Get existing cache, loaded during client side data fetching
      const existingCache = client.extract();
      // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
      const data = initialState as NormalizedCacheObject;
      // Restore the cache with the data passed from getStaticProps/getServerSideProps
      // combined with the existing cached data
      client.cache.restore({ ...existingCache, ...data });
    } catch (error) {
      console.error('Error restoring Apollo cache:', error);
    }
  }
  
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return client;
  
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = client;
  
  return client;
}

export function useApollo(initialState: unknown) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}

// Function to reset Apollo cache when needed
export function resetApolloCache() {
  if (apolloClient) {
    try {
      apolloClient.clearStore();
      apolloClient.resetStore();
      console.log('Apollo cache reset successfully');
    } catch (error) {
      console.error('Error resetting Apollo cache:', error);
    }
  }
}

// Function to completely reset Apollo client
export function resetApolloClient() {
  if (apolloClient) {
    try {
      apolloClient.clearStore();
      apolloClient.resetStore();
      apolloClient.stop();
      apolloClient = null;
      console.log('Apollo client reset successfully');
    } catch (error) {
      console.error('Error resetting Apollo client:', error);
    }
  }
}

// Function to force refresh the current page
export function forceRefresh() {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}

// Development utility - expose to window for debugging
if (typeof window !== 'undefined') {
  (window as any).resetApolloCache = resetApolloCache;
  (window as any).resetApolloClient = resetApolloClient;
  (window as any).forceRefresh = forceRefresh;
  (window as any).testBackend = () => {
    fetch('http://localhost:8090/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: '{ sneaker(id: "3404") { id brand productName } }'
      })
    })
    .then(res => res.json())
    .then(data => console.log('Backend test result:', data))
    .catch(err => console.error('Backend test error:', err));
  };
} 