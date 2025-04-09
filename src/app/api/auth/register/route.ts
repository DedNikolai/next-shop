// src/pages/api/auth/register.ts (або app/api/auth/register/route.ts для App Router)
import { NextResponse } from 'next/server';
import { SERVER_API } from '@/app/constants/app'; // твоя адреса бекенду або локального json-server

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Заповніть всі поля' }, { status: 400 });
    }

    // Перевірка, чи такий email вже є
    const existing = await fetch(`${SERVER_API}/user?email=${email}`);
    const users = await existing.json();

    if (users.length > 0) {
      return NextResponse.json({ message: 'Користувач вже існує' }, { status: 400 });
    }

    // Додаємо користувача
    const newUser = await fetch(`${SERVER_API}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Math.round(Math.random()*1000).toString(),
        name,
        email,
        password, // в production тут має бути хеш
        role: 'USER',
      }),
    });

    return NextResponse.json({ message: 'Успішна реєстрація' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Помилка сервера' }, { status: 500 });
  }
}
