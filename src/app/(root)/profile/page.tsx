// src/app/profile/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>👤 Профіль користувача</h1>
      <p>Вітаю, {session?.user.name}</p>
    </div>
  );
}