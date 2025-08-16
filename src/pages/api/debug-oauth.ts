import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const envVars = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  };

  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const isGoogleConfigured = googleClientId && googleClientId !== 'your_google_client_id_here';

  res.status(200).json({
    message: 'OAuth Debug Information',
    timestamp: new Date().toISOString(),
    environment: envVars,
    googleConfigured: isGoogleConfigured,
    expectedRedirectUris: [
      'https://www.houseofplutus.com/api/auth/callback/google',
      'https://houseofplutus.com/api/auth/callback/google',
      'https://www.houseofplutus.in/api/auth/callback/google',
      'https://houseofplutus.in/api/auth/callback/google'
    ],
    instructions: {
      step1: 'Check if googleConfigured is true',
      step2: 'Verify all environment variables are SET',
      step3: 'Make sure Google Cloud Console has the exact redirect URIs listed above',
      step4: 'Remove any Render URLs from Google Cloud Console'
    }
  });
} 