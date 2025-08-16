import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

// Export auth options for use in other API routes
export const authOptions: NextAuthOptions = {
  debug: true, // Enable debugging
  logger: {
    error(code, ...message) {
      console.error('NextAuth Error:', code, ...message);
    },
    warn(code, ...message) {
      console.warn('NextAuth Warning:', code, ...message);
    },
    debug(code, ...message) {
      console.log('NextAuth Debug:', code, ...message);
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // For now, return a mock user for testing
        // You can implement your own login logic here
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          return {
            id: '1',
            email: credentials.email,
            name: 'Test User',
            image: null,
          };
        }
        
        return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      console.log('JWT Callback:', { token: !!token, user: !!user, account: !!account });
      
      if (account && user) {
        // Handle OAuth login
        if (account.provider === 'google') {
          console.log('Google OAuth login detected');
          console.log('Google user data:', user);
          console.log('Google account data:', account);
          
          // Use the actual Google user data
          token.userId = user.email;
          token.user = {
            id: user.email,
            email: user.email,
            name: user.name,
            image: user.image,
          };
          
          console.log('User token created:', token.user);
        }
      }
      
      // If we already have user data in token, return it
      if (token.user) {
        return token;
      }
      
      return token;
    },
    async session({ session, token }: any) {
      console.log('Session Callback:', { session: !!session, token: !!token });
      
      if (token.user) {
        session.user = token.user;
        console.log('Session user set:', session.user);
      }
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      // Handle redirect after successful authentication
      console.log('Redirect Callback:', { url, baseUrl });
      
      // If the URL is relative, make it absolute
      if (url.startsWith('/')) {
        const finalUrl = `${baseUrl}${url}`;
        console.log('Final redirect URL:', finalUrl);
        return finalUrl;
      }
      
      // If the URL is on the same origin, allow it
      if (url.startsWith(baseUrl)) {
        console.log('Same origin redirect:', url);
        return url;
      }
      
      // For OAuth callbacks, always redirect to home page
      if (url.includes('/api/auth/callback/')) {
        console.log('OAuth callback detected, redirecting to home');
        return baseUrl;
      }
      
      // Default redirect to home page
      console.log('Default redirect to:', baseUrl);
      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log('SignIn Callback:', { 
        user: !!user, 
        account: !!account, 
        profile: !!profile, 
        email: !!email, 
        credentials: !!credentials 
      });
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin', // Redirect errors back to signin
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export the handler directly
export default NextAuth(authOptions); 