'use client';

import { useSession, signOut } from "next-auth/react";
import { useLoginModal } from "./LoginModalContext";
import Link from "next/link";
import { useRegistrationModal } from "./RegistrationModalContext";

export default function AuthMenu() {
    const { open } = useLoginModal();
    const {onRegisterOpen} = useRegistrationModal()
    const session = useSession();

    if (session.status === 'loading') {
        return (
            <div className="w-[10%] text-right flex justify-end pr-4 items-center text-gray-500 text-sm">
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.1s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.2s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.3s]"></span>
              </span>
            </div>
          );
    }

    return (
        <div className="w-[10%] flex items-center gap-4 text-sm font-medium justify-end">
            {
                !session.data ? 
                <>
                    <button 
                        className="text-gray-700 hover:text-red-500 transition cursor-pointer"
                        onClick={open}
                    >
                        Увійти
                    </button> 
                    <span className="text-gray-300">|</span> 
                    <button
                        onClick={onRegisterOpen}
                        className="text-gray-700 hover:text-red-500 transition cursor-pointer"
                    >
                        Зареєструватись
                    </button> 
                </>
                :
                <>
                    {
                        session.data.user.role === 'USER' ?
                        <Link href="/profile" className="text-gray-700 hover:text-red-500 transition">
                            Профіль
                        </Link>
                        :
                        <Link href={'/dashboard'} className="text-gray-700 hover:text-red-500 transition">
                            Адмін
                        </Link>
                    } 
                    <span className="text-gray-300">|</span>
                    <button 
                        onClick={() => signOut()}
                        className="text-gray-700 hover:text-red-500 transition cursor-pointer"
                    >
                        Вийти
                    </button> 
                </>
            }
            
        </div>
    )
}