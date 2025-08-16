import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, fullName, profileImage, provider, providerId } = req.body;

    // Validate required fields
    if (!email || !fullName || !provider) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Here you would typically:
    // 1. Check if user already exists by email
    // 2. If exists, update their OAuth provider info
    // 3. If not exists, create new user
    // 4. Return user data

    // For now, we'll simulate a successful user creation
    const user = {
      id: `oauth_${Date.now()}`,
      email,
      fullName,
      profileImage: profileImage || null,
      provider,
      providerId,
      createdAt: new Date().toISOString(),
    };

    // Store user in localStorage for demo (in production, use your database)
    if (typeof window !== 'undefined') {
      localStorage.setItem('plutus_user', JSON.stringify(user));
    }

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      user
    });

  } catch (error) {
    console.error('OAuth user creation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
} 