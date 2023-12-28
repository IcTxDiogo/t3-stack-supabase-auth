"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import { type Session } from "@supabase/supabase-js";
import { api } from "@/trpc/server";

export async function verifySession() {
  const cookie = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookie,
  });
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getProfile(session: Session) {
  const userId = session.user.id;
  return await api.profile.getProfile.query({ id: userId });
}

export async function getLoggedUserData() {
  const session = await verifySession();
  const isAuthenticated = session !== null;
  let profile = null;
  if (isAuthenticated) {
    profile = await getProfile(session);
  }
  return { isAuthenticated, profile };
}
