import prisma from "@/lib/prisma";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {

        await step.sleep("initialized", "5s");
        await step.sleep("format-data", "5s");
        await step.sleep("sending to AI", "5s");

        await step.run("create-workflow", () => {
            return prisma.workflow.create({
                data: {
                    name: "test-work-flow"
                }
            })
        });

    },
);