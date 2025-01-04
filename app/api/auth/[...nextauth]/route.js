import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import credentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/_libs/prismadb';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    credentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid Credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Please verify email through signup again');
        }

        if (user.active === false) {
          throw new Error('Please verify email through signup again');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid Credentials');
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    errors: (message) => {
      console.error('NextAuth Error', message);
    },
  },
  pages: {
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;

      return session;
    },

    async signIn({ user, account, profile }) {
      if (account.provider === 'google' || account.provider === 'github') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          const linkedAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          });

          if (!linkedAccount) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            });
          }

          return true;
        }
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
