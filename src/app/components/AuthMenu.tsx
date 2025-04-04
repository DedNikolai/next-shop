'use client';

import { useLoginModal } from "./LoginModalContext";

export default function AuthMenu() {
    const { open } = useLoginModal();

    return (
        <div className="w-[20$]">
            <button onClick={open}>LOIGIN</button> | <button>SIGN IN</button> 
        </div>
    )
}