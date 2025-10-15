import prisma from "@/lib/prisma"

const page = async () => {

  const user = await prisma.user.findMany({})

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {JSON.stringify(user)}
    </div>
  )
}

export default page
