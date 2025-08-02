const fetch = require('node-fetch');

async function testSneakerEndpoint() {
  const testId = '3404'; // Use a known sneaker ID
  
  console.log('🧪 Testing sneaker endpoint...');
  
  try {
    // Test GraphQL endpoint
    console.log('📡 Testing GraphQL endpoint...');
    const graphqlResponse = await fetch('http://localhost:8090/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
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
        `,
        variables: { id: testId }
      })
    });
    
    const graphqlData = await graphqlResponse.json();
    
    if (graphqlData.errors) {
      console.error('❌ GraphQL errors:', graphqlData.errors);
    } else {
      console.log('✅ GraphQL success:', graphqlData.data?.sneaker?.brand);
    }
    
    // Test REST API endpoint
    console.log('🌐 Testing REST API endpoint...');
    const restResponse = await fetch(`http://localhost:3000/api/sneaker/${testId}`);
    const restData = await restResponse.json();
    
    if (restResponse.ok) {
      console.log('✅ REST API success:', restData.data?.brand);
    } else {
      console.error('❌ REST API error:', restData.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testSneakerEndpoint(); 