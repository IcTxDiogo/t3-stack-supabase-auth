import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const profilesRouter = createTRPCRouter({
   hello: publicProcedure.query(({ ctx }) => {
        return ctx.db.profiles.findMany();
   }),
});