import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const profilesRouter = createTRPCRouter({
  hello: publicProcedure.query(({ ctx }) => {
    return ctx.db.profiles.findMany();
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string(),
        gender: z.string(),
        birthDate: z.string(),
        phone: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      await ctx.db.profiles.update({
        where: {
          id: id,
        },
        data: {
          full_name: rest.name,
          gender: rest.gender,
          birthdate: rest.birthDate,
          phone: rest.phone,
        },
      });
    }),
});
