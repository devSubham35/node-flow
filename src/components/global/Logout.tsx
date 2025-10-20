"use client"

import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

const Logout = () => {

    const router = useRouter();

    const handleLogout = () => {
        authClient.signOut();
        router.push("/login");
    }
    return (
        <Button onClick={handleLogout}>
            Logout
        </Button>
    )
}

export default Logout
