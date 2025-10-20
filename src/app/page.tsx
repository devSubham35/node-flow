import { caller } from "@/trpc/server"
import { requireAuth } from "@/lib/auth-utils";
import Logout from "@/components/global/Logout";

const Page = async () => {

  await requireAuth();
  const session = await caller.getUsers();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
      <h1>Protected Page</h1>
      {session && JSON.stringify(session)}

      <Logout />
    </div>
  )
}

export default Page
