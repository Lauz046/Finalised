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

        try {
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (data.success) {
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.fullName,
              image: data.user.profileImage,
            };
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
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

          // Call your API to create/update user
          try {
            const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/oauth-user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (data.success) {
              token.userId = data.user.id;
              token.user = data.user;
            }
          } catch (error) {
            console.error('OAuth user creation error:', error);
          }
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