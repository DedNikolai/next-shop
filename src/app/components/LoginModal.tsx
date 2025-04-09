'use client';

import { getSession, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLoginModal } from './LoginModalContext';
import toast from 'react-hot-toast';
import { useRegistrationModal } from './RegistrationModalContext';

export default function LoginModal() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { onClose } = useLoginModal();
  const {onRegisterOpen} = useRegistrationModal();

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

      toast.success('Auth success!!!)))')
  
      if (role === 'ADMIN') {
        router.push('/dashboard');
      } else if (role === 'USER') {
        router.push('/');
      } else {
        toast.error('Auth failed!!!(((')
        router.push('/not-auth');
      }
      onClose();
    } else {
      toast.error('Auth failed!!!(((')
    }
    setIsLoading(false)
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
        <button 
          onClick={handleLogin} 
          className={`${isLoading ? 'bg-grey-600' : 'bg-blue-600'} text-white w-full py-2 rounded`}
        >
          {isLoading ? 'Loading' : 'Увійти'}
        </button>
        <p className="text-sm text-center mt-4">
          Dont have account?{" "}
          <span
            onClick={() => {
              onClose();
              onRegisterOpen();
            }}
            className="text-blue-600 cursor-pointer"
          >
            Registration
          </span>
        </p>
      </div>
    </div>
  );
}
