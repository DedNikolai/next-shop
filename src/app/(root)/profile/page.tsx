'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getCurrentUser, updateCurrentUser } from '@/app/services/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@/app/types/user';
import toast from 'react-hot-toast';

type FormData = {
  name: string;
  email: string;
};

const schema = yup.object().shape({
  name: yup.string().required('Імʼя обовʼязкове'),
  email: yup.string().email('Некоректний email').required('Email обовʼязковий'),
});

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (status === 'authenticated') {
      getCurrentUser().then(res => reset(res))
                      .catch(() => alert('Auth failed'))
                      .finally(() => setLoading(false));
      
    }
  }, [status]);

  const onSubmit = async (data: FormData) => {
    const user = data as User;
    setLoading(true);
    updateCurrentUser(user).then(res => {
      reset(res);
      toast.success('User was updated')
    }).catch((error) =>
      alert(error)
    ).finally(() => setLoading(false))
  };

  if (status === 'loading' || loading) return <p>Завантаження...</p>;
  
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">Мій профіль</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Імʼя</label>
          <input
            type="text"
            {...register('name')}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Оновлення...' : 'Оновити'}
        </button>
      </form>
    </div>
  );
}
