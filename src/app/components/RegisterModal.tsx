'use client';

import { useState } from 'react';
import { useRegistrationModal } from './RegistrationModalContext';
import { useLoginModal } from './LoginModalContext';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Ім'я обов'язкове"),
  email: yup.string().email('Некоректний email').required('Email обовʼязковий'),
  password: yup.string().min(6, 'Мінімум 6 символів').required('Пароль обовʼязковий'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Паролі не співпадають')
    .required('Підтвердження пароля обовʼязкове'),
});

export default function RegisterModal() {
  const { isRegisterModalOpen, onRegisterClose } = useRegistrationModal();
  const { open: onLoginOpen } = useLoginModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  if (!isRegisterModalOpen) return null;

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        toast.error('Помилка при реєстрації');
        return;
      }

      toast.success('Реєстрація успішна! Увійдіть.');
      reset();
      onRegisterClose();
      onLoginOpen();
    } catch (e) {
      toast.error('Серверна помилка');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[320px] shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Реєстрація</h2>
          <button
            onClick={onRegisterClose}
            className="text-xl font-semibold text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Імʼя"
              {...register('name')}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Пароль"
              {...register('password')}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Підтвердіть пароль"
              {...register('confirmPassword')}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-full transition ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting && (
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
            {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Вже маєте акаунт?{' '}
          <span
            onClick={() => {
              onRegisterClose();
              onLoginOpen();
            }}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Увійти
          </span>
        </p>
      </div>
    </div>
  );
}
