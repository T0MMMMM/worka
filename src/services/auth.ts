// Auth functions — wraps Supabase auth calls.
// All functions return data or { error: string }. No thrown exceptions.

import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { ProfileRow } from "../types/database";

// Maps English Supabase error messages to French user-facing strings.
const ERROR_MAP: Record<string, string> = {
  "Invalid login credentials": "Email ou mot de passe incorrect.",
  "Email not confirmed": "Veuillez confirmer votre adresse email.",
  "User already registered": "Un compte existe déjà avec cet email.",
  "Password should be at least 6 characters":
    "Le mot de passe doit contenir au moins 6 caractères.",
  "Unable to validate email address: invalid format":
    "Adresse email invalide.",
};

function mapError(message: string): string {
  return ERROR_MAP[message] ?? "Une erreur est survenue. Réessayez.";
}

// ── signIn ────────────────────────────────────────────────────────────────────

export async function signIn(
  email: string,
  password: string
): Promise<{ user: User; session: Session } | { error: string }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return { error: mapError(error.message) };
  return { user: data.user, session: data.session };
}

// ── signUp ────────────────────────────────────────────────────────────────────

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<{ user: User; needsConfirmation: boolean } | { error: string }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) return { error: mapError(error.message) };
  if (!data.user) return { error: "Impossible de créer le compte." };
  // needsConfirmation is true when email confirmations are enabled in Supabase
  // and the user has not yet clicked the confirmation link.
  const needsConfirmation = data.user.identities?.length === 0 || !data.session;
  return { user: data.user, needsConfirmation };
}

// ── signOut ───────────────────────────────────────────────────────────────────

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("[auth] signOut error:", error.message);
}

// ── getProfile ────────────────────────────────────────────────────────────────

export async function getProfile(userId: string): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) console.error("[auth] getProfile error:", error.message);
  return data ?? null;
}
