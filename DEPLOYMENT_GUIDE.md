# 🚀 Deployment Guide for Plutus E-commerce Platform

This guide will help you deploy your Plutus application to both Vercel (frontend) and Render (full-stack).

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be in the GitHub repository
2. **Database**: Set up a PostgreSQL database (Neon, Supabase, or any cloud provider)
3. **Cloudinary Account**: For image uploads (optional but recommended)

## 🎯 Option 1: Vercel Deployment (Frontend Only)

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository: `Lauz046/Finalised`
4. Select the repository and click "Import"

### Step 2: Configure Environment Variables
In the Vercel dashboard, go to Settings → Environment Variables and add:

```
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://your-backend-url.com/query
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=production
```

### Step 3: Deploy
1. Vercel will automatically detect it's a Next.js project
2. Click "Deploy"
3. Your site will be available at: `https://your-project.vercel.app`

## 🎯 Option 2: Render Deployment (Full-Stack)

### Step 1: Connect to Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository: `Lauz046/Finalised`

### Step 2: Configure Environment Variables

#### For Backend Service:
```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_strong_jwt_secret
CORS_ORIGIN=https://plutus-frontend.onrender.com
NODE_ENV=production
PORT=8090
```

#### For Frontend Service:
```
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://plutus-backend.onrender.com/query
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=production
```

### Step 3: Deploy
1. Render will use the `render.yaml` file to configure both services
2. Click "Apply" to deploy both services
3. Your services will be available at:
   - Frontend: `https://plutus-frontend.onrender.com`
   - Backend: `https://plutus-backend.onrender.com`

## 🔧 Environment Variables Setup

### Required Variables:

#### Frontend (.env.local):
```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://your-backend-url.com/query
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=production
```

#### Backend (.env):
```bash
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
JWT_SECRET=your_strong_jwt_secret_here
CORS_ORIGIN=https://your-frontend-url.com
PORT=8090
NODE_ENV=production
```

## 🛠️ Database Setup

### Option 1: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Get your connection string
4. Use it as `DATABASE_URL`

### Option 2: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your connection string from Settings → Database
4. Use it as `DATABASE_URL`

### Option 3: Render PostgreSQL
1. In Render dashboard, create a new PostgreSQL service
2. Use the provided connection string as `DATABASE_URL`

## 🔒 Security Considerations

1. **JWT Secret**: Generate a strong random string for production
2. **Database**: Use SSL connections and strong passwords
3. **CORS**: Configure allowed origins properly
4. **Environment Variables**: Never commit sensitive data to Git

## 🚨 Troubleshooting

### CORS Issues
- Ensure `CORS_ORIGIN` is set correctly in backend
- Check that frontend URL is in allowed origins
- Verify HTTPS/HTTP protocol matches

### Database Connection Issues
- Check `DATABASE_URL` format
- Ensure database is accessible from deployment platform
- Verify SSL settings

### Build Issues
- Check Node.js version compatibility
- Ensure all dependencies are in package.json
- Verify build commands in platform settings

## 📞 Support

If you encounter issues:
1. Check the deployment logs in your platform dashboard
2. Verify environment variables are set correctly
3. Test database connectivity
4. Check CORS configuration

## 🎉 Success Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and GraphQL endpoint working
- [ ] Database connected and tables created
- [ ] CORS issues resolved
- [ ] Environment variables configured
- [ ] Images and assets loading correctly
- [ ] Authentication working (if implemented)
- [ ] Search functionality working
- [ ] Product pages loading correctly

Your Plutus e-commerce platform should now be live! 🚀 