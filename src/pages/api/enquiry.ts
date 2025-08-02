import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, productId, productName, productCategory } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email and message are required' 
      });
    }

    // Forward request to Go backend
    const backendUrl = process.env.BACKEND_URL || 'https://finalised-a77d.onrender.com';
    const response = await fetch(`${backendUrl}/api/enquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
        productId,
        productName,
        productCategory
      }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Enquiry error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to submit enquiry. Please try again.' 
    });
  }
} 