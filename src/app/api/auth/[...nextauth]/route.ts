import { SERVER_API } from '@/app/constants/app';
import { User } from '@/app/types/user';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {

        if (!credentials) {
            return null;
        }

        const data = await fetch(`${SERVER_API}/user?email=${credentials?.email}`);
        const users: User [] = await data.json();
        const user = users[0];

        if (!user) {
            return null;
        }

        if (credentials.password !== user.password) {
          return null;
        }
        
        const {password, ...userData} = user;
        return userData;
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
});

export { handler as GET, handler as POST };