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
        return <div className="text-sm text-gray-500 animate-pulse">Завантаження...</div>
    }

    return (
        <div className="flex items-center gap-4 text-sm font-medium">
            {
                !session.data ? 
                <>
                    <button 
                        className="text-gray-700 hover:text-red-500 transition cursor-pointer"
                        onClick={open}
                    >
                        LOIGIN
                    </button> 
                    <span className="text-gray-300">|</span> 
                    <button
                        onClick={onRegisterOpen}
                        className="text-gray-700 hover:text-red-500 transition cursor-pointer"
                    >
                        SIGN IN
                    </button> 
                </>
                :
                <>
                    {
                        session.data.user.role === 'USER' ?
                        <Link href="/profile" className="text-gray-700 hover:text-red-500 transition">
                            Profile
                        </Link>
                        :
                        <Link href={'/dashboard'} className="text-gray-700 hover:text-red-500 transition">
                            Admin
                        </Link>
                    } 
                    <span className="text-gray-300">|</span>
                    <button 
                        onClick={() => signOut()}
                        className="text-gray-700 hover:text-red-500 transition cursor-pointer"
                    >
                        Logout
                    </button> 
                </>
            }
            
        </div>
    )
}