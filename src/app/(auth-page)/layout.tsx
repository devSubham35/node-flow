import React, { ReactNode } from 'react'
import AuthLayout from '@/feature/auth/component/AuthLayout'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default layout
