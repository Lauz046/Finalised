import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Fetch counts from your backend
    const response = await fetch('http://localhost:8090/api/search/counts');
    
    if (!response.ok) {
      throw new Error('Failed to fetch counts');
    }
    
    const counts = await response.json();
    
    res.status(200).json(counts);
  } catch (error) {
    console.error('Error fetching product counts:', error);
    
    // Fallback counts if API fails
    res.status(200).json({
      sneakers: 0,
      apparel: 0,
      accessories: 0,
      perfumes: 0,
      watches: 0
    });
  }
} 