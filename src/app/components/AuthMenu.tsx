'use client';

import { useSession, signOut } from "next-auth/react";
import { useLoginModal } from "./LoginModalContext";
import Link from "next/link";

export default function AuthMenu() {
    const { open } = useLoginModal();
    const session = useSession();

    if (session.status === 'loading') {
        return <div className="w-[20%] text-right">Loading...</div>
    }

    return (
        <div className="w-[20%] text-right">
            {
                !session.data ? 
                <>
                    <button className='cursor-pointer' onClick={open}>LOIGIN</button> | <button>SIGN IN</button> 
                </>
                :
                <>
                    {
                        session.data.user.role === 'USER' ?
                        <Link href={'/profile'}>
                            <button className='cursor-pointer'>Profile</button>
                        </Link> :
                        <Link href={'/dashboard'}>
                            <button className='cursor-pointer'>Admin</button>
                        </Link>
                    } | <button onClick={() => signOut()}>Logout</button> 
                </>
            }
            
        </div>
    )
}