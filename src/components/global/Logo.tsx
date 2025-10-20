"use client"

import Image from "next/image";
import { assets } from "@/json/assets";
import { useTheme } from "next-themes";

const Logo = () => {

    const { theme } = useTheme();

    return (
        <Image
            alt="logo"
            width={500}
            height={80}
            className="object-contain w-[180px]"
            src={theme === "dark" ? assets.logo_dark : assets.logo_light}
        />
    )
}

export default Logo
