"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const ChildClientComponent = () => {

    const trpc = useTRPC();
    const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());

    return (
        <>
            {
                JSON.stringify(users)
            }
        </>
    )
}

export default ChildClientComponent
