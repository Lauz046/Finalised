import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    message: 'OAuth Test Endpoint',
    environment: {
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      googleClientId: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET'
    }
  });
} 