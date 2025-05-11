'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getCurrentUser, updateCurrentUser } from '@/app/services/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import ProfileSkeleton from '@/app/components/shared/ProfileSkeleton';

type FormData = {
  fullName: string;
  email: string;
};

const schema = yup.object().shape({
  fullName: yup.string().required('Імʼя обовʼязкове'),
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
    const user = data;
    setLoading(true);
    updateCurrentUser(user).then(res => {
      reset(res);
      toast.success('User was updated')
    }).catch((error) =>
      alert(error)
    ).finally(() => setLoading(false))
  };

  if (status === 'loading' || loading) return <ProfileSkeleton />
  
  return (
    <div className="bg-yellow-50 py-12 px-4 md:px-10 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">👤 Мій профіль</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Імʼя</label>
            <input
              type="text"
              {...register('fullName')}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            className="w-[200px] bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 mt-5 rounded-full transition cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Оновлення...' : 'Оновити'}
          </button>
        </form>
        </div>
    </div>
  );
}
