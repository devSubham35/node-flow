import { caller } from "@/trpc/server"

/// To fetch data in server component
const SampleServerComponent = async () => {

    const users = await caller.getUsers();

    return (
        <>
            {JSON.stringify(users)}
        </>
    )
}

export default SampleServerComponent
