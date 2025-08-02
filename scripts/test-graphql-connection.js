const fetch = require('node-fetch');

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || 'http://localhost:8090/query';

const TEST_QUERY = `
  query TestConnection {
    sneakers { id brand productName }
  }
`;

async function testGraphQLConnection() {
  console.log('🔍 Testing GraphQL server connection...');
  console.log(`📍 Endpoint: ${GRAPHQL_ENDPOINT}`);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second test
    
    const startTime = Date.now();
    
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: TEST_QUERY }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    if (!res.ok) {
      console.log('❌ GraphQL server responded with error:', res.status, res.statusText);
      return false;
    }
    
    const data = await res.json();
    
    if (data.errors) {
      console.log('❌ GraphQL server returned errors:', data.errors);
      return false;
    }
    
    console.log('✅ GraphQL server is working!');
    console.log(`⏱️ Response time: ${responseTime}ms`);
    console.log(`📊 Sneakers count: ${data.data?.sneakers?.length || 0}`);
    
    return true;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('⏰ GraphQL server timeout (10s) - server may be slow or unavailable');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('🔌 GraphQL server connection refused - server may not be running');
    } else {
      console.log('❌ GraphQL server error:', error.message);
    }
    return false;
  }
}

// Run the test
testGraphQLConnection().then(isWorking => {
  if (isWorking) {
    console.log('\n🎉 GraphQL server is ready for production!');
  } else {
    console.log('\n⚠️ GraphQL server needs attention, but cached data will work fine');
  }
  process.exit(isWorking ? 0 : 1);
}); 