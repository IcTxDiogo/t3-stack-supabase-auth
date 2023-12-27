import { createTRPCRouter } from "@/server/api/trpc";
import {profilesRouter} from "@/server/api/routers/profiles";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profile: profilesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
