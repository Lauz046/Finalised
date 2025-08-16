import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get session from server side
    const session = await getServerSession(req, res, authOptions);
    
    res.status(200).json({
      message: 'Session Test',
      hasSession: !!session,
      session: session,
      cookies: req.headers.cookie ? 'Present' : 'Not present',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Session test error:', error);
    res.status(500).json({
      message: 'Session Test Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
} 