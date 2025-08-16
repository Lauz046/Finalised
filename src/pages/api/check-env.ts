import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const envVars = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  };

  const isConfigured = envVars.NEXTAUTH_SECRET === 'SET' && 
                      envVars.GOOGLE_CLIENT_ID === 'SET' && 
                      envVars.GOOGLE_CLIENT_SECRET === 'SET';

  res.status(200).json({
    message: 'Environment Variables Check',
    configured: isConfigured,
    environment: envVars,
    instructions: {
      step1: 'Check if all required variables are SET',
      step2: 'If any are NOT SET, add them to Vercel environment variables',
      step3: 'Make sure NEXTAUTH_URL matches your domain',
      step4: 'Ensure Google OAuth credentials are correct'
    },
    timestamp: new Date().toISOString(),
  });
} 