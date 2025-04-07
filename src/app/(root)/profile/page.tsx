// src/app/profile/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'USER') {
    redirect('/not-auth'); // або /403
  }

  return (
    <div>
      <h1>👤 Профіль користувача</h1>
      <p>Вітаю, {session.user.name}</p>
    </div>
  );
}