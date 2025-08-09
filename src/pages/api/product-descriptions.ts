import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Cache for the descriptions data
let cachedDescriptions: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cachedDescriptions && (now - cacheTimestamp) < CACHE_DURATION) {
      res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
      return res.status(200).json(cachedDescriptions);
    }

    // Load descriptions from JSON file
    const descriptionsPath = path.join(process.cwd(), 'plutus-backend/seeding/data/product_descriptions.json');
    
    if (!fs.existsSync(descriptionsPath)) {
      return res.status(404).json({ error: 'Product descriptions file not found' });
    }

    const fileContent = fs.readFileSync(descriptionsPath, 'utf8');
    const descriptions = JSON.parse(fileContent);

    // Update cache
    cachedDescriptions = descriptions;
    cacheTimestamp = now;

    // Set cache headers
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json(descriptions);
  } catch (error) {
    console.error('Error loading product descriptions:', error);
    return res.status(500).json({ error: 'Failed to load product descriptions' });
  }
} 