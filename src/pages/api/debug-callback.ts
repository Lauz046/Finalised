import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, headers, url } = req;
  
  console.log('=== OAUTH CALLBACK DEBUG ===');
  console.log('Method:', method);
  console.log('URL:', url);
  console.log('Query:', query);
  console.log('Headers:', {
    'user-agent': headers['user-agent'],
    'referer': headers['referer'],
    'origin': headers['origin'],
    'cookie': headers['cookie'] ? 'Present' : 'Not present',
  });
  
  res.status(200).json({
    message: 'OAuth Callback Debug',
    method,
    query,
    headers: {
      'user-agent': headers['user-agent'],
      'referer': headers['referer'],
      'origin': headers['origin'],
      'cookie': headers['cookie'] ? 'Present' : 'Not present',
    },
    timestamp: new Date().toISOString(),
  });
} 