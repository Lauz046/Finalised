import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);
    
    res.status(200).json({
      message: 'OAuth Success Test',
      hasSession: !!session,
      session: session,
      user: session?.user,
      timestamp: new Date().toISOString(),
      instructions: [
        'If hasSession is true, OAuth worked!',
        'Check if user object contains Google account info',
        'The session should persist across page reloads'
      ]
    });
  } catch (error) {
    console.error('OAuth success test error:', error);
    res.status(500).json({
      message: 'OAuth Success Test Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
} 