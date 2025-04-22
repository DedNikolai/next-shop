// src/pages/api/auth/register.ts (або app/api/auth/register/route.ts для App Router)
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Заповніть всі поля' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return NextResponse.json({ message: 'Користувач вже існує' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName: name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return NextResponse.json({ message: 'Успішна реєстрація' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Помилка сервера' }, { status: 500 });
  }
}
