import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, headers } = req;
  
  res.status(200).json({
    message: 'OAuth Callback Test',
    method,
    query,
    headers: {
      'user-agent': headers['user-agent'],
      'referer': headers['referer'],
      'origin': headers['origin'],
    },
    environment: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
    },
    timestamp: new Date().toISOString(),
  });
} 