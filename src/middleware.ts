// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // 🔐 Захист для /profile та /profile/*
  if (pathname.startsWith('/profile')) {
    if (!token || token.role !== 'USER') {
      const url = new URL('/not-auth', request.url);
      return NextResponse.redirect(url);
    }
  }

  // 🔐 Захист для /dashboard/*
  if (pathname.startsWith('/dashboard')) {
    if (!token || token.role !== 'ADMIN') {
      const url = new URL('/not-auth', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // Пропускаємо далі, якщо все ок
}


export const config = {
    matcher: ['/profile/:path*', '/dashboard/:path*'],
  };
  