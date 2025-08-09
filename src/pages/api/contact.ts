import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email and message are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    // Forward request to Go backend enquiry endpoint
    const backendUrl = process.env.BACKEND_URL || 'https://finalised-a77d.onrender.com';
    const response = await fetch(`${backendUrl}/api/enquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        // For contact form submissions, we don't have product info
        phone: '',
        productId: '',
        productName: '',
        productCategory: 'contact_form'
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return res.status(200).json({
        success: true,
        message: 'Your question has been registered! We will get back to you soon.'
      });
    } else {
      return res.status(response.status).json(data);
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to submit your message. Please try again.' 
    });
  }
}