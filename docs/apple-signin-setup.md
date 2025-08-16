# Apple Sign-In Setup Guide

## 1. Apple Developer Account Setup

1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Create an App ID for your website
3. Enable "Sign In with Apple" capability
4. Create a Service ID for your domain
5. Configure the Service ID with your domain

## 2. Create Sign In with Apple Key

1. Go to "Keys" section
2. Create a new key with "Sign In with Apple" enabled
3. Download the .p8 file (keep it secure)
4. Note the Key ID

## 3. Environment Variables

Add these to your `.env.local`:
```
APPLE_TEAM_ID=your_team_id
APPLE_KEY_ID=your_key_id
APPLE_PRIVATE_KEY=your_private_key_content
APPLE_CLIENT_ID=your_service_id
```

## 4. Production Setup

For production, update your Service ID configuration with your live domain. 