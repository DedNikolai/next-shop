'use client';

import { useSession, signOut } from "next-auth/react";
import { useLoginModal } from "./LoginModalContext";
import Link from "next/link";

export default function AuthMenu() {
    const { open } = useLoginModal();
    const session = useSession();

    // console.log(session)
    return (
        <div className="w-[20$]">
            {
                !session.data ? 
                <>
                    <button className='cursor-pointer' onClick={open}>LOIGIN</button> | <button>SIGN IN</button> 
                </>
                :
                <>
                    <Link href={'/profile'}>
                        <button className='cursor-pointer'>Profile</button>
                    </Link> | <button onClick={() => signOut()}>Logout</button> 
                </>
            }
            
        </div>
    )
}