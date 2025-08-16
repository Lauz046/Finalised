import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
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
    async jwt({ token, user, account }) {
      if (account && user) {
        // Handle OAuth login
        if (account.provider === 'google') {
          // Create or update user in your database
          const userData = {
            email: user.email,
            fullName: user.name,
            profileImage: user.image,
            provider: 'google',
            providerId: account.providerAccountId,
          };

          // For now, create a simple user object
          // You can implement your own user creation logic here
          token.userId = user.email;
          token.user = {
            id: user.email,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}); 