'use client';

import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLoginModal } from './LoginModalContext';

export default function LoginModal() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onClose } = useLoginModal();

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      const session = await getSession(); 
      const role = session?.user?.role;
  
      if (role === 'ADMIN') {
        router.push('/dashboard');
      } else if (role === 'USER') {
        router.push('/');
      } else {
        router.push('/not-auth');
      }
      onClose();
    } else {
      alert('Невірний логін або пароль');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[300px]">
        <div className='flex justify-between'>
            <h2 className="text-lg font-bold mb-4">Авторизація</h2>
            <div><button className='cursor-pointer' onClick={onClose}>Close</button></div>
        </div>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-blue-600 text-white w-full py-2 rounded">
          Увійти
        </button>
      </div>
    </div>
  );
}
