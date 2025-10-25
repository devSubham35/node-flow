import prisma from '@/lib/prisma';
import { createTRPCRouter, protectedProcedure } from '../init';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findMany({
      where: {
        id: ctx.auth.user.id
      }
    });
  }),

  getWorkFlow: protectedProcedure.query(() => {
    return prisma.workflow.findMany({})
  }),

  createWorkFlow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "subham@gmail.com"
      }
    });
    return { success: true, message: "Job queued" }
  }),

});

export type AppRouter = typeof appRouter;