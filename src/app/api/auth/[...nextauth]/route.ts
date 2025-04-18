import type { AuthOptions, User as AuthUser } from 'next-auth'; 
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '../../../../../prisma/prisma-client';

export const authOptions: AuthOptions  = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials): Promise<AuthUser | null>  {

        if (!credentials) {
            return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
            return null;
        }

        if (credentials.password !== user.password) {
          return null;
        }
        
        const {password, fullName, id, ...userData} = user;
        return {...userData, name: fullName, id: id.toString()} as AuthUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
  session: {
    strategy: 'jwt',
  },
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/', // поки що головна сторінка
//   },

callbacks: {
  async jwt({ token, user }) {
    // Якщо користувач щойно залогінився
    if (user) {
      token.id = user.id;
      token.role = user.role;
    }
    return token;
  },

  async session({ session, token }) {
    if (session?.user) {
      session.user.id = token.id as string;
      session.user.role = token.role as 'USER' | 'ADMIN';
    }
    return session;
  },
},

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };