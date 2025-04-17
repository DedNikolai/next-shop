'use client';

import { getSession, signIn } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLoginModal } from './LoginModalContext';
import { useRegistrationModal } from './RegistrationModalContext';
import toast from 'react-hot-toast';

export default function LoginModal() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { onClose } = useLoginModal();
  const { onRegisterOpen } = useRegistrationModal();
  const pathname = usePathname();

  const handleLogin = async () => {
    setIsLoading(true);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      const session = await getSession();
      const role = session?.user?.role;

      toast.success('Авторизація успішна');

      if (role === 'ADMIN') router.push('/dashboard');
      else if (role === 'USER') {
        if (pathname === '/not-auth') {
          router.push('/');
        }
      } else router.push('/not-auth');

      onClose();
    } else {
      toast.error('Невірні дані');
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white w-[320px] sm:w-[360px] rounded-2xl shadow-xl p-6 relative">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">Авторизація</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-sm">
            ✖
          </button>
        </div>

        {/* Поля вводу */}
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Кнопка входу */}
        <div className="mt-5">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-full transition ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 000 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
            )}
            {isLoading ? 'Завантаження...' : 'Увійти'}
          </button>
        </div>

        {/* Перехід до реєстрації */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Немає акаунту?{' '}
          <span
            onClick={() => {
              onClose();
              onRegisterOpen();
            }}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Зареєструватись
          </span>
        </p>
      </div>
    </div>
  );
}
