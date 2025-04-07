import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role: 'USER' | 'ADMIN';
      name: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: 'USER' | 'ADMIN';
  }

  interface JWT {
    id: string;
    role: 'USER' | 'ADMIN';
    name: string;
  }
}
