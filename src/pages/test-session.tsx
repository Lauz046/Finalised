import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function TestSession() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('=== SESSION TEST ===');
    console.log('Status:', status);
    console.log('Session:', session);
    console.log('User:', session?.user);
  }, [session, status]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Session Test Page</h1>
      <div style={{ marginBottom: '20px' }}>
        <strong>Status:</strong> {status}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <strong>Has Session:</strong> {session ? 'Yes' : 'No'}
      </div>
      {session && (
        <div style={{ marginBottom: '20px' }}>
          <strong>User:</strong>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(session.user, null, 2)}
          </pre>
        </div>
      )}
      <div style={{ marginBottom: '20px' }}>
        <strong>Full Session:</strong>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', fontSize: '12px' }}>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <div style={{ marginTop: '20px' }}>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go back to home
        </a>
      </div>
    </div>
  );
} 