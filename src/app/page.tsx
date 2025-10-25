"use client"
import { caller } from "@/trpc/server"
import { requireAuth } from "@/lib/auth-utils";

import { useTRPC } from "@/trpc/client";
import Logout from "@/components/global/Logout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {

  // await requireAuth();
  // const session = await caller.getUsers();

  const trpc = useTRPC();
  const { data, refetch } = useQuery(trpc.getWorkFlow.queryOptions());
  const { mutate, isPending } = useMutation(trpc.createWorkFlow.mutationOptions({
    onSuccess: () => toast.success("Job queued")
  }));

  console.log(data, "++66")

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
      <h1>Protected Page</h1>
      {data && JSON.stringify(data)}

      <Button onClick={() => mutate()} loading={isPending}>
        Create Workflow
      </Button>

      <Logout />
    </div>
  )
}

export default Page
