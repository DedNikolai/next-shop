import type { AuthOptions, User as AuthUser } from 'next-auth'; 
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '../../../../../prisma/prisma-client';
import { compare } from 'bcrypt';

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

        const isPasswordValid = await compare(credentials.password, user.password);
       
        if (!isPasswordValid) {
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