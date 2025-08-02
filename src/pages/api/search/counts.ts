import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllProducts } from '../../../utils/getAllProducts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { q } = req.query;
    
    // Get all products
    const allProducts = await getAllProducts();
    
    // If no query, return total counts
    if (!q) {
      const counts = {
        sneakers: allProducts.filter(p => p.type === 'sneakers').length,
        apparel: allProducts.filter(p => p.type === 'apparel').length,
        accessories: allProducts.filter(p => p.type === 'accessories').length,
        perfumes: allProducts.filter(p => p.type === 'perfumes').length,
        watches: allProducts.filter(p => p.type === 'watches').length,
      };
      
      return res.status(200).json(counts);
    }
    
    // If query provided, filter products and count by category
    const query = q.toString().toLowerCase();
    
    const filteredProducts = allProducts.filter(product => {
      const searchableText = [
        product.brand,
        product.productName,
        product.title,
        product.name
      ].filter(Boolean).join(' ').toLowerCase();
      
      return searchableText.includes(query);
    });
    
    const counts = {
      sneakers: filteredProducts.filter(p => p.type === 'sneakers').length,
      apparel: filteredProducts.filter(p => p.type === 'apparel').length,
      accessories: filteredProducts.filter(p => p.type === 'accessories').length,
      perfumes: filteredProducts.filter(p => p.type === 'perfumes').length,
      watches: filteredProducts.filter(p => p.type === 'watches').length,
    };
    
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