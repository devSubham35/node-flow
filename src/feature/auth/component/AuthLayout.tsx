import { ReactNode } from "react";
import Logo from "@/components/global/Logo";
import { requireUnauth } from "@/lib/auth-utils";
import { ThemeToggler } from "@/components/global/ThemeToggler";

const AuthLayout = async ({ children }: { children: ReactNode }) => {

    await requireUnauth();

    return (
        <div className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted gap-5">
            <Logo />
            <div className="absolute top-5 right-5">
                <ThemeToggler />
            </div>
            {children}
        </div>
    )
}

export default AuthLayout
