# Google OAuth Setup Guide

## 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API and Google OAuth2 API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback` (development)
   - `https://www.houseofplutus.com/api/auth/google/callback` (production)
   - `https://houseofplutus.com/api/auth/google/callback` (production)

## 2. Get Your Credentials

You'll receive:
- Client ID
- Client Secret

## 3. Environment Variables

Add these to your `.env.local`:
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key
```

## 4. Production Setup

For production, update the redirect URIs in Google Console to include your live domain. 