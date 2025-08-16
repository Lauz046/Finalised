import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const envVars = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET',
  };

  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const isGoogleConfigured = googleClientId && googleClientId !== 'your_google_client_id_here';

  res.status(200).json({
    message: 'Google OAuth Test',
    timestamp: new Date().toISOString(),
    environment: envVars,
    googleConfigured: isGoogleConfigured,
    testSteps: [
      '1. Check if googleConfigured is true',
      '2. Verify all environment variables are SET',
      '3. Try clicking Google login button',
      '4. Check browser console for logs',
      '5. Check network tab for OAuth requests'
    ],
    expectedFlow: [
      'Click Google button → Google OAuth page → Callback → Session created → Redirect to home'
    ]
  });
} 