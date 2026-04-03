# Supabase Auth Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect Worka to Supabase, add typed DB layer, and wire real sign-in/sign-up/sign-out into the existing auth pages with persistent sessions.

**Architecture:** Supabase client singleton in `src/lib/supabase.ts`. DB types in `src/types/database.ts`. Auth functions in `src/services/auth.ts`. `_layout.tsx` listens to `onAuthStateChange` and drives navigation. Pages call service functions and handle loading/error state locally.

**Tech Stack:** `@supabase/supabase-js` v2, `@react-native-async-storage/async-storage` (already installed), Zustand, Expo Router.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/supabase.ts` | Create | Supabase client singleton with AsyncStorage session persistence |
| `src/types/database.ts` | Create | Typed Row/Insert/Update interfaces for every DB table + `Database` root type |
| `src/services/auth.ts` | Create | `signIn`, `signUp`, `signOut`, `getProfile` — no thrown exceptions, errors returned as strings |
| `src/store/userStore.ts` | Modify | Remove hardcoded user, default `isLoggedIn: false` |
| `src/app/_layout.tsx` | Modify | Register `onAuthStateChange` listener, route on session events |
| `src/components/pages/LoginPage.tsx` | Modify | Call `signIn`, handle loading + error state |
| `src/components/pages/RegisterPage.tsx` | Modify | Call `signUp`, handle loading + error state |

---

## Task 1: Install Supabase package

**Files:**
- Modify: `package.json` (via install command)

- [ ] **Step 1: Install the package**

```bash
npx expo install @supabase/supabase-js
```

Expected output: package added to `node_modules` and `package.json` dependencies. No errors.

- [ ] **Step 2: Verify AsyncStorage is present**

```bash
grep "@react-native-async-storage/async-storage" package.json
```

Expected: a line with the package. If missing, run `npx expo install @react-native-async-storage/async-storage`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install @supabase/supabase-js"
```

---

## Task 2: Create Supabase client

**Files:**
- Create: `src/lib/supabase.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/lib/supabase.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";

const SUPABASE_URL = "https://gocuruxfpsezhrxoxbzg.supabase.co";
const SUPABASE_ANON_KEY =
  "sb_publishable_8FvqxPtwpjR-TcS1au0Fbw_PBEvtGc7";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

Note: `Database` is imported from `../types/database` which is created in Task 3. TypeScript will show an error until that file exists — that is expected.

- [ ] **Step 2: Commit**

```bash
git add src/lib/supabase.ts
git commit -m "feat: add Supabase client singleton"
```

---

## Task 3: Create database types

**Files:**
- Create: `src/types/database.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/types/database.ts
// Typed interfaces for every Supabase table.
// Three variants per table: Row (SELECT), Insert (INSERT), Update (UPDATE).
// These are DB-layer types — separate from UI types in task.ts / objective.ts.

// ── Profile ───────────────────────────────────────────────────────────────────

export interface ProfileRow {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ProfileInsert {
  id: string;
  name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
  created_at?: string;
}

export interface ProfileUpdate {
  name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
}

// ── Theme ─────────────────────────────────────────────────────────────────────

export interface ThemeRow {
  id: string;
  user_id: string;
  label: string;
  color: string;
  accent: string;
  emoji: string;
  created_at: string;
}

export interface ThemeInsert {
  id?: string;
  user_id: string;
  label: string;
  color: string;
  accent: string;
  emoji: string;
  created_at?: string;
}

export interface ThemeUpdate {
  label?: string;
  color?: string;
  accent?: string;
  emoji?: string;
}

// ── Task ──────────────────────────────────────────────────────────────────────

export interface TaskRow {
  id: string;
  user_id: string;
  theme_id: string | null;
  title: string;
  date: string;       // "YYYY-MM-DD"
  time: string;       // "HH:MM:SS"
  duration: string | null;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  recurrence: "daily" | "weekly" | "monthly" | null;
  completed_at: string | null;
  created_at: string;
}

export interface TaskInsert {
  id?: string;
  user_id: string;
  theme_id?: string | null;
  title: string;
  date: string;
  time: string;
  duration?: string | null;
  status?: "pending" | "completed";
  priority?: "low" | "medium" | "high";
  recurrence?: "daily" | "weekly" | "monthly" | null;
  completed_at?: string | null;
  created_at?: string;
}

export interface TaskUpdate {
  theme_id?: string | null;
  title?: string;
  date?: string;
  time?: string;
  duration?: string | null;
  status?: "pending" | "completed";
  priority?: "low" | "medium" | "high";
  recurrence?: "daily" | "weekly" | "monthly" | null;
  completed_at?: string | null;
}

// ── ArchivedTask ──────────────────────────────────────────────────────────────

export interface ArchivedTaskRow {
  id: string;
  user_id: string;
  task_data: Record<string, unknown>;
  archived_at: string;
}

export interface ArchivedTaskInsert {
  id?: string;
  user_id: string;
  task_data: Record<string, unknown>;
  archived_at?: string;
}

// ── Objective ─────────────────────────────────────────────────────────────────

export interface ObjectiveRow {
  id: string;
  user_id: string;
  theme_id: string | null;
  title: string;
  progress: number;   // 0.000 – 1.000
  due_date: string | null;  // "YYYY-MM-DD"
  status: "pending" | "completed";
  image: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface ObjectiveInsert {
  id?: string;
  user_id: string;
  theme_id?: string | null;
  title: string;
  progress?: number;
  due_date?: string | null;
  status?: "pending" | "completed";
  image?: string | null;
  completed_at?: string | null;
  created_at?: string;
}

export interface ObjectiveUpdate {
  theme_id?: string | null;
  title?: string;
  progress?: number;
  due_date?: string | null;
  status?: "pending" | "completed";
  image?: string | null;
  completed_at?: string | null;
}

// ── ArchivedObjective ─────────────────────────────────────────────────────────

export interface ArchivedObjectiveRow {
  id: string;
  user_id: string;
  objective_data: Record<string, unknown>;
  archived_at: string;
}

export interface ArchivedObjectiveInsert {
  id?: string;
  user_id: string;
  objective_data: Record<string, unknown>;
  archived_at?: string;
}

// ── Database root type (passed to createClient<Database>) ─────────────────────

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      themes: {
        Row: ThemeRow;
        Insert: ThemeInsert;
        Update: ThemeUpdate;
      };
      tasks: {
        Row: TaskRow;
        Insert: TaskInsert;
        Update: TaskUpdate;
      };
      archived_tasks: {
        Row: ArchivedTaskRow;
        Insert: ArchivedTaskInsert;
        Update: Record<string, never>;
      };
      objectives: {
        Row: ObjectiveRow;
        Insert: ObjectiveInsert;
        Update: ObjectiveUpdate;
      };
      archived_objectives: {
        Row: ArchivedObjectiveRow;
        Insert: ArchivedObjectiveInsert;
        Update: Record<string, never>;
      };
    };
  };
};
```

- [ ] **Step 2: Verify no TypeScript errors in `src/lib/supabase.ts`**

The import error from Task 2 should now be resolved. Run:

```bash
npx tsc --noEmit
```

Expected: no errors on `src/lib/supabase.ts` or `src/types/database.ts`. Other pre-existing errors in the project are acceptable.

- [ ] **Step 3: Commit**

```bash
git add src/types/database.ts
git commit -m "feat: add typed DB interfaces for all Supabase tables"
```

---

## Task 4: Create auth service

**Files:**
- Create: `src/services/auth.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/services/auth.ts
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
): Promise<{ user: User } | { error: string }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) return { error: mapError(error.message) };
  if (!data.user) return { error: "Impossible de créer le compte." };
  return { user: data.user };
}

// ── signOut ───────────────────────────────────────────────────────────────────

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

// ── getProfile ────────────────────────────────────────────────────────────────

export async function getProfile(userId: string): Promise<ProfileRow | null> {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data ?? null;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/services/auth.ts
git commit -m "feat: add auth service (signIn, signUp, signOut, getProfile)"
```

---

## Task 5: Update userStore — remove hardcoded user

**Files:**
- Modify: `src/store/userStore.ts`

- [ ] **Step 1: Replace hardcoded values with empty defaults**

In `src/store/userStore.ts`, change the initial state from:

```typescript
      name: "Thomas Delon",
      email: "thomas.d@worka.io",
      avatarUrl: null,
      isLoggedIn: true,
```

To:

```typescript
      name: "",
      email: "",
      avatarUrl: null,
      isLoggedIn: false,
```

- [ ] **Step 2: Commit**

```bash
git add src/store/userStore.ts
git commit -m "fix: remove hardcoded user from userStore, default to logged-out"
```

---

## Task 6: Add auth listener to `_layout.tsx`

**Files:**
- Modify: `src/app/_layout.tsx`

- [ ] **Step 1: Replace the file content**

```typescript
import {
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
} from "@expo-google-fonts/urbanist";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useThemeStore } from "@/src/store/themeStore";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { supabase } from "@/src/lib/supabase";
import { getProfile } from "@/src/services/auth";
import { useUserStore } from "@/src/store/userStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Urbanist_800ExtraBold,
  });

  const themeMode = useThemeStore((s) => s.mode);
  const router = useRouter();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Auth state listener — drives navigation for the entire app.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "INITIAL_SESSION") {
          if (session) {
            const profile = await getProfile(session.user.id);
            if (profile) {
              useUserStore.getState().setUser({
                name: profile.name ?? "",
                email: profile.email ?? session.user.email ?? "",
                avatarUrl: profile.avatar_url ?? null,
                isLoggedIn: true,
              });
            }
            router.replace("/(tabs)/planning");
          }
          // No session → stay on WelcomePage (index), no navigation needed.
        } else if (event === "SIGNED_IN" && session) {
          const profile = await getProfile(session.user.id);
          if (profile) {
            useUserStore.getState().setUser({
              name: profile.name ?? "",
              email: profile.email ?? session.user.email ?? "",
              avatarUrl: profile.avatar_url ?? null,
              isLoggedIn: true,
            });
          }
          router.replace("/(tabs)/planning");
        } else if (event === "SIGNED_OUT") {
          useUserStore.getState().logout();
          router.replace("/");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modals/archive"
          options={{ presentation: "transparentModal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="modals/add-task"
          options={{ presentation: "transparentModal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="modals/add-objective"
          options={{ presentation: "transparentModal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="profile" />
        <Stack.Screen
          name="modals/task-themes"
          options={{ presentation: "transparentModal", animation: "slide_from_bottom" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/_layout.tsx
git commit -m "feat: add Supabase auth state listener to root layout"
```

---

## Task 7: Wire up LoginPage

**Files:**
- Modify: `src/components/pages/LoginPage.tsx`

- [ ] **Step 1: Replace the file content**

```typescript
import { AuthInput } from "@/src/components/auth/AuthInput";
import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import { signIn } from "@/src/services/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gradientColors: [string, string, string] =
    mode === "dark"
      ? ["#1A1510", "#221C14", "#1A1510"]
      : ["#eeebf9ff", "#f5f4f9", "#e6e3f1ff"];

  async function handleSignIn() {
    setLoading(true);
    setError(null);
    const result = await signIn(email, password);
    if ("error" in result) {
      setError(result.error);
      setLoading(false);
    }
    // On success: onAuthStateChange in _layout.tsx handles navigation.
  }

  return (
    <LinearGradient colors={gradientColors} locations={[0, 0.5, 1]} style={styles.container}>
      <View style={[styles.glow, { backgroundColor: colors.accent + "14" }]} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <MotiView
              from={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 400 }}
              style={styles.inner}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <Text style={{ fontSize: 18, color: colors.textSecondary }}>←</Text>
              </TouchableOpacity>

              <Text style={[styles.wordmark, { color: colors.text, fontFamily: fonts.extraBold }]}>Worka</Text>

              <Text style={[styles.title, { color: colors.text }]}>
                <Text style={{ fontFamily: fonts.light }}>Bon </Text>
                <Text style={{ fontFamily: fonts.extraBold }}>retour.</Text>
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                Connectez-vous pour continuer
              </Text>

              <View style={styles.form}>
                <AuthInput
                  label="Email"
                  placeholder="votre@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <AuthInput
                  label="Mot de passe"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                {error && (
                  <Text style={[styles.errorText, { color: "#E05555", fontFamily: fonts.regular }]}>
                    {error}
                  </Text>
                )}

                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: colors.accent, shadowColor: colors.accent, opacity: loading ? 0.7 : 1 }]}
                  activeOpacity={0.85}
                  onPress={handleSignIn}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.bg} />
                  ) : (
                    <Text style={[styles.btnText, { color: colors.bg, fontFamily: fonts.bold }]}>
                      Se connecter
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.replace("/(auth)/register")}>
                  <Text style={[styles.link, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                    Pas encore de compte ?{" "}
                    <Text style={{ color: colors.accent, fontFamily: fonts.semiBold }}>S'inscrire</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </MotiView>
          </Pressable>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glow: { position: "absolute", width: 300, height: 300, borderRadius: 150, top: -80, right: -100 },
  inner: { flex: 1, paddingHorizontal: 28, paddingTop: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 13, borderWidth: 1, alignItems: "center", justifyContent: "center", marginBottom: 32 },
  wordmark: { fontSize: 26, letterSpacing: -0.5, marginBottom: 36 },
  title: { fontSize: 38, lineHeight: 46, marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22, marginBottom: 40 },
  form: { gap: 18 },
  errorText: { fontSize: 14, lineHeight: 20, textAlign: "center" },
  btn: { height: 56, borderRadius: 16, alignItems: "center", justifyContent: "center", marginTop: 8, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 4 },
  btnText: { fontSize: 17 },
  footer: { flex: 1, justifyContent: "flex-end", alignItems: "center", paddingBottom: 20 },
  link: { fontSize: 15 },
});
```

- [ ] **Step 2: Commit**

```bash
git add src/components/pages/LoginPage.tsx
git commit -m "feat: wire signIn into LoginPage with loading and error state"
```

---

## Task 8: Wire up RegisterPage

**Files:**
- Modify: `src/components/pages/RegisterPage.tsx`

- [ ] **Step 1: Replace the file content**

```typescript
import { AuthInput } from "@/src/components/auth/AuthInput";
import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import { signUp } from "@/src/services/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterPage() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gradientColors: [string, string, string] =
    mode === "dark"
      ? ["#1A1510", "#221C14", "#1A1510"]
      : ["#eeebf9ff", "#f5f4f9", "#e6e3f1ff"];

  async function handleSignUp() {
    setLoading(true);
    setError(null);
    const result = await signUp(email, password, name);
    if ("error" in result) {
      setError(result.error);
      setLoading(false);
    }
    // On success: onAuthStateChange in _layout.tsx handles navigation.
  }

  return (
    <LinearGradient colors={gradientColors} locations={[0, 0.5, 1]} style={styles.container}>
      <View style={[styles.glow, { backgroundColor: colors.accent + "14" }]} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <MotiView
              from={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 400 }}
              style={styles.inner}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <Text style={{ fontSize: 18, color: colors.textSecondary }}>←</Text>
              </TouchableOpacity>

              <Text style={[styles.wordmark, { color: colors.text, fontFamily: fonts.extraBold }]}>Worka</Text>

              <Text style={[styles.title, { color: colors.text }]}>
                <Text style={{ fontFamily: fonts.light }}>Créer un </Text>
                <Text style={{ fontFamily: fonts.extraBold }}>compte.</Text>
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                Rejoignez Worka et commencez
              </Text>

              <View style={styles.form}>
                <AuthInput
                  label="Nom complet"
                  placeholder="Votre nom"
                  value={name}
                  onChangeText={setName}
                />
                <AuthInput
                  label="Email"
                  placeholder="votre@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <AuthInput
                  label="Mot de passe"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                {error && (
                  <Text style={[styles.errorText, { color: "#E05555", fontFamily: fonts.regular }]}>
                    {error}
                  </Text>
                )}

                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: colors.accent, shadowColor: colors.accent, opacity: loading ? 0.7 : 1 }]}
                  activeOpacity={0.85}
                  onPress={handleSignUp}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.bg} />
                  ) : (
                    <Text style={[styles.btnText, { color: colors.bg, fontFamily: fonts.bold }]}>
                      Créer mon compte
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.replace("/(auth)/login")}>
                  <Text style={[styles.link, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                    Déjà un compte ?{" "}
                    <Text style={{ color: colors.accent, fontFamily: fonts.semiBold }}>Se connecter</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </MotiView>
          </Pressable>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glow: { position: "absolute", width: 300, height: 300, borderRadius: 150, top: -80, left: -100 },
  inner: { flex: 1, paddingHorizontal: 28, paddingTop: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 13, borderWidth: 1, alignItems: "center", justifyContent: "center", marginBottom: 32 },
  wordmark: { fontSize: 26, letterSpacing: -0.5, marginBottom: 36 },
  title: { fontSize: 38, lineHeight: 46, marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22, marginBottom: 40 },
  form: { gap: 18 },
  errorText: { fontSize: 14, lineHeight: 20, textAlign: "center" },
  btn: { height: 56, borderRadius: 16, alignItems: "center", justifyContent: "center", marginTop: 8, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 4 },
  btnText: { fontSize: 17 },
  footer: { flex: 1, justifyContent: "flex-end", alignItems: "center", paddingBottom: 20 },
  link: { fontSize: 15 },
});
```

- [ ] **Step 2: Commit**

```bash
git add src/components/pages/RegisterPage.tsx
git commit -m "feat: wire signUp into RegisterPage with loading and error state"
```

---

## Task 9: Verify end-to-end

- [ ] **Step 1: Start the dev server**

```bash
npx expo start
```

- [ ] **Step 2: Test sign-up flow**

1. Open the app → WelcomePage
2. Tap "S'inscrire" → RegisterPage
3. Fill name, email, password (min 6 chars)
4. Tap "Créer mon compte"
5. Expected: spinner appears, then app navigates to `/(tabs)/planning`
6. In Supabase dashboard → Authentication → Users: verify new user appears
7. In Supabase dashboard → Table editor → profiles: verify row auto-created with name

- [ ] **Step 3: Test sign-in flow**

1. Close/reload app → WelcomePage (no session yet since it's a fresh test)
2. Tap "Se connecter" → LoginPage
3. Enter credentials from Step 2
4. Tap "Se connecter"
5. Expected: spinner appears, then app navigates to `/(tabs)/planning`

- [ ] **Step 4: Test persistent session**

1. With the app open on `/(tabs)/planning`, close the app completely
2. Reopen the app
3. Expected: app navigates directly to `/(tabs)/planning` (no login screen shown)

- [ ] **Step 5: Test error state**

1. On LoginPage, enter wrong password
2. Tap "Se connecter"
3. Expected: spinner then "Email ou mot de passe incorrect." appears in red below the form

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: Supabase auth integration complete"
```
