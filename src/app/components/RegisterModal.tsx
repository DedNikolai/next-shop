'use client';

import { useState } from 'react';
import { useRegistrationModal } from './RegistrationModalContext';
import { useLoginModal } from './LoginModalContext';
import toast from 'react-hot-toast';

export default function RegisterModal() {
  const { isRegisterModalOpen, onRegisterClose } = useRegistrationModal();
  const { open: onLoginOpen } = useLoginModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isRegisterModalOpen) return null;

  const handleRegister = async () => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        toast.success('Реєстрація успішна! Увійдіть.');
        onRegisterClose();
        onLoginOpen();
        toast.error('Помилка при реєстрації');
      }
    } catch (e) {
        toast.error('Серверна помилка');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[300px]">
        <div className='flex justify-between'>
          <h2 className="text-lg font-bold mb-4">Реєстрація</h2>
          <button onClick={onRegisterClose}>Close</button>
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

        <button onClick={handleRegister} className="bg-blue-600 text-white w-full py-2 rounded">
          Зареєструватися
        </button>

        <p className="text-sm text-center mt-4">
          Вже маєте акаунт?{" "}
          <span
            onClick={() => {
              onRegisterClose();
              onLoginOpen();
            }}
            className="text-blue-600 cursor-pointer"
          >
            Увійти
          </span>
        </p>
      </div>
    </div>
  );
}
