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
    <div className="bg-white p-6 rounded-xl w-[300px]">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">Реєстрація</h2>
        <button onClick={onRegisterClose}>✕</button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Імʼя"
            {...register('name')}
            className="border p-2 w-full rounded"
          />
         {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="border p-2 w-full rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Пароль"
            {...register('password')}
            className="border p-2 w-full rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Підтвердіть пароль"
            {...register('confirmPassword')}
            className="border p-2 w-full rounded"
          />
          {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-50"
        >
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
          className="text-blue-600 cursor-pointer"
        >
          Увійти
        </span>
      </p>
    </div>
  </div>
  );
}
