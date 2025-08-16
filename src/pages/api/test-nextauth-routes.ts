import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    message: 'NextAuth Routes Test',
    availableRoutes: [
      '/api/auth/session',
      '/api/auth/signin',
      '/api/auth/signout',
      '/api/auth/csrf',
      '/api/auth/providers',
      '/api/auth/callback/google',
    ],
    testInstructions: [
      '1. Try accessing /api/auth/session directly',
      '2. Check if it returns JSON instead of HTML',
      '3. Verify NextAuth routes are working',
    ],
    currentTime: new Date().toISOString(),
  });
} 