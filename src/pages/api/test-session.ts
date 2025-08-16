import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get session from cookies
    const session = await getSession({ req });
    
    res.status(200).json({
      message: 'Session Test',
      hasSession: !!session,
      session: session,
      cookies: req.headers.cookie,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Session Test Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
} 