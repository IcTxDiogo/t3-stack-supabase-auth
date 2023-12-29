# Create T3 App + Supabase auth

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` and configured to use [Supabase](https://supabase.io) for authentication.

## What's next? How do I make an app with this?

This is as same of t3-stack but with supabase auth and shadcn-ui and React-hook-forms configured

- [Reac-hook-form](https://react-hook-form.com/)
- [Supabase-auth](https://supabase.com/docs/guides/auth)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn-ui](https://ui.shadcn.com/)
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
- [Zod](https://zod.dev/)

## Getting Started

First, create a new project on supabase and run the User Management SQL scripts to create the required tables and stored procedures. 

After that paste the following sql to add some columns to profiles table
``` sql
alter table profiles
add column gender text,
add column birthdate timestamp with time zone,
add column phone text;
```

After that you need to get the `DATABASE_URL`, `SUPABASE_URL` and `SUPABASE_KEY` from supabase and add them to `.env.local` file

`DATABASE_URL` is in project settings > Database > Connection Settings > URI

`SUPABASE_URL` and `SUPABASE_KEY` are in project settings > API > URL, `anon` `public`

Then run the following commands to install dependencies and configure the types

`pnpm i`

`pnpm db:pull`

`npx supabase login`

`npx supabase gen types typescript --project-id [your-project-id]  --schema public > .\src\lib\database.types.ts`

`pnpm dev`

Nice, now you can start building your app!

Hint: you can use `pnpm ui [component-name]` to add a new shadcn-ui component

Supabase auth is ready for:
- client using createClientComponentClient
- server using createClientServerClient and the routes in `src/app/auth`

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!
 