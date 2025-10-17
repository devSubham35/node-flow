
import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import SampleClientComponent from "./ChildClientComponent";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const ParentServerComponent = async () => {

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>...Loading</p>}>
          <SampleClientComponent />
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}

export default ParentServerComponent
