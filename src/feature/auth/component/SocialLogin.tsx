"use client";

import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const SocialLogin = () => {

    return (
        <>
            <Button className="w-full flex items-center gap-3">
                <FaGoogle />
                Continue with Google
            </Button>
        </>
    );
};

export default SocialLogin;
