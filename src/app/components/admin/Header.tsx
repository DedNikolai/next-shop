'use client'

import { useSession } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();

    const isLoading = status === 'loading'

    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-6 border-b">
            {
                !isLoading ?
                <>
                    <h1 className="text-xl font-semibold">Адміністратор {session?.user.name}</h1>
                    <div className="text-sm text-gray-600">{session?.user.email}</div>
                </>
                :
                <>
                      <div className="w-full flex justify-between animate-pulse">
                        <div className="h-6 w-40 bg-gray-200 rounded"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                </>
            }

        </header>
    )
}