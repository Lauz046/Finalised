import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [envVar, setEnvVar] = useState<string>('');
  const [backendTest, setBackendTest] = useState<string>('');

  useEffect(() => {
    // Check environment variable
    setEnvVar(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'NOT SET');
    
    // Test backend connection
    fetch('https://finalised-a77d.onrender.com/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ sneakers(limit: 1) { id brand productName } }'
      })
    })
    .then(res => res.json())
    .then(data => setBackendTest(JSON.stringify(data, null, 2)))
    .catch(err => setBackendTest('Error: ' + err.message));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Debug Information</h1>
      
      <h2>Environment Variable:</h2>
      <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
        NEXT_PUBLIC_GRAPHQL_ENDPOINT = {envVar}
      </pre>
      
      <h2>Backend Test Result:</h2>
      <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px', maxHeight: '400px', overflow: 'auto' }}>
        {backendTest}
      </pre>
    </div>
  );
} 